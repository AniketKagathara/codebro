import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all achievements
    const { data: achievements, error: achievementsError } = await supabase
      .from('achievements')
      .select('*')
      .order('points_reward', { ascending: false });

    if (achievementsError) {
      console.error('Error fetching achievements:', achievementsError);
      return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
    }

    // Get user's unlocked achievements
    const { data: userAchievements } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', user.id);

    const unlockedIds = new Set(userAchievements?.map(ua => ua.achievement_id) || []);

    // Merge data
    const achievementsWithStatus = achievements?.map(achievement => ({
      ...achievement,
      unlocked: unlockedIds.has(achievement.id),
      unlocked_at: userAchievements?.find(ua => ua.achievement_id === achievement.id)?.unlocked_at || null
    }));

    return NextResponse.json({ 
      achievements: achievementsWithStatus,
      total_unlocked: unlockedIds.size,
      total_achievements: achievements?.length || 0
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
