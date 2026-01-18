"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Terminal, Trophy, Flame, BookOpen, Code2, Sparkles } from "lucide-react"

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  points: number
  streak_count: number
  total_lessons_completed: number
  total_challenges_solved: number
}

const languages = [
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    color: "from-blue-500 to-blue-600",
    description: "Perfect for beginners",
    lessons: 12,
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "⚡",
    color: "from-yellow-500 to-yellow-600",
    description: "Web development",
    lessons: 15,
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "💙",
    color: "from-blue-400 to-blue-500",
    description: "Type-safe JS",
    lessons: 10,
  },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    color: "from-orange-500 to-orange-600",
    description: "Enterprise apps",
    lessons: 14,
  },
  {
    id: "golang",
    name: "Go",
    icon: "🔵",
    color: "from-cyan-500 to-cyan-600",
    description: "Fast & concurrent",
    lessons: 11,
  },
  {
    id: "rust",
    name: "Rust",
    icon: "🦀",
    color: "from-orange-600 to-orange-700",
    description: "Safe & fast",
    lessons: 13,
  },
  {
    id: "cpp",
    name: "C++",
    icon: "⚙️",
    color: "from-purple-500 to-purple-600",
    description: "System programming",
    lessons: 16,
  },
  {
    id: "react",
    name: "React",
    icon: "⚛️",
    color: "from-cyan-400 to-cyan-500",
    description: "UI framework",
    lessons: 12,
  },
]

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUserData() {
      const supabase = createClient()
      
      // Get authenticated user
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !authUser) {
        router.push('/auth/signin')
        return
      }

      // Get user profile from database
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (profileError) {
        console.error('Error fetching profile:', profileError)
        setLoading(false)
        return
      }

      setUser(profile)
      setLoading(false)
    }

    loadUserData()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return  <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
           (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ... existing navigation code ... */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
          >
            <Terminal className="w-6 h-6 text-accent" />
            <span className="text-xl font-bold">Code, Bro!</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/challenges" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Challenges
            </Link>
            <Link
              href="/best-practices"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Best Practices
            </Link>
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Leaderboard
            </Link>
            <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Sefull_name || user.email?.split("@")[0]}! Ready to code?
          </h1>
          <p className="text-muted-foreground text-lg">Let's master a new programming language today, bro!</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-5 h-5 text-accent" />
              <span className="text-muted-foreground text-sm">Lessons Completed</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{user.total_lessons_completed}</div>
            <div className="text-xs text-muted-foreground mt-2">Keep learning!</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Code2 className="w-5 h-5 text-accent" />
              <span className="text-muted-foreground text-sm">Challenges Solved</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{user.total_challenges_solved}</div>
            <div className="text-xs text-muted-foreground mt-2">Keep coding!</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-muted-foreground text-sm">Current Streak</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{user.streak_count} days</div>
            <div className="text-xs text-muted-foreground mt-2">Stay consistent!</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-muted-foreground text-sm">Total Points</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{user.points}</div>
            <div className="text-xs text-muted-foreground mt-2">Level {Math.floor(user.points / 1000) + 1}
            </div>
            <div className="text-3xl font-bold text-foreground">{user.totalPoints}</div>
            <div className="text-xs text-muted-foreground mt-2">Earn by completing lessons</div>
          </div>
        </div>

        {/* Learning Paths */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Learning Path</h2>
            <p className="text-muted-foreground">Select a language to begin your mastery journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {languages.map((lang) => (
              <Link key={lang.id} href={`/learn/${lang.id}`}>
                <div className="bg-card border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className="text-4xl mb-3">{lang.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{lang.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{lang.description}</p>
                  <p className="text-xs text-accent mb-4">{lang.lessons} lessons</p>
                  <div className="flex items-center text-accent text-sm font-medium">Start Learning →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pro Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-bold text-foreground">AI Learning Assistant</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Get personalized help, code reviews, and explanations from our AI tutor.
            </p>
            <Link href="/ai-assistant">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Try AI Assistant</Button>
            </Link>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-6 h-6 text-orange-500" />
              <h3 className="text-xl font-bold text-foreground">Daily Challenges</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Solve daily coding challenges to earn points and improve your skills.
            </p>
            <Link href="/challenges">
              <Button
                variant="outline"
                className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 bg-transparent"
              >
                View Challenges
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
