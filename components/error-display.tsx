"use client"

import { AlertCircle, X } from "lucide-react"
import { useState } from "react"

interface ErrorDisplayProps {
  error: string | null
  onDismiss?: () => void
  variant?: "destructive" | "warning"
}

export function ErrorDisplay({ error, onDismiss, variant = "destructive" }: ErrorDisplayProps) {
  const [isVisible, setIsVisible] = useState(!!error)

  if (!isVisible || !error) return null

  const bgColor = variant === "destructive" ? "bg-destructive/10" : "bg-yellow-500/10"
  const borderColor = variant === "destructive" ? "border-destructive/50" : "border-yellow-500/50"
  const textColor = variant === "destructive" ? "text-destructive" : "text-yellow-600"

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4 flex items-start gap-3 mb-4`}>
      <AlertCircle className={`w-5 h-5 ${textColor} mt-0.5 flex-shrink-0`} />
      <div className="flex-1">
        <p className={`text-sm font-medium ${textColor}`}>{error}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          onDismiss?.()
        }}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
