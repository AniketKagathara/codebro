# Code, Bro! - Full-Stack Learning Platform 🚀

A modern, **gamified coding education platform** with complete backend integration built with Next.js and Supabase. Master any programming language with a friend-like learning experience!

## 🎯 What's This?

**Code, Bro!** is a full-featured learning platform with:
- 8+ Programming Languages (Python, JavaScript, TypeScript, Java, Go, Rust, C++, React)
- Interactive lessons with code examples
- Coding challenges
- Achievement system
- Leaderboard
- AI Assistant (demo mode)
- User profiles & certificates

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 16 (App Router)
- **React**: 19.2
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Analytics**: Vercel Analytics

### **Backend**
### Prerequisites
- Node.js 18+ installed
- Supabase account (free)

### 1. Clone & Install

```bash
# Install dependencies
npm install
```

### 2. Setup Supabase

Follow the detailed guide in `database/SETUP.md`:

1. Create a Supabase project at https://supabase.com
2. Get your project URL and anon key
3. Run the database schema

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash cache layer
- **APIs**: Next.js API Routes

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:3000
```

## 📁 Project Structure

```
codebro/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Main dashboard
│   ├── learn/[language]/  # Language-specific lessons
│   ├── challenges/        # Coding challenges
│   ├── leaderboard/       # Rankings
│   ├── profile/           # User profile
│   ├── certificates/      # Earned certificates
│   ├── ai-assistant/      # AI helper (demo)
│   ├── best-practices/    # Best practices guide
│   └── projects/          # Projects section
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities & helpers
│   ├── course-data.tsx   # Static lesson content
│   ├── gamification.ts   # Points & achievements
│   ├── utils.ts          # Helper functions
│   └── validation.ts     # Form validation
├── hooks/                 # Custom React hooks
├── styles/                # Global styles
└── public/                # Static assets
```

## ✨ Features

### 🎓 Learning Platform
- **Multi-language support**: Learn Python, JavaScript, TypeScript, Java, Go, Rust, C++, React
- **Structured lessons**: Beginner to advanced levels
- **Code examples**: Real-world code snippets
- **Practice exercises**: Hands-on coding

### 🎮 Gamification
- **Points System**: Earn points for completing lessons
- **Streaks**: Track your learning consistency
- **Achievements**: Unlock badges and milestones
- **Leaderboard**: Compete with other learners

### 🎨 User Interface
- **Modern Design**: Clean, professional interface
- **Dark/Light Mode**: Theme switching support
- **Responsive**: Works on all devices
- **Accessible**: Built with accessibility in mind

### 🤖 Demo Features
- **AI Assistant**: Interactive chat (demo mode)
- **User Profiles**: Customizable profiles
- **Certificates**: Track your achievements
- **Progress Tracking**: See your learning journey

## 🎯 Available Routes

- `/` - Landing page
- `/dashboard` - Main dashboard
- `/learn/[language]` - Language lessons (e.g., `/learn/python`)
- `/challenges` - Coding challenges
- `/leaderboard` - Global rankings
- `/profile` - User profile
- `/certificates` - Your certificates
- `/best-practices` - Best practices guide
- `/projects` - Project showcase
- `/ai-assistant` - AI helper

## 📊 Mock Data

This is a **frontend-only** version with mock data:
- User stats are static/demo values
- Leaderboard uses sample data
- AI Assistant runs in demo mode
- No real authentication or database

## 🔧 Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📦 Key Dependencies

- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety
- `tailwindcss` - Styling
- `@radix-ui/*` - UI primitives
- `lucide-react` - Icons
- `react-hook-form` - Forms
- `zod` - Validation
- `recharts` - Charts

## 🎨 UI Components

Built with **shadcn/ui** component library:
- Button, Input, Card, Dialog
- Dropdown, Select, Tabs
- Progress, Badge, Avatar
- Toast, Alert, Sheet
- And 30+ more...

## 🚧 What's Removed (Backend)

This version has all backend functionality removed:
- ❌ Supabase integration
- ❌ API routes
- ❌ Database connection
- ❌ Authentication system
- ❌ User data persistence
- ❌ Admin dashboard

## 💡 Next Steps

Want to add backend? Consider:
1. Add Supabase or Firebase
2. Implement authentication
3. Create API routes
4. Add database models
5. Implement real-time features

## 📄 License

MIT License - Feel free to use this project!

## 🤝 Contributing

This is a demo project. Feel free to fork and customize!

---

**Built with ❤️ using Next.js and TypeScript**
