"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { 
  Terminal, 
  Users, 
  BookOpen, 
  Code2, 
  Trophy, 
  Activity,
  TrendingUp,
  Loader2,
  Settings
} from "lucide-react"

interface AdminStats {
  total_users: number
  total_lessons: number
  total_challenges: number
  total_achievements: number
  recent_users: number
  total_points: number
  lessons_completed_today: number
  active_users: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        router.push('/auth/signin')
        return
      }

      // Check if user is admin
      const { data: userData } = await supabase
        .from('users')
        .select('email')
        .eq('id', user.id)
        .single()

      const adminCheck = userData?.email?.includes('admin')
      setIsAdmin(adminCheck || false)

      if (!adminCheck) {
        router.push('/dashboard')
        return
      }

      // Load stats
      try {
        const response = await fetch('/api/admin/stats')
        const data = await response.json()
        
        if (response.ok) {
          setStats(data.stats)
        }
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
          >
            <Terminal className="w-6 h-6 text-accent" />
            <span className="text-xl font-bold">Code, Bro! Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin/users" className="text-sm text-muted-foreground hover:text-foreground">
              Users
            </Link>
            <Link href="/admin/content" className="text-sm text-muted-foreground hover:text-foreground">
              Content
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Back to Site
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Settings className="w-10 h-10 text-accent" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Manage your learning platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-xs text-muted-foreground">USERS</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats?.total_users.toLocaleString() || 0}
            </div>
            <div className="text-sm text-green-500 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +{stats?.recent_users || 0} this week
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-500" />
              <span className="text-xs text-muted-foreground">ACTIVE</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats?.active_users.toLocaleString() || 0}
            </div>
            <div className="text-sm text-muted-foreground">
              Last 24 hours
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-purple-500" />
              <span className="text-xs text-muted-foreground">LESSONS</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats?.total_lessons.toLocaleString() || 0}
            </div>
            <div className="text-sm text-muted-foreground">
              {stats?.lessons_completed_today || 0} completed today
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-xs text-muted-foreground">POINTS</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats?.total_points.toLocaleString() || 0}
            </div>
            <div className="text-sm text-muted-foreground">
              Total awarded
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Code2 className="w-8 h-8 text-orange-500" />
              <span className="text-xs text-muted-foreground">CHALLENGES</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats?.total_challenges.toLocaleString() || 0}
            </div>
            <div className="text-sm text-muted-foreground">
              Active challenges
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-accent" />
              <span className="text-xs text-muted-foreground">ACHIEVEMENTS</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {stats?.total_achievements.toLocaleString() || 0}
            </div>
            <div className="text-sm text-muted-foreground">
              Available badges
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/admin/users">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin/content">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Manage Content
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Database</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-medium">
                  HEALTHY
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">API</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-medium">
                  OPERATIONAL
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Authentication</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-medium">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
