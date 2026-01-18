"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Terminal, Award, Download, Share2, ExternalLink, Calendar, CheckCircle } from "lucide-react"

interface Certificate {
  id: string
  name: string
  course: string
  issuedDate: string
  credentialId: string
  skills: string[]
  status: "earned" | "in-progress" | "locked"
  progress?: number
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    name: "Python Fundamentals",
    course: "Complete Python Course",
    issuedDate: "January 15, 2026",
    credentialId: "CB-PY-2026-001",
    skills: ["Python Basics", "Data Structures", "Functions", "OOP"],
    status: "earned",
  },
  {
    id: "2",
    name: "JavaScript Mastery",
    course: "JavaScript Complete Guide",
    issuedDate: "",
    credentialId: "",
    skills: ["ES6+", "DOM Manipulation", "Async/Await", "Closures"],
    status: "in-progress",
    progress: 65,
  },
  {
    id: "3",
    name: "React Developer",
    course: "React & Modern Frontend",
    issuedDate: "",
    credentialId: "",
    skills: ["Components", "Hooks", "State Management", "Routing"],
    status: "in-progress",
    progress: 30,
  },
  {
    id: "4",
    name: "TypeScript Expert",
    course: "TypeScript Deep Dive",
    issuedDate: "",
    credentialId: "",
    skills: ["Type System", "Generics", "Decorators", "Advanced Types"],
    status: "locked",
  },
  {
    id: "5",
    name: "Full Stack Developer",
    course: "Complete Full Stack Path",
    issuedDate: "",
    credentialId: "",
    skills: ["Frontend", "Backend", "Database", "Deployment"],
    status: "locked",
  },
]

export default function CertificatesPage() {
  const [activeTab, setActiveTab] = useState<"earned" | "in-progress" | "all">("all")
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  let filteredCertificates = mockCertificates
  if (activeTab === "earned") {
    filteredCertificates = mockCertificates.filter((c) => c.status === "earned")
  } else if (activeTab === "in-progress") {
    filteredCertificates = mockCertificates.filter((c) => c.status === "in-progress")
  }

  const earnedCount = mockCertificates.filter((c) => c.status === "earned").length
  const inProgressCount = mockCertificates.filter((c) => c.status === "in-progress").length

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
            <Award className="w-10 h-10 text-accent" />
            My Certificates
          </h1>
          <p className="text-muted-foreground">Showcase your achievements and skills</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">{earnedCount}</div>
                <div className="text-sm text-muted-foreground">Certificates Earned</div>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">{inProgressCount}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Share2 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">{earnedCount}</div>
                <div className="text-sm text-muted-foreground">Shareable Credentials</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(["all", "earned", "in-progress"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-accent text-accent-foreground"
                  : "bg-card border border-border text-foreground hover:border-accent"
              }`}
            >
              {tab === "all" ? "All Certificates" : tab === "earned" ? "Earned" : "In Progress"}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className={`bg-card border rounded-lg overflow-hidden transition-all ${
                cert.status === "earned"
                  ? "border-accent/50 hover:border-accent"
                  : cert.status === "in-progress"
                    ? "border-yellow-500/30 hover:border-yellow-500/50"
                    : "border-border opacity-60"
              }`}
            >
              {/* Certificate Preview */}
              <div
                className={`h-40 flex items-center justify-center ${
                  cert.status === "earned"
                    ? "bg-gradient-to-br from-accent/20 to-accent/5"
                    : cert.status === "in-progress"
                      ? "bg-gradient-to-br from-yellow-500/20 to-yellow-500/5"
                      : "bg-muted/20"
                }`}
              >
                <div className="text-center">
                  <Award
                    className={`w-16 h-16 mx-auto mb-2 ${
                      cert.status === "earned"
                        ? "text-accent"
                        : cert.status === "in-progress"
                          ? "text-yellow-500"
                          : "text-muted-foreground"
                    }`}
                  />
                  {cert.status === "earned" && (
                    <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                      Verified
                    </span>
                  )}
                  {cert.status === "in-progress" && (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-medium">
                      {cert.progress}% Complete
                    </span>
                  )}
                  {cert.status === "locked" && (
                    <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                      Locked
                    </span>
                  )}
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-1">{cert.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cert.course}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2 py-1 text-muted-foreground text-xs">+{cert.skills.length - 3} more</span>
                  )}
                </div>

                {/* Actions */}
                {cert.status === "earned" ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      Issued {cert.issuedDate}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 gap-1" onClick={() => setSelectedCertificate(cert)}>
                        <Download className="w-4 h-4" /> Download
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 gap-1 bg-transparent">
                        <Share2 className="w-4 h-4" /> Share
                      </Button>
                    </div>
                  </div>
                ) : cert.status === "in-progress" ? (
                  <div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-yellow-500 rounded-full transition-all"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                    <Link href="/dashboard">
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Continue Learning
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link href="/dashboard">
                    <Button size="sm" variant="outline" className="w-full bg-transparent" disabled>
                      Start Course First
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Preview Modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
              {/* Certificate Preview */}
              <div className="p-8 bg-gradient-to-br from-accent/10 to-transparent border-b border-border">
                <div className="text-center">
                  <Terminal className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h2 className="text-sm text-muted-foreground mb-2">Code, Bro! Certifies That</h2>
                  <div className="text-3xl font-bold text-foreground mb-4">Certificate Holder</div>
                  <p className="text-muted-foreground mb-6">Has successfully completed the course</p>
                  <div className="text-2xl font-bold text-accent mb-6">{selectedCertificate.name}</div>
                  <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                    <div>
                      <div className="font-medium text-foreground">Issue Date</div>
                      <div>{selectedCertificate.issuedDate}</div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Credential ID</div>
                      <div>{selectedCertificate.credentialId}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="p-6 border-b border-border">
                <h3 className="font-bold text-foreground mb-3">Skills Earned</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCertificate.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 flex gap-4">
                <Button className="flex-1 gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Share2 className="w-4 h-4" /> Share on LinkedIn
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ExternalLink className="w-4 h-4" /> Verify
                </Button>
                <Button variant="outline" onClick={() => setSelectedCertificate(null)} className="bg-transparent">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
