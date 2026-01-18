import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { time_spent_minutes } = body;

    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get lesson to check points reward
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('points_reward')
      .eq('id', id)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Check existing progress
    const { data: existingProgress } = await supabase
      .from('user_lessons')
      .select('*')
      .eq('user_id', user.id)
      .eq('lesson_id', id)
      .single();

    if (existingProgress?.status === 'completed') {
      return NextResponse.json({ 
        message: 'Lesson already completed',
        already_completed: true 
      });
    }

    // Mark lesson as completed
    const { error: updateError } = await supabase
      .from('user_lessons')
      .upsert({
        id: existingProgress?.id,
        user_id: user.id,
        lesson_id: id,
        status: 'completed',
        completed_at: new Date().toISOString(),
        time_spent_minutes: time_spent_minutes || 0,
        started_at: existingProgress?.started_at || new Date().toISOString()
      });

    if (updateError) {
      console.error('Error completing lesson:', updateError);
      return NextResponse.json({ error: 'Failed to complete lesson' }, { status: 500 });
    }

    // Update user stats (points, total lessons completed)
    // The database trigger should handle this automatically
    // But we can also do it manually for immediate feedback
    const { data: userData } = await supabase
      .from('users')
      .select('points, total_lessons_completed')
      .eq('id', user.id)
      .single();

    const newPoints = (userData?.points || 0) + lesson.points_reward;
    const newLessonsCompleted = (userData?.total_lessons_completed || 0) + 1;

    await supabase
      .from('users')
      .update({
        points: newPoints,
        total_lessons_completed: newLessonsCompleted,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    // Check for new achievements
    const achievements = await checkAchievements(supabase, user.id, {
      lessons_completed: newLessonsCompleted,
      points: newPoints
    });

    return NextResponse.json({ 
      success: true,
      points_earned: lesson.points_reward,
      total_points: newPoints,
      achievements_unlocked: achievements
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to check and unlock achievements
async function checkAchievements(supabase: any, userId: string, stats: any) {
  const unlockedAchievements = [];

  // Get all achievements user doesn't have yet
  const { data: userAchievements } = await supabase
    .from('user_achievements')
    .select('achievement_id')
    .eq('user_id', userId);

  const unlockedIds = userAchievements?.map((ua: any) => ua.achievement_id) || [];

  // Get all achievements
  const { data: allAchievements } = await supabase
    .from('achievements')
    .select('*')
    .not('id', 'in', `(${unlockedIds.join(',')})`);

  // Check criteria
  for (const achievement of allAchievements || []) {
    let unlocked = false;

    if (achievement.criteria_type === 'lessons_completed') {
      unlocked = stats.lessons_completed >= achievement.criteria_value;
    } else if (achievement.criteria_type === 'points_earned') {
      unlocked = stats.points >= achievement.criteria_value;
    }

    if (unlocked) {
      // Unlock achievement
      await supabase
        .from('user_achievements')
        .insert({
          user_id: userId,
          achievement_id: achievement.id,
          unlocked_at: new Date().toISOString()
        });

      unlockedAchievements.push(achievement);
    }
  }

  return unlockedAchievements;
}
