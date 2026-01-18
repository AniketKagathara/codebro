import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get('language');
    const level = searchParams.get('level');
    const category = searchParams.get('category');

    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Build query
    let query = supabase
      .from('lessons')
      .select('*')
      .eq('status', 'published')
      .order('order_index', { ascending: true });

    // Apply filters
    if (language) {
      query = query.eq('language', language);
    }
    if (level) {
      query = query.eq('level', level);
    }
    if (category) {
      query = query.eq('category', category);
    }

    const { data: lessons, error } = await query;

    if (error) {
      console.error('Error fetching lessons:', error);
      return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
    }

    // Get user progress for these lessons
    const lessonIds = lessons?.map(l => l.id) || [];
    const { data: userLessons } = await supabase
      .from('user_lessons')
      .select('*')
      .eq('user_id', user.id)
      .in('lesson_id', lessonIds);

    // Merge progress data
    const lessonsWithProgress = lessons?.map(lesson => {
      const progress = userLessons?.find(ul => ul.lesson_id === lesson.id);
      return {
        ...lesson,
        progress: progress ? {
          status: progress.status,
          started_at: progress.started_at,
          completed_at: progress.completed_at,
          time_spent_minutes: progress.time_spent_minutes
        } : null
      };
    });

    return NextResponse.json({ lessons: lessonsWithProgress });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
