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

    // Get user profile with stats
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }

    // Get latest lessons progress
    const { data: recentLessons } = await supabase
      .from('user_lessons')
      .select(`
        *,
        lesson:lessons(title, language, level)
      `)
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(5);

    // Get latest challenges
    const { data: recentChallenges } = await supabase
      .from('user_challenges')
      .select(`
        *,
        challenge:challenges(title, language, difficulty)
      `)
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(5);

    // Get achievements count
    const { count: achievementsCount } = await supabase
      .from('user_achievements')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Calculate level
    const level = Math.floor((profile.points || 0) / 1000) + 1;
    const pointsToNextLevel = (level * 1000) - (profile.points || 0);

    return NextResponse.json({
      profile: {
        ...profile,
        level,
        points_to_next_level: pointsToNextLevel
      },
      recent_activity: {
        lessons: recentLessons || [],
        challenges: recentChallenges || []
      },
      stats: {
        achievements_unlocked: achievementsCount || 0,
        current_streak: profile.streak_count || 0,
        lessons_completed: profile.total_lessons_completed || 0,
        challenges_solved: profile.total_challenges_solved || 0
      }
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, username, bio, avatar_type, avatar_value } = body;

    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update profile
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (full_name !== undefined) updateData.full_name = full_name;
    if (username !== undefined) updateData.username = username;
    if (bio !== undefined) updateData.bio = bio;
    if (avatar_type !== undefined) updateData.avatar_type = avatar_type;
    if (avatar_value !== undefined) updateData.avatar_value = avatar_value;

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json({ profile: data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
