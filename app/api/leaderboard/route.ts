import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || 'all-time'; // all-time, monthly, weekly
    const limit = parseInt(searchParams.get('limit') || '100');

    const supabase = await createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    // Calculate date range for filtering
    let dateFilter = null;
    if (period === 'weekly') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = weekAgo.toISOString();
    } else if (period === 'monthly') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      dateFilter = monthAgo.toISOString();
    }

    // For weekly/monthly, we need to calculate points from user_lessons and user_challenges
    // For all-time, we can use the users table directly
    let leaderboardData;

    if (period === 'all-time') {
      // Query users table directly
      const { data, error } = await supabase
        .from('users')
        .select('id, email, full_name, username, avatar_url, points, streak_count, total_lessons_completed, total_challenges_solved')
        .order('points', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
      }

      leaderboardData = data;
    } else {
      // For weekly/monthly, calculate points from completed lessons/challenges in that period
      // This is more complex - we'll use a simplified approach
      
      // Get all users
      const { data: users } = await supabase
        .from('users')
        .select('id, email, full_name, username, avatar_url');

      if (!users) {
        return NextResponse.json({ leaderboard: [] });
      }

      // Calculate points for each user in the period
      const userPoints = await Promise.all(
        users.map(async (user) => {
          // Get lessons completed in period
          let lessonsQuery = supabase
            .from('user_lessons')
            .select('lesson_id')
            .eq('user_id', user.id)
            .eq('status', 'completed');

          if (dateFilter) {
            lessonsQuery = lessonsQuery.gte('completed_at', dateFilter);
          }

          const { data: completedLessons } = await lessonsQuery;

          // Get challenges solved in period
          let challengesQuery = supabase
            .from('user_challenges')
            .select('challenge_id')
            .eq('user_id', user.id)
            .eq('status', 'solved');

          if (dateFilter) {
            challengesQuery = challengesQuery.gte('solved_at', dateFilter);
          }

          const { data: solvedChallenges } = await challengesQuery;

          // Get points for lessons
          const lessonIds = completedLessons?.map(l => l.lesson_id) || [];
          let lessonPoints = 0;
          if (lessonIds.length > 0) {
            const { data: lessons } = await supabase
              .from('lessons')
              .select('points_reward')
              .in('id', lessonIds);
            lessonPoints = lessons?.reduce((sum, l) => sum + l.points_reward, 0) || 0;
          }

          // Get points for challenges
          const challengeIds = solvedChallenges?.map(c => c.challenge_id) || [];
          let challengePoints = 0;
          if (challengeIds.length > 0) {
            const { data: challenges } = await supabase
              .from('challenges')
              .select('points_reward')
              .in('id', challengeIds);
            challengePoints = challenges?.reduce((sum, c) => sum + c.points_reward, 0) || 0;
          }

          return {
            ...user,
            points: lessonPoints + challengePoints,
            total_lessons_completed: completedLessons?.length || 0,
            total_challenges_solved: solvedChallenges?.length || 0,
            streak_count: 0 // Simplified for now
          };
        })
      );

      // Sort by points
      leaderboardData = userPoints
        .sort((a, b) => b.points - a.points)
        .slice(0, limit);
    }

    // Add rank
    const leaderboard = leaderboardData.map((entry, index) => ({
      ...entry,
      rank: index + 1,
      is_current_user: user ? entry.id === user.id : false
    }));

    // Get current user's rank if they're not in top N
    let currentUserRank = null;
    if (user && !leaderboard.some(e => e.id === user.id)) {
      // Count how many users have more points
      const { count } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gt('points', leaderboard.find(e => e.id === user.id)?.points || 0);

      currentUserRank = {
        rank: (count || 0) + 1,
        ...leaderboard.find(e => e.id === user.id)
      };
    }

    return NextResponse.json({ 
      leaderboard,
      current_user_rank: currentUserRank,
      period,
      total_entries: leaderboard.length
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
