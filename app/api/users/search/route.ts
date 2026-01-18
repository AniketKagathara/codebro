import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Get current user (authentication required)
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Search users by username, full_name, or email
    const searchTerm = `%${query}%`;
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, full_name, username, avatar_url, avatar_preference, points, streak_count, total_lessons_completed, total_challenges_solved, created_at')
      .or(`username.ilike.${searchTerm},full_name.ilike.${searchTerm},email.ilike.${searchTerm}`)
      .limit(20);

    if (error) {
      console.error('Error searching users:', error);
      return NextResponse.json({ error: 'Failed to search users' }, { status: 500 });
    }

    // Calculate level for each user
    const usersWithLevel = users?.map(u => ({
      ...u,
      level: Math.floor((u.points || 0) / 1000) + 1
    }));

    return NextResponse.json({ 
      users: usersWithLevel || [],
      count: users?.length || 0
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
