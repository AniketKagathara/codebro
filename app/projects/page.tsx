"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Terminal, FolderGit2, Clock, Star } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  language: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number
  skills: string[]
  starter: string
  completed?: boolean
}

const projects: Project[] = [
  {
    id: "py-calc",
    title: "Build a Calculator",
    description: "Create a command-line calculator with basic arithmetic operations",
    language: "python",
    difficulty: "beginner",
    duration: 30,
    skills: ["Functions", "User Input", "Error Handling"],
    starter: `# Calculator Project\n\ndef add(a, b):\n    pass\n\ndef subtract(a, b):\n    pass\n\n# Build your calculator here`,
    completed: false,
  },
  {
    id: "py-todo",
    title: "Todo App",
    description: "Build a todo list application with file persistence",
    language: "python",
    difficulty: "intermediate",
    duration: 90,
    skills: ["File I/O", "Classes", "Data Structures"],
    starter: `# Todo App Project\n\nclass TodoApp:\n    def __init__(self):\n        self.todos = []\n    \n    def add_todo(self, task):\n        pass\n\napp = TodoApp()`,
    completed: false,
  },
  {
    id: "py-webscraper",
    title: "Web Scraper",
    description: "Learn web scraping by building a news scraper",
    language: "python",
    difficulty: "advanced",
    duration: 120,
    skills: ["HTTP Requests", "HTML Parsing", "Data Extraction"],
    starter: `# Web Scraper Project\nimport requests\nfrom bs4 import BeautifulSoup\n\n# Build your scraper here`,
    completed: false,
  },
  {
    id: "py-api",
    title: "REST API with FastAPI",
    description: "Build a production-ready REST API with FastAPI",
    language: "python",
    difficulty: "advanced",
    duration: 180,
    skills: ["FastAPI", "Pydantic", "Database", "Authentication"],
    starter: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}`,
    completed: false,
  },
  {
    id: "js-counter",
    title: "Interactive Counter",
    description: "Build an interactive counter with DOM manipulation",
    language: "javascript",
    difficulty: "beginner",
    duration: 20,
    skills: ["DOM", "Event Handling", "State"],
    starter: `// Counter Project\nlet count = 0;\n\nfunction increment() {\n    // Your code here\n}\n\nfunction decrement() {\n    // Your code here\n}`,
    completed: false,
  },
  {
    id: "js-weather",
    title: "Weather App",
    description: "Build a real weather app using a public API",
    language: "javascript",
    difficulty: "intermediate",
    duration: 120,
    skills: ["API Calls", "Async/Await", "DOM Manipulation"],
    starter: `// Weather App Project\nasync function getWeather(city) {\n    // Fetch weather data\n}\n\n// Build your app here`,
    completed: false,
  },
  {
    id: "js-chatbot",
    title: "Simple Chatbot",
    description: "Create an interactive chatbot using JavaScript",
    language: "javascript",
    difficulty: "advanced",
    duration: 180,
    skills: ["AI Integration", "State Management", "UX"],
    starter: `// Chatbot Project\nclass Chatbot {\n    constructor() {\n        this.messages = [];\n    }\n    \n    respond(userInput) {\n        // Your code here\n    }\n}`,
    completed: false,
  },
  {
    id: "ts-react",
    title: "React Todo App",
    description: "Build a type-safe Todo app with React and TypeScript",
    language: "typescript",
    difficulty: "intermediate",
    duration: 150,
    skills: ["React", "TypeScript", "State Management", "Components"],
    starter: `interface Todo {\n  id: number;\n  text: string;\n  completed: boolean;\n}\n\nfunction TodoApp() {\n  // Your code here\n}`,
    completed: false,
  },
]

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const filtered = selectedLanguage ? projects.filter((p) => p.language === selectedLanguage) : projects
  const languages = Array.from(new Set(projects.map((p) => p.language)))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-6">
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
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Real-World Projects</h1>
          <p className="text-muted-foreground">Build portfolio-ready projects and showcase your skills, bro!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedProject ? (
          <ProjectView project={selectedProject} onBack={() => setSelectedProject(null)} />
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                <FolderGit2 className="w-8 h-8 text-accent" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{projects.length}</div>
                  <div className="text-sm text-muted-foreground">Available Projects</div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                <Star className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                <Clock className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
              </div>
            </div>

            {/* Language Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-foreground mb-3">Filter by Language</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedLanguage(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedLanguage === null
                      ? "bg-accent text-accent-foreground"
                      : "bg-card border border-border text-foreground hover:border-accent"
                  }`}
                >
                  All Projects
                </button>
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedLanguage === lang
                        ? "bg-accent text-accent-foreground"
                        : "bg-card border border-border text-foreground hover:border-accent"
                    }`}
                  >
                    {lang === "python" ? "Python" : lang === "javascript" ? "JavaScript" : "TypeScript"}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                        project.difficulty === "beginner"
                          ? "bg-green-500/10 text-green-400"
                          : project.difficulty === "intermediate"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                  {/* Skills */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.skills.slice(0, 2).map((skill) => (
                      <span key={skill} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 2 && (
                      <span className="text-xs text-muted-foreground">+{project.skills.length - 2} more</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {project.language === "python"
                        ? "Python"
                        : project.language === "javascript"
                          ? "JavaScript"
                          : "TypeScript"}
                    </span>
                    <span className="text-muted-foreground">{project.duration} mins</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ProjectView({ project, onBack }: { project: Project; onBack: () => void }) {
  const [code, setCode] = useState(project.starter)
  const [completed, setCompleted] = useState(project.completed || false)

  return (
    <div>
      {/* Project Header */}
      <div className="mb-8">
        <button onClick={onBack} className="text-accent hover:text-accent/80 mb-4 flex items-center gap-1">
          ← Back to Projects
        </button>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{project.title}</h1>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              {project.language === "python"
                ? "Python"
                : project.language === "javascript"
                  ? "JavaScript"
                  : "TypeScript"}
            </div>
            <div className="text-sm text-muted-foreground">{project.duration} minutes</div>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Difficulty & Skills */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.difficulty === "beginner"
                    ? "bg-green-500/10 text-green-400"
                    : project.difficulty === "intermediate"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-red-500/10 text-red-400"
                }`}
              >
                {project.difficulty.toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-4">Skills You'll Learn</h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <div key={skill} className="bg-background border border-border rounded-lg px-4 py-2">
                  <div className="text-sm font-medium text-foreground">{skill}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Your Code</h3>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 bg-background border border-border rounded-lg p-4 text-foreground font-mono text-sm focus:outline-none focus:border-accent resize-none"
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={() => setCompleted(true)} className="flex-1">
                {completed ? "Completed!" : "Mark as Complete"}
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Submit for Review
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Stats */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="font-bold text-foreground mb-4">Project Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="text-foreground font-medium">{project.duration} mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty</span>
                <span className="text-foreground font-medium capitalize">{project.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className={`font-medium ${completed ? "text-green-400" : "text-yellow-400"}`}>
                  {completed ? "Completed" : "In Progress"}
                </span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
            <h4 className="font-bold text-foreground mb-4">Tips</h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Break the project into smaller tasks</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Test your code frequently</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>Follow best practices from the guide</span>
              </li>
            </ul>
          </div>

          <Button className="w-full">View Solution</Button>
        </div>
      </div>
    </div>
  )
}
