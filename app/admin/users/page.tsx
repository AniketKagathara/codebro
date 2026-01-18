"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { getAvatarProps, getAvatarClasses } from "@/lib/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Terminal, 
  Users, 
  Search,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface User {
  id: string
  email: string
  full_name: string | null
  username: string | null
  avatar_url: string | null
  points: number
  level: number
  streak_count: number
  total_lessons_completed: number
  total_challenges_solved: number
  created_at: string
  last_active_at: string | null
}

export default function AdminUsersPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/auth/signin')
        return
      }

      const { data: userData } = await supabase
        .from('users')
        .select('email')
        .eq('id', user.id)
        .single()

      if (!userData?.email?.includes('admin')) {
        router.push('/dashboard')
      }
    }
    
    checkAuth()
  }, [router])

  useEffect(() => {
    loadUsers()
  }, [page])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/users?page=${page}&limit=20`)
      const data = await response.json()
      
      if (response.ok) {
        setUsers(data.users)
        setTotalPages(data.total_pages)
        setTotalUsers(data.total)
      }
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })

      if (response.ok) {
        loadUsers()
      } else {
        alert('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Error deleting user')
    }
  }

  const filteredUsers = users.filter(user => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      user.email?.toLowerCase().includes(query) ||
      user.full_name?.toLowerCase().includes(query) ||
      user.username?.toLowerCase().includes(query)
    )
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
          >
            <Terminal className="w-6 h-6 text-accent" />
            <span className="text-xl font-bold">Code, Bro! Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Users className="w-10 h-10 text-accent" />
              User Management
            </h1>
            <p className="text-muted-foreground">{totalUsers} total users</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, username, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Users Table */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Stats
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredUsers.map((user) => {
                      const displayName = user.username || user.full_name || user.email?.split('@')[0]
                      const joinedDate = new Date(user.created_at).toLocaleDateString()
                      const lastActive = user.last_active_at 
                        ? new Date(user.last_active_at).toLocaleDateString()
                        : 'Never'

                      return (
                        <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className={getAvatarClasses(getAvatarProps(user.full_name || user.email || '', 'sm', user.avatar_url))}>
                                {getAvatarProps(user.full_name || user.email || '', 'sm', user.avatar_url).content}
                              </div>
                              <div>
                                <div className="font-medium text-foreground">{displayName}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              <div className="font-medium text-foreground">{user.points} pts • Level {user.level}</div>
                              <div className="text-muted-foreground">
                                {user.total_lessons_completed} lessons • {user.total_challenges_solved} challenges
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              <div className="text-foreground">🔥 {user.streak_count} day streak</div>
                              <div className="text-muted-foreground text-xs">Last: {lastActive}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            {joinedDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Link href={`/profile/${user.username || user.id}`}>
                              <Button variant="outline" size="sm" className="mr-2">
                                View
                              </Button>
                            </Link>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-500 hover:text-red-600 hover:border-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {page} of {totalPages} • {totalUsers} total users
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
