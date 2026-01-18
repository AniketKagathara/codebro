"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Terminal, ChevronRight, Lightbulb, CheckCircle2, PlayCircle, BookOpen } from "lucide-react"
import { type languages, getLanguageById } from "@/lib/course-data"

// In Next.js 16, dynamic route params come as an object that needs to be awaited in Server Components
// For Client Components, we receive the resolved params object directly
export default function LearnPage({ params }: { params: { language: string } }) {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())

  const language = getLanguageById(params.language)

  if (!language) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Language not found</h1>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const progress = Math.round((completedLessons.size / language.lessons.length) * 100)

  const markComplete = (lessonId: string) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
            >
              <Terminal className="w-6 h-6 text-accent" />
              <span className="text-xl font-bold">Code, Bro!</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/challenges" className="text-sm text-muted-foreground hover:text-foreground">
                Challenges
              </Link>
              <Link href="/best-practices" className="text-sm text-muted-foreground hover:text-foreground">
                Best Practices
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{language.icon}</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{language.name} Mastery</h1>
              <p className="text-sm text-muted-foreground">{language.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Progress</div>
              <div className="flex items-center gap-2">
                <Progress value={progress} className="w-32 h-2" />
                <span className="text-sm font-medium text-foreground">{progress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-32">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Learning Path
              </h2>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {language.lessons.map((lesson, index) => {
                  const isCompleted = completedLessons.has(lesson.id)
                  const isSelected = selectedLesson === lesson.id

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        isSelected
                          ? "bg-accent/10 border-accent"
                          : isCompleted
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-background border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            isCompleted ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm truncate">{lesson.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {lesson.duration} min · {lesson.difficulty}
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${isSelected ? "rotate-90 text-accent" : "text-muted-foreground"}`}
                        />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Learning Area */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <LessonView
                language={language}
                lessonId={selectedLesson}
                onComplete={markComplete}
                isCompleted={completedLessons.has(selectedLesson)}
                onNext={() => {
                  const currentIndex = language.lessons.findIndex((l) => l.id === selectedLesson)
                  if (currentIndex < language.lessons.length - 1) {
                    setSelectedLesson(language.lessons[currentIndex + 1].id)
                  }
                }}
                onPrev={() => {
                  const currentIndex = language.lessons.findIndex((l) => l.id === selectedLesson)
                  if (currentIndex > 0) {
                    setSelectedLesson(language.lessons[currentIndex - 1].id)
                  }
                }}
              />
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <PlayCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Learn {language.name}?</h2>
                <p className="text-muted-foreground mb-6">
                  Select a lesson from the sidebar to start your journey. Each lesson includes theory, code examples,
                  hands-on exercises, and pro tips from experienced developers.
                </p>
                <Button onClick={() => setSelectedLesson(language.lessons[0].id)}>Start with Lesson 1</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface LessonViewProps {
  language: (typeof languages)[0]
  lessonId: string
  onComplete: (id: string) => void
  isCompleted: boolean
  onNext: () => void
  onPrev: () => void
}

function LessonView({ language, lessonId, onComplete, isCompleted, onNext, onPrev }: LessonViewProps) {
  const lesson = language.lessons.find((l) => l.id === lessonId)
  const [activeTab, setActiveTab] = useState<"lesson" | "exercise" | "tips">("lesson")
  const [code, setCode] = useState(lesson?.exercise.starterCode || "")
  const [output, setOutput] = useState("")
  const [showSolution, setShowSolution] = useState(false)
  const [running, setRunning] = useState(false)

  if (!lesson) return null

  const currentIndex = language.lessons.findIndex((l) => l.id === lessonId)
  const hasNext = currentIndex < language.lessons.length - 1
  const hasPrev = currentIndex > 0

  const handleRun = async () => {
    setRunning(true)
    setTimeout(() => {
      setOutput("Code executed successfully!\n\n[Output would appear here in a real environment]")
      setRunning(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  lesson.difficulty === "beginner"
                    ? "bg-green-500/10 text-green-400"
                    : lesson.difficulty === "intermediate"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-red-500/10 text-red-400"
                }`}
              >
                {lesson.difficulty.toUpperCase()}
              </span>
              <span className="text-xs text-muted-foreground">{lesson.duration} min</span>
              {isCompleted && (
                <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
            <p className="text-muted-foreground mt-1">{lesson.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          {(["lesson", "exercise", "tips"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "lesson" ? "Lesson" : tab === "exercise" ? "Exercise" : "Pro Tips"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "lesson" && (
        <div className="space-y-6">
          {/* Lesson Content */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">{lesson.content}</div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Code Example</h3>
            <div className="bg-background border border-border rounded-lg p-4 overflow-x-auto">
              <pre className="font-mono text-sm text-muted-foreground whitespace-pre-wrap">
                <code>{lesson.codeExample}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {activeTab === "exercise" && (
        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">Exercise</h3>
            <p className="text-foreground">{lesson.exercise.instructions}</p>
          </div>

          {/* Code Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Your Code</label>
              <textarea
                value={showSolution ? lesson.exercise.solution : code}
                onChange={(e) => {
                  setShowSolution(false)
                  setCode(e.target.value)
                }}
                className="w-full h-72 bg-background border border-border rounded-lg p-4 text-foreground font-mono text-sm focus:outline-none focus:border-accent resize-none"
                placeholder="Write your code here..."
              />
              <div className="flex gap-2 mt-3">
                <Button onClick={handleRun} disabled={running} className="flex-1">
                  {running ? "Running..." : "Run Code"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex-1 bg-transparent"
                >
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Output</label>
              <div className="h-72 bg-background border border-border rounded-lg p-4 font-mono text-sm text-muted-foreground overflow-auto">
                {output || <span className="text-muted-foreground/50">Output will appear here...</span>}
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" onClick={() => setOutput("")} className="flex-1 bg-transparent">
                  Clear Output
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCode(lesson.exercise.starterCode)}
                  className="flex-1 bg-transparent"
                >
                  Reset Code
                </Button>
              </div>
            </div>
          </div>

          {/* Test Cases */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Test Cases</h3>
            <div className="space-y-2">
              {lesson.exercise.tests.map((test, i) => (
                <div key={i} className="bg-background border border-border rounded-lg p-3 text-sm">
                  <div className="text-muted-foreground">
                    Input: <code className="text-foreground">{test.input}</code>
                  </div>
                  <div className="text-muted-foreground">
                    Expected: <code className="text-foreground">{test.expected}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "tips" && (
        <div className="space-y-6">
          {/* Pro Tips */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Pro Tips
            </h3>
            <ul className="space-y-3">
              {lesson.proTips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-foreground">
                  <span className="text-yellow-500 mt-1">★</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Best Practices */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Best Practices
            </h3>
            <ul className="space-y-3">
              {lesson.bestPractices.map((practice, i) => (
                <li key={i} className="flex gap-3 text-foreground">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{practice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onPrev} disabled={!hasPrev} className="flex-1 bg-transparent">
          ← Previous Lesson
        </Button>
        {!isCompleted ? (
          <Button onClick={() => onComplete(lessonId)} className="flex-1">
            Mark as Complete
          </Button>
        ) : (
          <Button onClick={onNext} disabled={!hasNext} className="flex-1">
            Next Lesson →
          </Button>
        )}
      </div>
    </div>
  )
}
