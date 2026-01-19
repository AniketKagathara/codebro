"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { getAvatarProps, getAvatarClasses } from "@/lib/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Terminal, Search, Users, Trophy, Flame, BookOpen, Code2, Loader2 } from "lucide-react"

interface SearchUser {
  id: string
  email: string
  full_name: string | null
  username: string | null
  avatar_url: string | null
  avatar_preference: string
  points: number
  level: number
  streak_count: number
  total_lessons_completed: number
  total_challenges_solved: number
  created_at: string
}

function UserSearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [inputValue, setInputValue] = useState(initialQuery)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<SearchUser[]>([])

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/auth/signin')
      }
    }
    
    checkAuth()
  }, [router])

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      searchUsers(searchQuery)
    } else {
      setUsers([])
    }
  }, [searchQuery])

  const searchUsers = async (query: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      
      if (response.ok) {
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(inputValue)
    
    // Update URL
    const params = new URLSearchParams()
    if (inputValue.trim()) {
      params.set('q', inputValue.trim())
    }
    router.push(`/users/search?${params.toString()}`)
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
            <span className="text-xl font-bold">Code, Bro!</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground">
              Leaderboard
            </Link>
            <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Users className="w-10 h-10 text-accent" />
            Find Users
          </h1>
          <p className="text-muted-foreground">Search for coders by username, name, or email</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search users..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
            </Button>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : users.length === 0 && searchQuery ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Users Found</h3>
            <p className="text-muted-foreground">Try a different search term</p>
          </div>
        ) : users.length > 0 ? (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Found {users.length} user{users.length !== 1 ? 's' : ''}
            </div>
            {users.map((user) => {
              const displayName = user.username || user.full_name || user.email?.split('@')[0] || 'Anonymous'
              const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
              })
              
              return (
                <Link
                  key={user.id}
                  href={`/profile/${user.username || user.id}`}
                  className="block bg-card border border-border rounded-lg p-6 hover:border-accent transition-all hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className={getAvatarClasses(getAvatarProps(user.full_name || user.email || '', 'lg', user.avatar_url))}>
                      {getAvatarProps(user.full_name || user.email || '', 'lg', user.avatar_url).content}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground truncate">{displayName}</h3>
                      {user.username && user.full_name && (
                        <div className="text-sm text-muted-foreground">{user.full_name}</div>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Trophy className="w-4 h-4 text-accent" />
                          Level {user.level}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          {user.streak_count} day streak
                        </span>
                        <span>Joined {joinDate}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">{user.points.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Points</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-foreground">{user.total_lessons_completed}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          Lessons
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-foreground">{user.total_challenges_solved}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Code2 className="w-3 h-3" />
                          Challenges
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Start Searching</h3>
            <p className="text-muted-foreground">Enter a username, name, or email to find other coders</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function UserSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    }>
      <UserSearchContent />
    </Suspense>
  )
}
