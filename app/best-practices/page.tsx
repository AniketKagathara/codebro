"use client"

import { useState } from "react"
import Link from "next/link"
import { Terminal, Lightbulb, Zap, Shield, Code2 } from "lucide-react"

interface BestPractice {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  code: string
  explanation: string
  proTip?: string
}

const bestPractices: Record<string, BestPractice[]> = {
  python: [
    {
      id: "p1",
      title: "List Comprehensions",
      description: "Write concise and readable list operations",
      category: "Performance",
      difficulty: "intermediate",
      code: `# Instead of:\nresult = []\nfor x in range(10):\n    result.append(x ** 2)\n\n# Use:\nresult = [x ** 2 for x in range(10)]`,
      explanation:
        "List comprehensions are faster, more readable, and more Pythonic. They're a staple in professional Python code.",
      proTip: "You can also add conditions: [x for x in range(10) if x % 2 == 0]",
    },
    {
      id: "p2",
      title: "Use Type Hints",
      description: "Make your code more maintainable with type hints",
      category: "Code Quality",
      difficulty: "intermediate",
      code: `def add_numbers(a: int, b: int) -> int:\n    """Add two numbers and return result."""\n    return a + b\n\n# Type hints help IDEs autocomplete\nresult: int = add_numbers(5, 3)`,
      explanation:
        "Type hints improve code readability, enable better IDE support, and make debugging easier. They're essential in professional codebases.",
      proTip: "Use mypy to catch type errors before runtime!",
    },
    {
      id: "p3",
      title: "Avoid Mutable Default Arguments",
      description: "Prevent unexpected bugs in your functions",
      category: "Gotchas",
      difficulty: "advanced",
      code: `# DON'T do this:\ndef add_item(item, lst=[]):\n    lst.append(item)\n    return lst\n\n# DO this instead:\ndef add_item(item, lst=None):\n    if lst is None:\n        lst = []\n    lst.append(item)\n    return lst`,
      explanation:
        "Mutable default arguments are shared across function calls. This is a common source of bugs in Python. Always use None as default for mutable types.",
      proTip: "This applies to lists, dicts, sets, and any other mutable object.",
    },
    {
      id: "p4",
      title: "Context Managers for Resources",
      description: "Properly manage files and connections",
      category: "Best Practice",
      difficulty: "beginner",
      code: `# DON'T do this:\nf = open('file.txt')\ndata = f.read()\nf.close()  # Easy to forget!\n\n# DO this instead:\nwith open('file.txt') as f:\n    data = f.read()\n# File is automatically closed`,
      explanation:
        "Context managers (with statement) ensure resources are properly cleaned up, even if exceptions occur.",
      proTip: "You can create custom context managers with contextlib!",
    },
    {
      id: "p5",
      title: "Use enumerate() for Indices",
      description: "Clean iteration with index access",
      category: "Performance",
      difficulty: "beginner",
      code: `# DON'T do this:\ni = 0\nfor item in items:\n    print(f"{i}: {item}")\n    i += 1\n\n# DO this instead:\nfor i, item in enumerate(items):\n    print(f"{i}: {item}")`,
      explanation: "enumerate() is more Pythonic, less error-prone, and more readable than manual index tracking.",
    },
    {
      id: "p6",
      title: "F-strings for Formatting",
      description: "Modern string formatting in Python",
      category: "Syntax",
      difficulty: "beginner",
      code: `name = "Alice"\nage = 30\n\n# Old ways:\nprint("Hello, %s! You are %d." % (name, age))\nprint("Hello, {}! You are {}.".format(name, age))\n\n# Best way (Python 3.6+):\nprint(f"Hello, {name}! You are {age}.")`,
      explanation: "F-strings are faster, more readable, and support expressions inside braces.",
      proTip: "You can even do math: f'{2 + 2}' returns '4'",
    },
  ],
  javascript: [
    {
      id: "j1",
      title: "Use const by Default",
      description: "Write more predictable and safer JavaScript",
      category: "Best Practice",
      difficulty: "beginner",
      code: `// Good\nconst name = "John";\nconst age = 25;\n\n// Use let only when value changes\nlet count = 0;\ncount++;\n\n// Avoid var (legacy)`,
      explanation:
        "Using const by default prevents accidental reassignments and makes your intent clear. Use let for variables that need to change.",
      proTip: "const doesn't make objects immutable - use Object.freeze() for that!",
    },
    {
      id: "j2",
      title: "Arrow Functions vs Regular Functions",
      description: "Understand when to use each",
      category: "Syntax",
      difficulty: "intermediate",
      code: `// Use arrow functions for callbacks:\nconst numbers = [1, 2, 3];\nconst doubled = numbers.map(n => n * 2);\n\n// Use regular functions for object methods:\nconst obj = {\n    name: "John",\n    greet: function() {\n        console.log(this.name); // 'this' binding\n    }\n};`,
      explanation:
        "Arrow functions have different 'this' binding than regular functions. Use them for callbacks but regular functions for methods.",
      proTip: "Arrow functions also can't be used as constructors!",
    },
    {
      id: "j3",
      title: "Async/Await over .then()",
      description: "Write cleaner asynchronous code",
      category: "Async",
      difficulty: "intermediate",
      code: `// Instead of chains:\nfetch(url)\n    .then(res => res.json())\n    .then(data => console.log(data))\n    .catch(err => console.error(err));\n\n// Use async/await:\nasync function fetchData() {\n    try {\n        const res = await fetch(url);\n        const data = await res.json();\n        console.log(data);\n    } catch (err) {\n        console.error(err);\n    }\n}`,
      explanation:
        "Async/await is more readable than promise chains and makes error handling clearer. It's the modern standard for async code.",
    },
    {
      id: "j4",
      title: "Destructuring Assignment",
      description: "Extract values elegantly",
      category: "Syntax",
      difficulty: "beginner",
      code: `// Object destructuring\nconst user = { name: 'John', age: 30 };\nconst { name, age } = user;\n\n// Array destructuring\nconst [first, second] = [1, 2, 3];\n\n// With defaults\nconst { role = 'user' } = user;`,
      explanation: "Destructuring makes extracting values from objects and arrays cleaner and more readable.",
      proTip: "You can also rename: const { name: userName } = user;",
    },
    {
      id: "j5",
      title: "Optional Chaining",
      description: "Safely access nested properties",
      category: "Gotchas",
      difficulty: "intermediate",
      code: `// DON'T do this:\nconst city = user && user.address && user.address.city;\n\n// DO this instead:\nconst city = user?.address?.city;\n\n// Works with methods too:\nuser?.getAddress?.();`,
      explanation:
        "Optional chaining (?.) prevents errors when accessing nested properties that might be null or undefined.",
    },
    {
      id: "j6",
      title: "Nullish Coalescing",
      description: "Better default values",
      category: "Syntax",
      difficulty: "intermediate",
      code: `// || treats 0, '', false as falsy\nconst count = value || 10; // 0 becomes 10!\n\n// ?? only treats null/undefined as nullish\nconst count = value ?? 10; // 0 stays 0!`,
      explanation: "Use ?? instead of || when 0, '', or false are valid values you want to keep.",
    },
  ],
  typescript: [
    {
      id: "t1",
      title: "Use Interface for Objects",
      description: "Define clear contracts for your data",
      category: "Types",
      difficulty: "beginner",
      code: `interface User {\n  id: number;\n  name: string;\n  email: string;\n  role?: 'admin' | 'user'; // optional\n}\n\nfunction greet(user: User): string {\n  return \`Hello, \${user.name}!\`;\n}`,
      explanation: "Interfaces define the shape of objects and enable TypeScript to catch errors at compile time.",
    },
    {
      id: "t2",
      title: "Generic Types",
      description: "Write reusable, type-safe code",
      category: "Advanced",
      difficulty: "advanced",
      code: `// Generic function\nfunction first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\n// Usage - types are inferred!\nconst num = first([1, 2, 3]); // number\nconst str = first(['a', 'b']); // string`,
      explanation:
        "Generics let you write functions and classes that work with any type while maintaining type safety.",
    },
    {
      id: "t3",
      title: "Utility Types",
      description: "Transform types without rewriting",
      category: "Types",
      difficulty: "intermediate",
      code: `interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\n// All properties optional\ntype PartialUser = Partial<User>;\n\n// All properties required\ntype RequiredUser = Required<User>;\n\n// Pick specific properties\ntype UserName = Pick<User, 'name'>;`,
      explanation: "TypeScript's utility types help you derive new types from existing ones without duplication.",
    },
  ],
}

const categories = [
  { id: "all", label: "All", icon: Code2 },
  { id: "Performance", label: "Performance", icon: Zap },
  { id: "Code Quality", label: "Code Quality", icon: Shield },
  { id: "Gotchas", label: "Gotchas", icon: Lightbulb },
  { id: "Best Practice", label: "Best Practice", icon: Lightbulb },
  { id: "Syntax", label: "Syntax", icon: Code2 },
  { id: "Async", label: "Async", icon: Zap },
  { id: "Types", label: "Types", icon: Shield },
  { id: "Advanced", label: "Advanced", icon: Zap },
]

export default function BestPracticesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<"python" | "javascript" | "typescript">("python")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const practices = bestPractices[selectedLanguage] || []
  const filtered = selectedCategory === "all" ? practices : practices.filter((p) => p.category === selectedCategory)

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
          <h1 className="text-4xl font-bold text-foreground mb-2">Best Practices & Pro Tips</h1>
          <p className="text-muted-foreground">Learn insider secrets and professional standards, bro!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Language</h3>
            <div className="flex gap-2">
              {(["python", "javascript", "typescript"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang)
                    setSelectedCategory("all")
                  }}
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

          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedCategory === cat.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-card border border-border text-foreground hover:border-accent"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Best Practices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((practice) => (
            <div key={practice.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{practice.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{practice.description}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded whitespace-nowrap ml-2 ${
                    practice.difficulty === "beginner"
                      ? "bg-green-500/10 text-green-400"
                      : practice.difficulty === "intermediate"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {practice.difficulty}
                </span>
              </div>

              {/* Code Block */}
              <div className="bg-background border border-border rounded-lg p-4 mb-4 overflow-x-auto">
                <pre className="font-mono text-xs text-muted-foreground">
                  <code>{practice.code}</code>
                </pre>
              </div>

              {/* Explanation */}
              <p className="text-sm text-foreground bg-background/50 border border-border rounded-lg p-4 mb-3">
                <span className="font-medium text-accent">Why?</span> {practice.explanation}
              </p>

              {/* Pro Tip */}
              {practice.proTip && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <p className="text-sm text-foreground">
                    <span className="font-medium text-accent">Pro Tip:</span> {practice.proTip}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No practices found for this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
