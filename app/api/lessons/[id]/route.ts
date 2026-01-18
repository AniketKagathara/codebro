import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get lesson
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Get user progress
    const { data: userLesson } = await supabase
      .from('user_lessons')
      .select('*')
      .eq('user_id', user.id)
      .eq('lesson_id', id)
      .single();

    return NextResponse.json({
      lesson: {
        ...lesson,
        progress: userLesson ? {
          status: userLesson.status,
          started_at: userLesson.started_at,
          completed_at: userLesson.completed_at,
          time_spent_minutes: userLesson.time_spent_minutes
        } : null
      }
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
