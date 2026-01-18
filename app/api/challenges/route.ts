import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get('language');
    const difficulty = searchParams.get('difficulty');

    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Build query
    let query = supabase
      .from('challenges')
      .select('*')
      .eq('status', 'active')
      .order('difficulty', { ascending: true });

    // Apply filters
    if (language) {
      query = query.eq('language', language);
    }
    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    const { data: challenges, error } = await query;

    if (error) {
      console.error('Error fetching challenges:', error);
      return NextResponse.json({ error: 'Failed to fetch challenges' }, { status: 500 });
    }

    // Get user progress
    const challengeIds = challenges?.map(c => c.id) || [];
    const { data: userChallenges } = await supabase
      .from('user_challenges')
      .select('*')
      .eq('user_id', user.id)
      .in('challenge_id', challengeIds);

    // Merge progress
    const challengesWithProgress = challenges?.map(challenge => {
      const progress = userChallenges?.find(uc => uc.challenge_id === challenge.id);
      return {
        ...challenge,
        progress: progress ? {
          status: progress.status,
          attempts: progress.attempts,
          solved_at: progress.solved_at,
          best_solution: progress.best_solution
        } : null
      };
    });

    return NextResponse.json({ challenges: challengesWithProgress });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
