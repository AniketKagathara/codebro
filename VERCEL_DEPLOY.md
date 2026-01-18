# Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Add Supabase backend"
git push
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Click **"Deploy"**

### Step 3: Add Environment Variables

**CRITICAL**: Add these environment variables in Vercel:

1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://emftebirghyyzgbvunul.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZnRlYmlyZ2h5eXpnYnZ1bnVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MzcwMDAsImV4cCI6MjA4NDMxMzAwMH0.dXtb_xtMirIPX-hjS4iYGk82AxdvnI9qu3EZrzowqHA
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

4. Make sure to select **All Environments** (Production, Preview, Development)
5. Click **Save**

### Step 4: Update Supabase Auth Settings

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Vercel URL to **Site URL**:
   ```
   https://your-app.vercel.app
   ```
3. Add to **Redirect URLs**:
   ```
   https://your-app.vercel.app/**
   https://your-app.vercel.app/auth/callback
   ```

### Step 5: Redeploy

After adding environment variables:
1. Go to Vercel → Deployments
2. Click the three dots on latest deployment
3. Click **"Redeploy"**

## ✅ Verify Deployment

1. Visit your Vercel URL
2. Try signing up
3. Check if email verification works
4. Test login

## 🐛 Troubleshooting

### Error: MIDDLEWARE_INVOCATION_FAILED
- ✅ **Fixed!** Updated middleware to use compatible cookies API

### Error: Invalid environment variables
- Make sure all env vars are added in Vercel settings
- Check that values are correct (no extra spaces)

### Error: Auth callback not working
- Add your Vercel URL to Supabase redirect URLs
- Make sure `/auth/callback` route exists

### Error: 500 Internal Server Error
- Check Vercel function logs
- Verify Supabase credentials are correct
- Make sure database schema is deployed

## 📦 Build Settings (Auto-detected)

Vercel should auto-detect these:
- **Framework**: Next.js
- **Build Command**: `npm run build` or `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `npm install` or `pnpm install`

## 🔥 Hot Tip

For faster deploys, use Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel
```

## 🎉 Done!

Your app should now be live on Vercel with full backend functionality!
