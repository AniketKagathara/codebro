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

    // Check if user is admin (you can add an is_admin field to users table)
    const { data: userData } = await supabase
      .from('users')
      .select('email')
      .eq('id', user.id)
      .single();

    // For now, check if email contains 'admin' - replace with proper role check
    const isAdmin = userData?.email?.includes('admin') || userData?.email === process.env.ADMIN_EMAIL;
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    // Get total users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Get total lessons
    const { count: totalLessons } = await supabase
      .from('lessons')
      .select('*', { count: 'exact', head: true });

    // Get total challenges
    const { count: totalChallenges } = await supabase
      .from('challenges')
      .select('*', { count: 'exact', head: true });

    // Get total achievements
    const { count: totalAchievements } = await supabase
      .from('achievements')
      .select('*', { count: 'exact', head: true });

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { count: recentUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString());

    // Get total points awarded
    const { data: pointsData } = await supabase
      .from('users')
      .select('points');
    
    const totalPoints = pointsData?.reduce((sum, u) => sum + (u.points || 0), 0) || 0;

    // Get lessons completed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { count: lessonsCompletedToday } = await supabase
      .from('user_lessons')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')
      .gte('completed_at', today.toISOString());

    // Get active users (logged in last 24 hours)
    const yesterday = new Date();
    yesterday.setHours(yesterday.getHours() - 24);
    
    const { count: activeUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('last_active_at', yesterday.toISOString());

    return NextResponse.json({
      stats: {
        total_users: totalUsers || 0,
        total_lessons: totalLessons || 0,
        total_challenges: totalChallenges || 0,
        total_achievements: totalAchievements || 0,
        recent_users: recentUsers || 0,
        total_points: totalPoints,
        lessons_completed_today: lessonsCompletedToday || 0,
        active_users: activeUsers || 0
      }
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
