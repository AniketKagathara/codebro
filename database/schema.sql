-- =====================================================
-- Code, Bro! - Complete Database Schema
-- =====================================================
-- This schema includes all tables, policies, triggers, and indexes
-- for a fully functional learning platform with gamification

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  username TEXT UNIQUE,
  bio TEXT,
  avatar_type TEXT DEFAULT 'initials' CHECK (avatar_type IN ('initials', 'emoji', 'pattern', 'gradient')),
  avatar_value TEXT, -- stores emoji or color values
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  
  -- Gamification stats
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_count INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_lessons_completed INTEGER DEFAULT 0,
  total_challenges_solved INTEGER DEFAULT 0,
  
  -- Metadata
  last_active_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons table (course content)
CREATE TABLE IF NOT EXISTS public.lessons (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  language TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  category TEXT,
  
  -- Content
  content TEXT,
  description TEXT,
  code_example TEXT,
  practice_exercise TEXT,
  
  -- Metadata
  duration_minutes INTEGER DEFAULT 30,
  order_index INTEGER DEFAULT 0,
  points_reward INTEGER DEFAULT 10,
  views INTEGER DEFAULT 0,
  completions INTEGER DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
  is_premium BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress on lessons
CREATE TABLE IF NOT EXISTS public.user_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  
  -- Progress tracking
  completed BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  
  -- Gamification
  points_earned INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  
  -- Timestamps
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, lesson_id)
);

-- Challenges table
CREATE TABLE IF NOT EXISTS public.challenges (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  language TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  
  -- Content
  description TEXT NOT NULL,
  problem_statement TEXT,
  starter_code TEXT,
  solution_code TEXT,
  test_cases JSONB,
  hints JSONB,
  
  -- Metadata
  points_reward INTEGER DEFAULT 50,
  time_limit_minutes INTEGER DEFAULT 60,
  submissions INTEGER DEFAULT 0,
  success_rate DECIMAL DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'coming_soon')),
  is_premium BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User challenge attempts
CREATE TABLE IF NOT EXISTS public.user_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  challenge_id TEXT NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  
  -- Attempt details
  attempts INTEGER DEFAULT 0,
  solved BOOLEAN DEFAULT FALSE,
  code_submitted TEXT,
  test_cases_passed INTEGER DEFAULT 0,
  total_test_cases INTEGER DEFAULT 0,
  
  -- Gamification
  points_earned INTEGER DEFAULT 0,
  time_taken_minutes INTEGER,
  
  -- Timestamps
  first_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  solved_at TIMESTAMP WITH TIME ZONE,
  last_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, challenge_id)
);

-- Achievements/Badges
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- emoji or icon name
  category TEXT CHECK (category IN ('lessons', 'challenges', 'streak', 'points', 'social', 'special')),
  
  -- Unlock criteria
  criteria_type TEXT NOT NULL CHECK (criteria_type IN ('lessons_completed', 'challenges_solved', 'streak_days', 'points_earned', 'language_mastery', 'custom')),
  criteria_value INTEGER,
  criteria_metadata JSONB,
  
  -- Metadata
  rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  points_reward INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  
  -- Progress
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, achievement_id)
);

-- Certificates
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Certificate details
  title TEXT NOT NULL,
  description TEXT,
  language TEXT NOT NULL,
  certificate_type TEXT DEFAULT 'completion' CHECK (certificate_type IN ('completion', 'mastery', 'special')),
  
  -- Verification
  certificate_code TEXT UNIQUE NOT NULL,
  verification_url TEXT,
  
  -- Metadata
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  
  UNIQUE(user_id, language, certificate_type)
);

-- AI Assistant usage tracking (for rate limiting)
CREATE TABLE IF NOT EXISTS public.ai_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Usage tracking
  messages_today INTEGER DEFAULT 0,
  last_message_at TIMESTAMP WITH TIME ZONE,
  daily_limit INTEGER DEFAULT 10,
  reset_date DATE DEFAULT CURRENT_DATE,
  
  -- Metadata
  total_messages INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, reset_date)
);

-- Leaderboard cache (pre-calculated for performance)
CREATE TABLE IF NOT EXISTS public.leaderboard_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Rankings
  rank_overall INTEGER,
  rank_weekly INTEGER,
  rank_monthly INTEGER,
  
  -- Cached stats
  points INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  challenges_solved INTEGER DEFAULT 0,
  
  -- Metadata
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- User settings/preferences
CREATE TABLE IF NOT EXISTS public.user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Preferences
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  language_preference TEXT DEFAULT 'en',
  email_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT FALSE,
  
  -- Privacy
  profile_visibility TEXT DEFAULT 'public' CHECK (profile_visibility IN ('public', 'friends', 'private')),
  show_on_leaderboard BOOLEAN DEFAULT TRUE,
  
  -- Learning preferences
  daily_goal_minutes INTEGER DEFAULT 30,
  preferred_learning_time TEXT,
  
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON public.lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_challenges_updated_at BEFORE UPDATE ON public.challenges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  -- Create user settings
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  
  -- Create AI usage tracking
  INSERT INTO public.ai_usage (user_id, reset_date)
  VALUES (NEW.id, CURRENT_DATE);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update user stats on lesson completion
CREATE OR REPLACE FUNCTION update_user_stats_on_lesson_complete()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.completed = TRUE AND OLD.completed = FALSE THEN
    UPDATE public.users
    SET 
      total_lessons_completed = total_lessons_completed + 1,
      points = points + NEW.points_earned,
      last_active_date = CURRENT_DATE
    WHERE id = NEW.user_id;
    
    -- Update lesson stats
    UPDATE public.lessons
    SET completions = completions + 1
    WHERE id = NEW.lesson_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_lesson_completed
  AFTER UPDATE ON public.user_lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_user_stats_on_lesson_complete();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public profiles viewable by all" ON public.users
  FOR SELECT USING (true);

-- Lessons policies (public read, admin write)
CREATE POLICY "Anyone can view published lessons" ON public.lessons
  FOR SELECT USING (status = 'published');

-- User lessons policies
CREATE POLICY "Users can view own lesson progress" ON public.user_lessons
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson progress" ON public.user_lessons
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress" ON public.user_lessons
  FOR UPDATE USING (auth.uid() = user_id);

-- Challenges policies
CREATE POLICY "Anyone can view active challenges" ON public.challenges
  FOR SELECT USING (status = 'active');

-- User challenges policies
CREATE POLICY "Users can view own challenge attempts" ON public.user_challenges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own challenge attempts" ON public.user_challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own challenge attempts" ON public.user_challenges
  FOR UPDATE USING (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (true);

CREATE POLICY "Users can view own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- Certificates policies
CREATE POLICY "Users can view own certificates" ON public.certificates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view certificates by code" ON public.certificates
  FOR SELECT USING (true);

-- AI usage policies
CREATE POLICY "Users can view own AI usage" ON public.ai_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own AI usage" ON public.ai_usage
  FOR UPDATE USING (auth.uid() = user_id);

-- Leaderboard cache policies
CREATE POLICY "Anyone can view leaderboard" ON public.leaderboard_cache
  FOR SELECT USING (true);

-- User settings policies
CREATE POLICY "Users can view own settings" ON public.user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON public.user_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);
CREATE INDEX IF NOT EXISTS idx_users_points ON public.users(points DESC);
CREATE INDEX IF NOT EXISTS idx_users_last_active ON public.users(last_active_date);

CREATE INDEX IF NOT EXISTS idx_lessons_language ON public.lessons(language);
CREATE INDEX IF NOT EXISTS idx_lessons_level ON public.lessons(level);
CREATE INDEX IF NOT EXISTS idx_lessons_status ON public.lessons(status);
CREATE INDEX IF NOT EXISTS idx_lessons_slug ON public.lessons(slug);

CREATE INDEX IF NOT EXISTS idx_user_lessons_user_id ON public.user_lessons(user_id);
CREATE INDEX IF NOT EXISTS idx_user_lessons_lesson_id ON public.user_lessons(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_lessons_completed ON public.user_lessons(completed);

CREATE INDEX IF NOT EXISTS idx_challenges_language ON public.challenges(language);
CREATE INDEX IF NOT EXISTS idx_challenges_difficulty ON public.challenges(difficulty);
CREATE INDEX IF NOT EXISTS idx_challenges_status ON public.challenges(status);

CREATE INDEX IF NOT EXISTS idx_user_challenges_user_id ON public.user_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenges_challenge_id ON public.user_challenges(challenge_id);
CREATE INDEX IF NOT EXISTS idx_user_challenges_solved ON public.user_challenges(solved);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON public.certificates(certificate_code);

CREATE INDEX IF NOT EXISTS idx_leaderboard_rank_overall ON public.leaderboard_cache(rank_overall);
CREATE INDEX IF NOT EXISTS idx_leaderboard_points ON public.leaderboard_cache(points DESC);
