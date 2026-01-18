import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const DAILY_LIMIT = 10; // Free users get 10 messages per day

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check daily usage
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: usageRecords, error: usageError } = await supabase
      .from('ai_usage')
      .select('*')
      .eq('user_id', user.id)
      .gte('created_at', today.toISOString());

    if (usageError) {
      console.error('Error checking usage:', usageError);
      return NextResponse.json({ error: 'Failed to check usage' }, { status: 500 });
    }

    const usageCount = usageRecords?.length || 0;

    if (usageCount >= DAILY_LIMIT) {
      return NextResponse.json({ 
        error: 'Daily limit reached',
        limit_reached: true,
        remaining: 0,
        limit: DAILY_LIMIT
      }, { status: 429 });
    }

    // Simulate AI response (in production, you'd call an actual AI API here)
    // For now, we'll return a simple echo response
    const aiResponse = `I received your message: "${message}". This is a placeholder response. In production, this would integrate with an AI service like OpenAI, Claude, or similar.`;

    // Log usage
    const { error: logError } = await supabase
      .from('ai_usage')
      .insert({
        user_id: user.id,
        message_count: 1,
        tokens_used: message.length + aiResponse.length, // Simplified token counting
        model_used: 'placeholder-model',
        created_at: new Date().toISOString()
      });

    if (logError) {
      console.error('Error logging usage:', logError);
      // Don't fail the request if logging fails
    }

    return NextResponse.json({
      response: aiResponse,
      remaining: DAILY_LIMIT - usageCount - 1,
      limit: DAILY_LIMIT
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get today's usage
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: usageRecords } = await supabase
      .from('ai_usage')
      .select('*')
      .eq('user_id', user.id)
      .gte('created_at', today.toISOString());

    const usageCount = usageRecords?.length || 0;

    return NextResponse.json({
      used: usageCount,
      remaining: Math.max(0, DAILY_LIMIT - usageCount),
      limit: DAILY_LIMIT,
      resets_at: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
