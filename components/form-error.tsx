"use client"

import { AlertCircle } from "lucide-react"

interface FormErrorProps {
  message: string | string[] | null
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null

  const messages = Array.isArray(message) ? message : [message]

  return (
    <div className="bg-destructive/10 border border-destructive/50 rounded-md p-3 flex gap-2">
      <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
      <div className="text-sm text-destructive">
        {messages.length === 1 ? (
          messages[0]
        ) : (
          <ul className="list-disc list-inside">
            {messages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
