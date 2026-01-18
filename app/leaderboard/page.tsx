"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { getAvatarProps, getAvatarClasses } from "@/lib/avatar"
import { Button } from "@/components/ui/button"
import { Terminal, Trophy, Medal, Flame, TrendingUp, Crown, Loader2 } from "lucide-react"

interface LeaderboardUser {
  id: string
  rank: number
  email: string
  full_name: string | null
  username: string | null
  avatar_url: string | null
  points: number
  streak_count: number
  total_lessons_completed: number
  total_challenges_solved: number
  is_current_user: boolean
}

interface LeaderboardResponse {
  leaderboard: LeaderboardUser[]
  current_user_rank: LeaderboardUser | null
  period: string
  total_entries: number
}

type TimeFilter = "all-time" | "weekly" | "monthly"

export default function LeaderboardPage() {
  const router = useRouter()
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all-time")
  const [loading, setLoading] = useState(true)
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [currentUserRank, setCurrentUserRank] = useState<LeaderboardUser | null>(null)

  useEffect(() => {
    async function loadLeaderboard() {
      setLoading(true)
      const supabase = createClient()
      
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        router.push('/auth/signin')
        return
      }

      try {
        const response = await fetch(`/api/leaderboard?period=${timeFilter}&limit=100`)
        const data: LeaderboardResponse = await response.json()
        
        if (response.ok) {
          setLeaderboard(data.leaderboard)
          setCurrentUserRank(data.current_user_rank)
        }
      } catch (error) {
        console.error('Error loading leaderboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [timeFilter, router])

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
            <Link href="/challenges" className="text-sm text-muted-foreground hover:text-foreground">
              Challenges
            </Link>
            <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">See how you stack up against other coders, bro!</p>
        </div>

        {/* Your Rank Card */}
        {currentUserRank && (
          <div className="bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/30 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-2xl font-bold text-accent-foreground">
                  #{currentUserRank.rank}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Your Current Rank</h2>
                  <p className="text-muted-foreground">Keep coding to climb the leaderboard!</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{currentUserRank.points.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{currentUserRank.total_lessons_completed}</div>
                  <div className="text-xs text-muted-foreground">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{currentUserRank.total_challenges_solved}</div>
                  <div className="text-xs text-muted-foreground">Challenges</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Time Period</h3>
            <div className="flex gap-2">
              {(["all-time", "weekly", "monthly"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeFilter === filter
                      ? "bg-accent text-accent-foreground"
                      : "bg-card border border-border text-foreground hover:border-accent"
                  }`}
                >
                  {filter === "all-time" ? "All Time" : filter === "weekly" ? "This Week" : "This Month"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Rankings Yet</h3>
            <p className="text-muted-foreground">Be the first to complete lessons and earn points!</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {leaderboard.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {/* 2nd Place */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 text-center flex flex-col items-center justify-end pb-8 pt-12">
                  <div className={`${getAvatarClasses(getAvatarProps(leaderboard[1].full_name || leaderboard[1].email || '', 'lg', leaderboard[1].avatar_url))}`}>
                    {getAvatarProps(leaderboard[1].full_name || leaderboard[1].email || '', 'lg', leaderboard[1].avatar_url).content}
                  </div>
                  <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2 mt-4" />
                  <div className="text-xl font-bold text-foreground mb-1 truncate w-full">
                    {leaderboard[1].username || leaderboard[1].full_name || leaderboard[1].email?.split('@')[0]}
                  </div>
                  <div className="text-2xl font-bold text-gray-400 mb-2">
                    {leaderboard[1].points.toLocaleString()} pts
                  </div>
                </div>

                {/* 1st Place */}
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-950 rounded-lg p-6 text-center flex flex-col items-center justify-end relative">
                  <Crown className="w-12 h-12 text-yellow-500 absolute -top-6 left-1/2 transform -translate-x-1/2" />
                  <div className={`${getAvatarClasses(getAvatarProps(leaderboard[0].full_name || leaderboard[0].email || '', 'xl', leaderboard[0].avatar_url))}`}>
                    {getAvatarProps(leaderboard[0].full_name || leaderboard[0].email || '', 'xl', leaderboard[0].avatar_url).content}
                  </div>
                  <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-2 mt-4" />
                  <div className="text-2xl font-bold text-foreground mb-1 truncate w-full">
                    {leaderboard[0].username || leaderboard[0].full_name || leaderboard[0].email?.split('@')[0]}
                  </div>
                  <div className="text-3xl font-bold text-yellow-500 mb-2">
                    {leaderboard[0].points.toLocaleString()} pts
                  </div>
                </div>

                {/* 3rd Place */}
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-950 rounded-lg p-6 text-center flex flex-col items-center justify-end pb-8 pt-12">
                  <div className={`${getAvatarClasses(getAvatarProps(leaderboard[2].full_name || leaderboard[2].email || '', 'lg', leaderboard[2].avatar_url))}`}>
                    {getAvatarProps(leaderboard[2].full_name || leaderboard[2].email || '', 'lg', leaderboard[2].avatar_url).content}
                  </div>
                  <Medal className="w-8 h-8 text-amber-600 mx-auto mb-2 mt-4" />
                  <div className="text-xl font-bold text-foreground mb-1 truncate w-full">
                    {leaderboard[2].username || leaderboard[2].full_name || leaderboard[2].email?.split('@')[0]}
                  </div>
                  <div className="text-2xl font-bold text-amber-600 mb-2">
                    {leaderboard[2].points.toLocaleString()} pts
                  </div>
                </div>
              </div>
            )}

            {/* Full Leaderboard */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="text-lg font-bold text-foreground">Rankings</h2>
              </div>
              <div className="divide-y divide-border">
                {leaderboard.map((user, index) => {
                  const displayName = user.username || user.full_name || user.email?.split('@')[0] || 'Anonymous'
                  const level = Math.floor((user.points || 0) / 1000) + 1
                  
                  return (
                    <Link
                      key={user.id}
                      href={`/profile/${user.username || user.id}`}
                      className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                        index < 3 ? "bg-accent/5" : ""
                      } ${user.is_current_user ? "border-l-4 border-l-accent" : ""}`}
                    >
                      {/* Rank */}
                      <div className="w-12 text-center">
                        {index === 0 ? (
                          <Crown className="w-6 h-6 text-yellow-500 mx-auto" />
                        ) : index === 1 ? (
                          <Medal className="w-6 h-6 text-gray-400 mx-auto" />
                        ) : index === 2 ? (
                          <Medal className="w-6 h-6 text-amber-600 mx-auto" />
                        ) : (
                          <span className="text-xl font-bold text-muted-foreground">#{user.rank}</span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className={getAvatarClasses(getAvatarProps(user.full_name || user.email || '', 'md', user.avatar_url))}>
                        {getAvatarProps(user.full_name || user.email || '', 'md', user.avatar_url).content}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground truncate">
                          {displayName}
                          {user.is_current_user && <span className="ml-2 text-xs text-accent">(You)</span>}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-500" />
                            {user.streak_count} day streak
                          </span>
                          <span>Level {level}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="hidden md:flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-foreground">{user.total_lessons_completed}</div>
                          <div className="text-xs text-muted-foreground">Lessons</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-foreground">{user.total_challenges_solved}</div>
                          <div className="text-xs text-muted-foreground">Challenges</div>
                        </div>
                      </div>

                      {/* Points */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-accent">{user.points.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
              {(["overall", "python", "javascript", "challenges"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setCategoryFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    categoryFilter === filter
                      ? "bg-accent text-accent-foreground"
                      : "bg-card border border-border text-foreground hover:border-accent"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Second Place */}
          <div className="order-2 md:order-1">
            <div className="bg-card border border-border rounded-lg p-6 text-center h-full">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-400 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {mockLeaderboard[1].avatar}
              </div>
              <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground mb-1">{mockLeaderboard[1].name}</div>
              <div className="text-2xl font-bold text-gray-400 mb-2">
                {mockLeaderboard[1].points.toLocaleString()} pts
              </div>
              <div className="text-sm text-muted-foreground">{mockLeaderboard[1].level}</div>
            </div>
          </div>

          {/* First Place */}
          <div className="order-1 md:order-2">
            <div className="bg-gradient-to-b from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-lg p-6 text-center h-full">
              <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="w-20 h-20 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                {mockLeaderboard[0].avatar}
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{mockLeaderboard[0].name}</div>
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                {mockLeaderboard[0].points.toLocaleString()} pts
              </div>
              <div className="text-sm text-muted-foreground mb-3">{mockLeaderboard[0].level}</div>
              <div className="flex justify-center gap-2 flex-wrap">
                {mockLeaderboard[0].badges.slice(0, 2).map((badge, i) => (
                  <span key={i} className="px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded text-xs">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Third Place */}
          <div className="order-3">
            <div className="bg-card border border-border rounded-lg p-6 text-center h-full">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {mockLeaderboard[2].avatar}
              </div>
              <Medal className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground mb-1">{mockLeaderboard[2].name}</div>
              <div className="text-2xl font-bold text-amber-600 mb-2">
                {mockLeaderboard[2].points.toLocaleString()} pts
              </div>
              <div className="text-sm text-muted-foreground">{mockLeaderboard[2].level}</div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">Rankings</h2>
          </div>
          <div className="divide-y divide-border">
            {mockLeaderboard.map((user, index) => (
              <div
                key={user.id}
                className={`flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                  index < 3 ? "bg-accent/5" : ""
                }`}
              >
                {/* Rank */}
                <div className="w-12 text-center">
                  {index === 0 ? (
                    <Crown className="w-6 h-6 text-yellow-500 mx-auto" />
                  ) : index === 1 ? (
                    <Medal className="w-6 h-6 text-gray-400 mx-auto" />
                  ) : index === 2 ? (
                    <Medal className="w-6 h-6 text-amber-600 mx-auto" />
                  ) : (
                    <span className="text-xl font-bold text-muted-foreground">#{user.rank}</span>
                  )}
                </div>

                {/* Change Indicator */}
                <div className="w-6">
                  {user.change === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                  {user.change === "down" && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                  {user.change === "same" && <div className="w-4 h-1 bg-muted-foreground/30 rounded mx-auto" />}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-lg font-bold text-secondary-foreground">
                  {user.avatar}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">{user.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-500" />
                      {user.streak} day streak
                    </span>
                    <span>{user.level}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-foreground">{user.lessonsCompleted}</div>
                    <div className="text-xs text-muted-foreground">Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-foreground">{user.challengesSolved}</div>
                    <div className="text-xs text-muted-foreground">Challenges</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="hidden lg:flex items-center gap-2">
                  {user.badges.slice(0, 2).map((badge, i) => (
                    <span key={i} className="px-2 py-1 bg-accent/10 text-accent rounded text-xs whitespace-nowrap">
                      {badge}
                    </span>
                  ))}
                  {user.badges.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{user.badges.length - 2}</span>
                  )}
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="text-lg font-bold text-accent">{user.points.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-6">
          <Button variant="outline" className="bg-transparent">
            Load More Rankings
          </Button>
        </div>
      </div>
    </div>
  )
}
