"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Terminal, Trophy, Zap, Target } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  language: string
  points: number
  boilerplate: string
  solution: string
  tests: { input: string; output: string }[]
  hint?: string
}

const challenges: Challenge[] = [
  {
    id: "py1",
    title: "FizzBuzz",
    description:
      "Write a program that prints numbers 1-100. For multiples of 3, print 'Fizz'. For multiples of 5, print 'Buzz'. For both, print 'FizzBuzz'.",
    difficulty: "easy",
    language: "python",
    points: 50,
    boilerplate: `def fizzbuzz(n):
    # Your code here
    pass

# Test your function
for i in range(1, 101):
    print(fizzbuzz(i))`,
    solution: `def fizzbuzz(n):
    if n % 15 == 0:
        return "FizzBuzz"
    elif n % 3 == 0:
        return "Fizz"
    elif n % 5 == 0:
        return "Buzz"
    return str(n)`,
    tests: [
      { input: "3", output: "Fizz" },
      { input: "5", output: "Buzz" },
      { input: "15", output: "FizzBuzz" },
    ],
    hint: "Think about the order of your conditions - check for 15 first!",
  },
  {
    id: "py2",
    title: "Palindrome Check",
    description: "Write a function that checks if a string is a palindrome (reads the same forwards and backwards).",
    difficulty: "easy",
    language: "python",
    points: 50,
    boilerplate: `def is_palindrome(s):
    # Your code here
    pass

# Test
print(is_palindrome("racecar"))  # True
print(is_palindrome("hello"))    # False`,
    solution: `def is_palindrome(s):
    cleaned = s.lower().replace(" ", "")
    return cleaned == cleaned[::-1]`,
    tests: [
      { input: "racecar", output: "True" },
      { input: "hello", output: "False" },
    ],
    hint: "Use string slicing with [::-1] to reverse a string in Python!",
  },
  {
    id: "py3",
    title: "Two Sum",
    description: "Given an array of integers and a target, return indices of two numbers that add up to the target.",
    difficulty: "medium",
    language: "python",
    points: 100,
    boilerplate: `def two_sum(nums, target):
    # Your code here
    pass

# Test
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`,
    solution: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    tests: [{ input: "[2, 7, 11, 15], 9", output: "[0, 1]" }],
    hint: "Use a dictionary to store numbers you've seen and their indices.",
  },
  {
    id: "js1",
    title: "Array Sum",
    description: "Write a function that returns the sum of all numbers in an array.",
    difficulty: "easy",
    language: "javascript",
    points: 50,
    boilerplate: `function sumArray(arr) {
    // Your code here
}

console.log(sumArray([1, 2, 3, 4, 5])); // 15`,
    solution: `function sumArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}`,
    tests: [{ input: "[1, 2, 3]", output: "6" }],
    hint: "The reduce method is perfect for this!",
  },
  {
    id: "js2",
    title: "Flatten Array",
    description: "Write a function that flattens a nested array into a single-level array.",
    difficulty: "medium",
    language: "javascript",
    points: 100,
    boilerplate: `function flatten(arr) {
    // Your code here
}

console.log(flatten([1, [2, [3, 4]], 5])); // [1, 2, 3, 4, 5]`,
    solution: `function flatten(arr) {
    return arr.reduce((flat, item) => {
        return flat.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
}`,
    tests: [{ input: "[1, [2, [3, 4]], 5]", output: "[1, 2, 3, 4, 5]" }],
    hint: "Recursion is your friend here!",
  },
  {
    id: "js3",
    title: "Debounce Function",
    description: "Implement a debounce function that delays execution until after a specified time has passed.",
    difficulty: "hard",
    language: "javascript",
    points: 150,
    boilerplate: `function debounce(fn, delay) {
    // Your code here
}

// Usage example
const debouncedLog = debounce(console.log, 1000);`,
    solution: `function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}`,
    tests: [{ input: "fn, 1000", output: "debounced function" }],
    hint: "Use setTimeout and clearTimeout to manage the delay.",
  },
]

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)

  let filtered = challenges
  if (selectedLanguage) {
    filtered = filtered.filter((c) => c.language === selectedLanguage)
  }
  if (selectedDifficulty) {
    filtered = filtered.filter((c) => c.difficulty === selectedDifficulty)
  }

  const languages = Array.from(new Set(challenges.map((c) => c.language)))

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
              <Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground">
                Leaderboard
              </Link>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Coding Challenges</h1>
          <p className="text-muted-foreground">Practice your skills and earn points, bro!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedChallenge ? (
          <ChallengeView challenge={selectedChallenge} onBack={() => setSelectedChallenge(null)} />
        ) : (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Challenges Completed</div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                <Zap className="w-8 h-8 text-accent" />
                <div>
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
                <Target className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{challenges.length}</div>
                  <div className="text-sm text-muted-foreground">Available Challenges</div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-wrap gap-4">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Language</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedLanguage(null)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedLanguage === null
                        ? "bg-accent text-accent-foreground"
                        : "bg-card border border-border text-foreground hover:border-accent"
                    }`}
                  >
                    All
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
                      {lang === "python" ? "Python" : "JavaScript"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedDifficulty(null)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedDifficulty === null
                        ? "bg-accent text-accent-foreground"
                        : "bg-card border border-border text-foreground hover:border-accent"
                    }`}
                  >
                    All
                  </button>
                  {["easy", "medium", "hard"].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedDifficulty === diff
                          ? "bg-accent text-accent-foreground"
                          : "bg-card border border-border text-foreground hover:border-accent"
                      }`}
                    >
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((challenge) => (
                <button
                  key={challenge.id}
                  onClick={() => setSelectedChallenge(challenge)}
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-all text-left group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {challenge.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                        challenge.difficulty === "easy"
                          ? "bg-green-500/10 text-green-400"
                          : challenge.difficulty === "medium"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{challenge.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {challenge.language === "python" ? "🐍 Python" : "⚡ JavaScript"}
                    </span>
                    <span className="text-accent font-medium text-sm">+{challenge.points} pts</span>
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

function ChallengeView({ challenge, onBack }: { challenge: Challenge; onBack: () => void }) {
  const [code, setCode] = useState(challenge.boilerplate)
  const [testResults, setTestResults] = useState<{ passed: number; total: number } | null>(null)
  const [running, setRunning] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleRunTests = async () => {
    setRunning(true)
    // Simulate test execution
    setTimeout(() => {
      setTestResults({ passed: challenge.tests.length, total: challenge.tests.length })
      setRunning(false)
    }, 1500)
  }

  const handleShowSolution = () => {
    setCode(challenge.solution)
  }

  return (
    <div>
      {/* Challenge Header */}
      <div className="mb-8">
        <button onClick={onBack} className="text-accent hover:text-accent/80 mb-4 flex items-center gap-1">
          ← Back to Challenges
        </button>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{challenge.title}</h1>
            <p className="text-muted-foreground">{challenge.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-accent">+{challenge.points}</div>
            <div className="text-sm text-muted-foreground">Points</div>
          </div>
        </div>
      </div>

      {/* Editor and Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Code Editor */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">Write Your Solution</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 bg-background border border-border rounded-lg p-4 text-foreground font-mono text-sm focus:outline-none focus:border-accent resize-none"
          />

          <div className="flex gap-2 mt-4">
            <Button onClick={handleRunTests} disabled={running} className="flex-1">
              {running ? "Running Tests..." : "Run Tests"}
            </Button>
            <Button variant="outline" onClick={() => setShowHint(!showHint)} className="flex-1 bg-transparent">
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
            <Button variant="outline" onClick={handleShowSolution} className="flex-1 bg-transparent">
              Show Solution
            </Button>
          </div>

          {showHint && challenge.hint && (
            <div className="mt-4 bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <span className="font-medium text-accent">Hint:</span> {challenge.hint}
              </p>
            </div>
          )}
        </div>

        {/* Test Results */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Test Results</label>
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            {testResults ? (
              <>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{testResults.passed}</div>
                  <div className="text-sm text-muted-foreground">
                    {testResults.passed}/{testResults.total} tests passed
                  </div>
                </div>
                {testResults.passed === testResults.total && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                    <div className="text-green-400 font-medium">Nice one, bro! Challenge Completed!</div>
                    <div className="text-xs text-muted-foreground mt-1">You earned {challenge.points} points</div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-muted-foreground text-sm">Run tests to see results</div>
            )}

            <div className="border-t border-border pt-4">
              <h4 className="font-medium text-foreground text-sm mb-3">Test Cases</h4>
              <div className="space-y-2">
                {challenge.tests.map((test, i) => (
                  <div key={i} className="text-xs bg-background rounded p-2">
                    <div className="text-muted-foreground">
                      Input: <span className="text-foreground">{test.input}</span>
                    </div>
                    <div className="text-muted-foreground">
                      Expected: <span className="text-foreground">{test.output}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
