import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
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

    // Check if lesson exists
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('id')
      .eq('id', id)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Create or update user_lesson record
    const { data: existingProgress } = await supabase
      .from('user_lessons')
      .select('*')
      .eq('user_id', user.id)
      .eq('lesson_id', id)
      .single();

    if (existingProgress) {
      // Already started - just update timestamp
      const { error } = await supabase
        .from('user_lessons')
        .update({ 
          status: 'in_progress',
          updated_at: new Date().toISOString()
        })
        .eq('id', existingProgress.id);

      if (error) {
        console.error('Error updating progress:', error);
        return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
      }
    } else {
      // Start new lesson
      const { error } = await supabase
        .from('user_lessons')
        .insert({
          user_id: user.id,
          lesson_id: id,
          status: 'in_progress',
          started_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error starting lesson:', error);
        return NextResponse.json({ error: 'Failed to start lesson' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
