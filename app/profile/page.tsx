"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { getAvatarProps, getAvatarClasses } from "@/lib/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Terminal, Trophy, Flame, BookOpen, Code2, Award, Calendar, Github, Loader2 } from "lucide-react"

interface UserProfile {
  id: string
  email: string
  fullName: string
  username: string
  bio: string
  avatar: string
  level: string
  points: number
  streak: number
  lessonsCompleted: number
  challengesSolved: number
  projectsCompleted: number
  joinedDate: string
  github?: string
  linkedin?: string
  website?: string
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
}

interface LearningProgress {
  language: string
  icon: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
}

const mockAchievements: Achievement[] = [
  {
    id: "1",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "BookOpen",
    earned: true,
    earnedDate: "Jan 15, 2026",
  },
  {
    id: "2",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "Flame",
    earned: true,
    earnedDate: "Jan 22, 2026",
  },
  { id: "3", name: "Problem Solver", description: "Solve 10 challenges", icon: "Code2", earned: false },
  { id: "4", name: "Python Master", description: "Complete all Python lessons", icon: "Award", earned: false },
  { id: "5", name: "JavaScript Guru", description: "Complete all JavaScript lessons", icon: "Award", earned: false },
  { id: "6", name: "Month Master", description: "Maintain a 30-day streak", icon: "Flame", earned: false },
  { id: "7", name: "Project Builder", description: "Complete 5 projects", icon: "Trophy", earned: false },
  { id: "8", name: "Top 10", description: "Reach the top 10 on leaderboard", icon: "Trophy", earned: false },
]

const mockProgress: LearningProgress[] = [
  { language: "Python", icon: "snake", progress: 25, lessonsCompleted: 3, totalLessons: 12 },
  { language: "JavaScript", icon: "js", progress: 10, lessonsCompleted: 1, totalLessons: 10 },
  { language: "TypeScript", icon: "ts", progress: 0, lessonsCompleted: 0, totalLessons: 8 },
  { language: "React", icon: "react", progress: 0, lessonsCompleted: 0, totalLessons: 10 },
]

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "progress" | "settings">("overview")
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient()
      
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !authUser) {
        router.push('/auth/signin')
        return
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (error) {
        console.error('Error loading profile:', error)
      } else {
        setProfile({
          ...data,
          joinedDate: new Date(data.created_at).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          }),
        })
      }
      
      setLoading(false)
    }

    loadProfile()
  }, [router])

  const handleSaveProfile = async () => {
    if (!profile) return
    
    setSaving(true)
    const supabase = createClient()
    
    const { error } = await supabase
      .from('users')
      .update({
        full_name: profile.fullName,
        username: profile.username,
        bio: profile.bio,
      })
      .eq('id', profile.id)

    if (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } else {
      setIsEditing(false)
    }
    
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  const avatar = getAvatarProps(
    profile.fullName,
    profile.email,
    profile.avatar_type as any,
    profile.avatar_value
  )

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
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className={`w-24 h-24 rounded-full ${getAvatarClasses(avatar.type, avatar.value)}`}>
              {avatar.display}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{profile.fullName || profile.email}</h1>
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  Level {Math.floor((profile.points || 0) / 1000) + 1}
                </span>
              </div>
              <p className="text-muted-foreground mb-2">@{profile.username || profile.email?.split('@')[0]}</p>
              <p className="text-foreground mb-4">{profile.bio || 'Learning to code, bro!'}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {profile.joinedDate}
                </span>
                {profile.github && (
                  <a
                    href={`https://github.com/${profile.github}`}
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    <Github className="w-4 h-4" />
                    {profile.github}
                  </a>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-background rounded-lg border border-border">
                <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{profile.points}</div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border border-border">
                <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{profile.streak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border border-border">
                <BookOpen className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{profile.lessonsCompleted}</div>
                <div className="text-xs text-muted-foreground">Lessons</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border border-border">
                <Code2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{profile.challengesSolved}</div>
                <div className="text-xs text-muted-foreground">Challenges</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border mb-8">
          {(["overview", "achievements", "progress", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No activity yet. Start learning to see your progress!</p>
                <Link href="/dashboard">
                  <Button className="mt-4">Start Learning</Button>
                </Link>
              </div>
            </div>

            {/* Top Languages */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Learning Progress</h2>
              <div className="space-y-4">
                {mockProgress.map((lang) => (
                  <div key={lang.language}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-foreground">{lang.language}</span>
                      <span className="text-muted-foreground">
                        {lang.lessonsCompleted}/{lang.totalLessons} lessons
                      </span>
                    </div>
                    <Progress value={lang.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-card border rounded-lg p-6 text-center ${
                  achievement.earned ? "border-accent/50" : "border-border opacity-60"
                }`}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    achievement.earned ? "bg-accent/20" : "bg-muted"
                  }`}
                >
                  <Award className={`w-8 h-8 ${achievement.earned ? "text-accent" : "text-muted-foreground"}`} />
                </div>
                <h3 className="font-bold text-foreground mb-1">{achievement.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                {achievement.earned && achievement.earnedDate && (
                  <span className="text-xs text-accent">Earned {achievement.earnedDate}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "progress" && (
          <div className="space-y-6">
            {mockProgress.map((lang) => (
              <div key={lang.language} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-bold">
                      {lang.language[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{lang.language}</h3>
                      <p className="text-sm text-muted-foreground">
                        {lang.lessonsCompleted} of {lang.totalLessons} lessons completed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">{lang.progress}%</div>
                    <Link href={`/learn/${lang.language.toLowerCase()}`}>
                      <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                        Continue
                      </Button>
                    </Link>
                  </div>
                </div>
                <Progress value={lang.progress} className="h-3" />
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl">
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-bold text-foreground">Profile Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <Input
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Username</label>
                  <Input
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    placeholder="username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg p-3 text-foreground text-sm focus:outline-none focus:border-accent resize-none"
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">GitHub Username</label>
                  <Input
                    value={profile.github}
                    onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                    placeholder="github-username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">LinkedIn</label>
                  <Input
                    value={profile.linkedin}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    placeholder="linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Website</label>
                  <Input
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <Button className="w-full">Save Changes</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
