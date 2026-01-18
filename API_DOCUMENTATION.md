# API Documentation

Complete reference for all backend API endpoints.

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.vercel.app/api`

## Authentication

All API routes require authentication via Supabase session cookies. Users must be signed in.

### Sign Up
```bash
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "full_name": "John Doe"
}
```

### Sign In
```bash
POST /auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}
```

### Magic Link (Passwordless)
```bash
POST /auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "useMagicLink": true
}
```

---

## Lessons API

### List All Lessons
```bash
GET /api/lessons?language=python&level=beginner&category=basics
```

**Query Parameters:**
- `language` (optional): Filter by programming language
- `level` (optional): `beginner`, `intermediate`, `advanced`
- `category` (optional): Lesson category

**Response:**
```json
{
  "lessons": [
    {
      "id": "python-1",
      "title": "Introduction to Python",
      "slug": "intro-to-python",
      "language": "python",
      "level": "beginner",
      "category": "basics",
      "description": "Learn Python basics",
      "content": "...",
      "duration_minutes": 30,
      "order_index": 1,
      "points_reward": 10,
      "status": "published",
      "progress": {
        "status": "in_progress",
        "started_at": "2024-01-15T10:00:00Z",
        "completed_at": null,
        "time_spent_minutes": 15
      }
    }
  ]
}
```

### Get Single Lesson
```bash
GET /api/lessons/python-1
```

**Response:**
```json
{
  "lesson": {
    "id": "python-1",
    "title": "Introduction to Python",
    // ... all lesson fields
    "progress": {
      "status": "completed",
      "completed_at": "2024-01-15T11:00:00Z"
    }
  }
}
```

### Start a Lesson
```bash
POST /api/lessons/python-1/start
```

**Response:**
```json
{
  "success": true
}
```

**Behavior:**
- Creates `user_lessons` record with status `in_progress`
- Sets `started_at` timestamp
- If already started, updates timestamp

### Complete a Lesson
```bash
POST /api/lessons/python-1/complete
Content-Type: application/json

{
  "time_spent_minutes": 30
}
```

**Response:**
```json
{
  "success": true,
  "points_earned": 10,
  "total_points": 110,
  "achievements_unlocked": [
    {
      "id": "first-lesson",
      "name": "First Steps",
      "description": "Complete your first lesson",
      "icon": "🎯",
      "points_reward": 50
    }
  ]
}
```

**Behavior:**
- Marks lesson as completed
- Awards points to user
- Increments `total_lessons_completed`
- Checks and unlocks achievements
- Returns 409 if already completed

---

## Challenges API

### List All Challenges
```bash
GET /api/challenges?language=python&difficulty=easy
```

**Query Parameters:**
- `language` (optional): Filter by language
- `difficulty` (optional): `easy`, `medium`, `hard`

**Response:**
```json
{
  "challenges": [
    {
      "id": "python-hello",
      "title": "Hello World",
      "slug": "hello-world-python",
      "language": "python",
      "difficulty": "easy",
      "description": "Write your first Python program",
      "points_reward": 25,
      "status": "active",
      "progress": {
        "status": "solved",
        "attempts": 3,
        "solved_at": "2024-01-15T12:00:00Z",
        "best_solution": "print('Hello, World!')"
      }
    }
  ]
}
```

---

## Leaderboard API

### Get Leaderboard
```bash
GET /api/leaderboard?period=all-time&limit=100
```

**Query Parameters:**
- `period`: `all-time` (default), `weekly`, `monthly`
- `limit`: Number of entries (default: 100)

**Response:**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "id": "user-123",
      "email": "top@user.com",
      "full_name": "Top User",
      "username": "topuser",
      "avatar_url": null,
      "points": 5420,
      "streak_count": 45,
      "total_lessons_completed": 120,
      "total_challenges_solved": 35,
      "is_current_user": false
    }
  ],
  "current_user_rank": {
    "rank": 42,
    // ... user data
  },
  "period": "all-time",
  "total_entries": 100
}
```

**Periods:**
- `all-time`: Total points from user profile
- `weekly`: Points earned in last 7 days
- `monthly`: Points earned in last 30 days

---

## Achievements API

### Get All Achievements
```bash
GET /api/achievements
```

**Response:**
```json
{
  "achievements": [
    {
      "id": "first-lesson",
      "name": "First Steps",
      "description": "Complete your first lesson",
      "icon": "🎯",
      "category": "lessons",
      "criteria_type": "lessons_completed",
      "criteria_value": 1,
      "rarity": "common",
      "points_reward": 50,
      "unlocked": true,
      "unlocked_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": "ten-lessons",
      "name": "Learning Streak",
      "description": "Complete 10 lessons",
      "icon": "📚",
      "category": "lessons",
      "criteria_type": "lessons_completed",
      "criteria_value": 10,
      "rarity": "rare",
      "points_reward": 100,
      "unlocked": false,
      "unlocked_at": null
    }
  ],
  "total_unlocked": 3,
  "total_achievements": 7
}
```

**Achievement Criteria Types:**
- `lessons_completed`: Based on total lessons finished
- `streak_days`: Based on daily login streak
- `points_earned`: Based on total points accumulated
- `challenges_solved`: Based on challenges completed

**Rarity Levels:**
- `common`: Easy to unlock
- `rare`: Moderate effort
- `epic`: Significant achievement
- `legendary`: Very difficult

---

## User Profile API

### Get User Profile
```bash
GET /api/user/profile
```

**Response:**
```json
{
  "profile": {
    "id": "user-123",
    "email": "user@example.com",
    "full_name": "John Doe",
    "username": "johndoe",
    "bio": "Learning to code!",
    "avatar_url": null,
    "avatar_preference": "initials",
    "points": 450,
    "level": 1,
    "points_to_next_level": 550,
    "streak_count": 7,
    "last_active_at": "2024-01-15T14:00:00Z",
    "total_lessons_completed": 15,
    "total_challenges_solved": 5,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "recent_activity": {
    "lessons": [
      {
        "status": "completed",
        "completed_at": "2024-01-15T12:00:00Z",
        "lesson": {
          "title": "Python Functions",
          "language": "python",
          "level": "intermediate"
        }
      }
    ],
    "challenges": [
      {
        "status": "solved",
        "solved_at": "2024-01-15T11:00:00Z",
        "challenge": {
          "title": "List Operations",
          "language": "python",
          "difficulty": "medium"
        }
      }
    ]
  },
  "stats": {
    "achievements_unlocked": 3,
    "current_streak": 7,
    "lessons_completed": 15,
    "challenges_solved": 5
  }
}
```

### Update User Profile
```bash
PATCH /api/user/profile
Content-Type: application/json

{
  "full_name": "John Smith",
  "username": "johnsmith",
  "bio": "Full-stack developer learning React",
  "avatar_preference": "emoji"
}
```

**Response:**
```json
{
  "profile": {
    // ... updated profile data
  }
}
```

**Updatable Fields:**
- `full_name`: Display name
- `username`: Unique username
- `bio`: Profile description
- `avatar_preference`: `initials`, `emoji`, `pattern`, `gradient`

---

## AI Assistant API

### Send Message
```bash
POST /api/ai/chat
Content-Type: application/json

{
  "message": "How do I use Python loops?"
}
```

**Response (Success):**
```json
{
  "response": "I received your message: 'How do I use Python loops?'. This is a placeholder response...",
  "remaining": 9,
  "limit": 10
}
```

**Response (Limit Reached):**
```json
{
  "error": "Daily limit reached",
  "limit_reached": true,
  "remaining": 0,
  "limit": 10
}
```
**Status:** `429 Too Many Requests`

### Check Remaining Messages
```bash
GET /api/ai/chat
```

**Response:**
```json
{
  "used": 3,
  "remaining": 7,
  "limit": 10,
  "resets_at": "2024-01-16T00:00:00Z"
}
```

**Rate Limits:**
- Free users: 10 messages per day
- Resets at midnight UTC
- Tracked in `ai_usage` table

---

## Error Responses

All API routes return consistent error formats:

### 400 Bad Request
```json
{
  "error": "Message is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "error": "Lesson not found"
}
```

### 429 Too Many Requests
```json
{
  "error": "Daily limit reached",
  "limit_reached": true,
  "remaining": 0
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  bio: string | null;
  avatar_url: string | null;
  avatar_preference: 'initials' | 'emoji' | 'pattern' | 'gradient';
  points: number;
  streak_count: number;
  last_active_at: string;
  total_lessons_completed: number;
  total_challenges_solved: number;
  created_at: string;
  updated_at: string;
}
```

### Lesson
```typescript
interface Lesson {
  id: string;
  title: string;
  slug: string;
  language: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  description: string;
  content: string;
  duration_minutes: number;
  order_index: number;
  points_reward: number;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}
```

### Progress
```typescript
interface LessonProgress {
  status: 'in_progress' | 'completed';
  started_at: string;
  completed_at: string | null;
  time_spent_minutes: number;
}
```

### Achievement
```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  criteria_type: 'lessons_completed' | 'streak_days' | 'points_earned' | 'challenges_solved';
  criteria_value: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points_reward: number;
  unlocked: boolean;
  unlocked_at: string | null;
}
```

---

## Rate Limiting

Current rate limits:
- **AI Chat**: 10 messages per day (per user)
- **Other endpoints**: No limits (may add in future)

Rate limit headers are not currently sent but may be added:
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1705363200
```

---

## Webhooks (Future)

Planned webhook events:
- `user.created` - New user signup
- `lesson.completed` - User completes lesson
- `achievement.unlocked` - User unlocks achievement
- `streak.broken` - User's streak ends

---

## Best Practices

1. **Always check authentication** before API calls
2. **Handle rate limits** gracefully with retry logic
3. **Cache responses** when appropriate (leaderboard, achievements)
4. **Validate inputs** on client side before API calls
5. **Show loading states** during API requests
6. **Handle errors** with user-friendly messages

---

## Development Tips

### Testing APIs Locally
```bash
# Start dev server
pnpm dev

# Test with curl
curl http://localhost:3000/api/lessons

# Or use Thunder Client / Postman
```

### Debugging
- Check browser Network tab for request/response
- Look at terminal logs for server errors
- Use Supabase dashboard to inspect database
- Check authentication session cookies

---

**Last Updated**: January 2024
**API Version**: 1.0
**Status**: Production Ready ✅
