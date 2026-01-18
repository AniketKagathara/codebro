# 🚀 Supabase Setup Guide

Follow these steps to set up your Supabase backend for Code, Bro!

## Step 1: Create Supabase Project (5 minutes)

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"New Project"**
3. Sign in with GitHub (recommended)
4. Create a new organization (if needed)
5. Click **"New Project"**
6. Fill in:
   - **Project Name**: `codebro` (or anything you like)
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to you
   - **Plan**: Free (perfect for us!)
7. Click **"Create new project"**
8. Wait 2-3 minutes for setup to complete

## Step 2: Get API Credentials (2 minutes)

1. Once project is ready, go to **Settings** (gear icon) → **API**
2. You'll see two important keys:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
3. Copy both of these!

## Step 3: Update Environment Variables (1 minute)

1. Open `.env.local` file in your project
2. Replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save the file

## Step 4: Run Database Schema (3 minutes)

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open `database/schema.sql` file from your project
4. Copy ALL the content
5. Paste it into the SQL Editor
6. Click **"Run"** (or press Ctrl/Cmd + Enter)
7. You should see: ✅ Success. No rows returned

## Step 5: Enable Email Auth (2 minutes)

1. Go to **Authentication** → **Providers**
2. Find **Email** provider
3. Make sure it's **ENABLED** (toggle should be ON)
4. Scroll down to **Email Templates**
5. You can customize:
   - Confirmation email
   - Magic link email
   - Password reset email
6. For now, defaults are fine!

## Step 6: Configure Auth Settings (Optional but Recommended)

1. Go to **Authentication** → **Settings**
2. Update these settings:

```
Site URL: http://localhost:3000
Redirect URLs: http://localhost:3000/**
```

3. When you deploy, add your production URL too

## Step 7: Test the Setup (2 minutes)

1. Go back to your project terminal
2. Install dependencies (if not done):
```bash
npm install
```

3. Run the dev server:
```bash
npm run dev
```

4. Open browser: `http://localhost:3000`
5. Try signing up - it should work!

## 🎉 You're Done!

Your Supabase backend is now fully configured!

## 📊 What You Just Created:

✅ PostgreSQL database with 11 tables
✅ Row Level Security enabled
✅ User authentication system
✅ Automatic user profile creation
✅ Indexes for performance
✅ Triggers for auto-updates
✅ Gamification system
✅ AI usage tracking
✅ Leaderboard system

## 🔍 Verify Everything Works

1. Go to **Table Editor** in Supabase
2. You should see all these tables:
   - users
   - lessons
   - user_lessons
   - challenges
   - user_challenges
   - achievements
   - user_achievements
   - certificates
   - ai_usage
   - leaderboard_cache
   - user_settings

## 🆘 Troubleshooting

**Problem**: "No project URL found"
- **Solution**: Make sure you copied the URL correctly from Supabase dashboard

**Problem**: SQL error when running schema
- **Solution**: Make sure you're in a NEW project. If tables already exist, delete them first.

**Problem**: Can't sign up users
- **Solution**: Check that Email provider is enabled in Authentication → Providers

## 🚀 Next Steps

After setup, you can:
1. Seed some initial data (lessons, challenges)
2. Test user registration
3. Start building features!

## 📞 Need Help?

- Supabase Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com
