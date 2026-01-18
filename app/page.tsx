import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, Zap, Users, BookOpen, Award, ArrowRight, Terminal } from "lucide-react"

export const metadata = {
  title: "Code, Bro! - Master Any Programming Language",
  description:
    "Learn any programming language with best practices, insider tips, and real-world projects. Master programming fast like a bro telling another bro to code.",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold">Code, Bro!</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#why" className="text-muted-foreground hover:text-foreground transition">
              Why Us
            </a>
            <a href="#courses" className="text-muted-foreground hover:text-foreground transition">
              Courses
            </a>
            <Link href="/dashboard">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Get Started</Button>
            </Link>
          </div>
          <Button variant="ghost" className="md:hidden">
            Menu
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Accent lines */}
          <div className="absolute top-20 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center mb-16">
            <div className="inline-block mb-6 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
              Your Coding Buddy for Mastering Any Language
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance">
              Hey Bro, Let's <span className="text-accent">Code!</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
              Best practices, insider tips, real-world projects, and secret strategies for every language. Like a friend
              helping you master programming fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8">
                  Start Learning Free
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-border hover:bg-secondary px-8 bg-transparent">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20">
            {[
              { label: "Languages", value: "15+", icon: "📚" },
              { label: "Avg Time to Master", value: "4 Weeks", icon: "⚡" },
              { label: "Active Learners", value: "50K+", icon: "👥" },
              { label: "Success Rate", value: "94%", icon: "🎯" },
            ].map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Makes Code, Bro! Different</h2>
            <p className="text-xl text-muted-foreground">Everything you need to become a master programmer</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Language-Specific Best Practices",
                description:
                  "Learn professional code patterns, conventions, and optimizations for each language. Not just syntax, but how experts actually code.",
              },
              {
                icon: Zap,
                title: "Fast-Track Mastery",
                description:
                  "Master 20% of concepts to gain 80% capability. Learn what matters most and build real projects in weeks, not months.",
              },
              {
                icon: Code2,
                title: "Interactive Code Editor",
                description:
                  "Write, test, and debug code directly in the browser. Instant feedback, AI-powered hints, and real-time learning.",
              },
              {
                icon: Award,
                title: "Secret Insider Tips",
                description:
                  "Debugging tricks, performance secrets, lesser-known features, and pro hacks from experienced developers.",
              },
              {
                icon: Users,
                title: "Community & Code Reviews",
                description:
                  "Get feedback from experts, join study groups, and see how professionals approach the same problems.",
              },
              {
                icon: ArrowRight,
                title: "Portfolio Builder",
                description:
                  "Real-world projects become portfolio pieces. Impress employers with production-ready code and verified credentials.",
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition">
                  <Icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Learning Levels Section */}
      <section id="why" className="relative py-20 px-4 border-t border-border bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Learning Path</h2>
            <p className="text-xl text-muted-foreground">Progress from beginner to expert at your own pace</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                level: "Beginner",
                color: "from-green-500/20 to-transparent",
                description: "Learn fundamentals and write your first program",
              },
              {
                level: "Intermediate",
                color: "from-yellow-500/20 to-transparent",
                description: "Build real projects and apply best practices",
              },
              {
                level: "Advanced",
                color: "from-orange-500/20 to-transparent",
                description: "Master performance and design patterns",
              },
              {
                level: "Expert",
                color: "from-accent to-transparent",
                description: "Contribute to open source and mentor others",
              },
            ].map((item, i) => (
              <div key={i} className={`bg-gradient-to-b ${item.color} border border-border rounded-lg p-6`}>
                <div className="text-sm font-bold text-accent mb-2">Level {i + 1}</div>
                <h3 className="text-xl font-bold mb-2">{item.level}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section id="courses" className="relative py-20 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Learn Any Language</h2>
            <p className="text-xl text-muted-foreground">Master the languages that matter to your career</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Python", "JavaScript", "Java", "C++", "Go", "Rust", "TypeScript", "React", "Node.js", "More..."].map(
              (lang, i) => (
                <button
                  key={i}
                  className="bg-card border border-border rounded-lg py-8 px-4 text-center font-semibold hover:border-accent/50 hover:bg-card/80 transition"
                >
                  {lang}
                </button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Code, Bro?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of developers learning with Code, Bro! Start free, learn fast, master anything.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8">
                Get Started Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-border px-8 bg-transparent">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-6 h-6 text-accent" />
                <span className="font-bold">Code, Bro!</span>
              </div>
              <p className="text-muted-foreground text-sm">Master any programming language like a bro.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Courses", "Community"] },
              { title: "Resources", links: ["Docs", "Blog", "FAQ", "Guides"] },
              { title: "Company", links: ["About", "Contact", "Careers", "Status"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-muted-foreground text-sm">
            <p>&copy; 2026 Code, Bro! All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground transition">
                GitHub
              </a>
              <a href="#" className="hover:text-foreground transition">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
