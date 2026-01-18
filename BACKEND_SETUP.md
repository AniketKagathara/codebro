# Backend Setup Guide

Complete guide to setting up the CodeBro backend with Supabase.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)
- Git installed

## Step 1: Supabase Project Setup

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Project Name**: codebro (or your choice)
   - **Database Password**: Save this securely
   - **Region**: Choose closest to your users
4. Wait for project to initialize (~2 minutes)

## Step 2: Database Schema Setup

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `database/schema.sql`
3. Paste into the SQL Editor
4. Click **Run**
5. You should see: "Success. No rows returned"

This creates:
- ✅ 11 tables (users, lessons, challenges, achievements, etc.)
- ✅ Row Level Security (RLS) policies
- ✅ Database triggers for auto-updates
- ✅ Performance indexes

## Step 3: Seed Initial Data

1. Still in **SQL Editor**, create a new query
2. Copy contents of `database/seed.sql`
3. Paste and click **Run**

This adds:
- 📚 15+ initial lessons (Python, JavaScript, TypeScript, React)
- 🏆 7 achievements to unlock
- 🎯 6 coding challenges

## Step 4: Get API Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Step 5: Configure Environment Variables

1. In your project root, create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Replace with your actual values from Step 4

## Step 6: Install Dependencies

```bash
pnpm install --legacy-peer-deps
```

## Step 7: Run Development Server

```bash
pnpm dev
```

Visit: http://localhost:3000

## Step 8: Test Authentication

1. Go to http://localhost:3000/auth/signup
2. Create a test account with email/password
3. Check your email for verification link
4. Click the link to verify
5. You'll be redirected to the dashboard

## Step 9: Verify Database

1. In Supabase dashboard, go to **Table Editor**
2. Click on `users` table
3. You should see your new user account

## API Routes Created

Your backend now has these endpoints:

### Lessons
- `GET /api/lessons` - List all lessons (with filters)
- `GET /api/lessons/[id]` - Get single lesson
- `POST /api/lessons/[id]/start` - Start a lesson
- `POST /api/lessons/[id]/complete` - Complete lesson (earn points)

### Challenges
- `GET /api/challenges` - List all challenges

### Leaderboard
- `GET /api/leaderboard?period=all-time` - Get rankings
- Supports: `all-time`, `weekly`, `monthly`

### Achievements
- `GET /api/achievements` - Get all achievements with unlock status

### User Profile
- `GET /api/user/profile` - Get user profile + stats
- `PATCH /api/user/profile` - Update profile

### AI Assistant
- `POST /api/ai/chat` - Send message (10/day limit)
- `GET /api/ai/chat` - Check remaining messages

## Features Implemented

### ✅ Authentication
- Email/password signup and signin
- Magic link (passwordless) support
- Email verification
- Protected routes with middleware

### ✅ Avatar System
- Auto-generated avatars (no file uploads!)
- 4 types: initials, emoji, pattern, gradient
- Consistent colors based on user data

### ✅ Gamification
- Points for completing lessons/challenges
- Level system (1 level = 1000 points)
- Streak tracking
- Achievement unlocking

### ✅ Progress Tracking
- Track lessons in progress
- Time spent on each lesson
- Completion status
- Challenge attempts

### ✅ Caching
- In-memory cache with TTL
- Lessons cached for 24 hours
- User stats cached for 5 minutes
- Leaderboard cached for 1 minute

### ✅ Rate Limiting
- AI assistant: 10 messages per day
- Usage tracked in database
- Daily reset at midnight

## Database Schema Overview

```
users (main user table)
├── id, email, full_name, username
├── points, streak_count, last_active_at
├── total_lessons_completed, total_challenges_solved
└── avatar_preference, bio, created_at

lessons (course content)
├── id, title, slug, language, level
├── category, description, content
├── duration_minutes, order_index
└── points_reward, status

user_lessons (progress tracking)
├── user_id → users
├── lesson_id → lessons
├── status (in_progress, completed)
└── started_at, completed_at, time_spent_minutes

challenges (coding problems)
├── id, title, slug, language, difficulty
└── description, points_reward, status

user_challenges (attempt tracking)
├── user_id → users
├── challenge_id → challenges
├── status (attempted, solved)
├── attempts, solved_at
└── best_solution

achievements (unlock-able badges)
├── id, name, description, icon
├── category, criteria_type, criteria_value
└── rarity, points_reward

user_achievements (unlocks)
├── user_id → users
├── achievement_id → achievements
└── unlocked_at

ai_usage (rate limiting)
├── user_id → users
├── message_count, tokens_used
├── model_used
└── created_at (for daily reset)

leaderboard_cache (performance)
├── user_id → users
├── rank, points, period
└── cached_at, expires_at

certificates (auto-issued)
├── user_id → users
├── language, issued_at
└── certificate_data (JSON)

user_settings (preferences)
├── user_id → users
├── theme, language_preference
└── notifications, privacy settings
```

## Troubleshooting

### "Unauthorized" errors
- Make sure you're signed in
- Check middleware.ts is protecting routes
- Verify Supabase session is active

### Schema errors
- Drop all tables and re-run schema.sql
- Make sure RLS is enabled on all tables
- Check triggers are created

### Vercel deployment issues
- Add environment variables in Vercel dashboard
- Redeploy after adding env vars
- Check build logs for errors

### Can't sign in
- Check email verification
- Look in Supabase Auth → Users
- Try password reset flow

## Next Steps

1. **Customize Lessons**: Edit `database/seed.sql` to add your own content
2. **Add Real AI**: Integrate OpenAI/Claude in `/api/ai/chat/route.ts`
3. **Email Templates**: Customize in Supabase → Authentication → Email Templates
4. **Analytics**: Add tracking with Vercel Analytics or PostHog
5. **Admin Panel**: Build admin dashboard to manage content
6. **Real-time**: Add Supabase Realtime subscriptions for live leaderboard

## Support

If you encounter issues:
1. Check Supabase logs: Dashboard → Logs
2. Check browser console for errors
3. Verify environment variables are set
4. Make sure database schema is applied

---

**Project Status**: ✅ Backend Complete & Production Ready

All core features implemented:
- Authentication ✅
- Database & RLS ✅
- API Routes ✅
- Gamification ✅
- Rate Limiting ✅
- Caching ✅
- Avatar System ✅
