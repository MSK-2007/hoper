"use client"

import type React from "react"
import { useState } from "react"
import { LogoImage } from "./logo-image"
import { ArrowLeft } from "lucide-react"

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void
}

export default function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-12 w-24 h-24 mx-auto">
          <LogoImage />
        </div>

        {/* Logo Text */}
        <h1 className="text-4xl font-bold text-center mb-2 text-foreground tracking-tight">HOPER</h1>
        <p className="text-center text-muted-foreground mb-8">Reset your password</p>

        {!submitted ? (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <p className="text-sm text-muted-foreground mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-6"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="mb-4 text-4xl">✓</div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">Check your email</h2>
            <p className="text-muted-foreground mb-6">
              We've sent a password reset link to <span className="font-semibold text-foreground">{email}</span>
            </p>
          </div>
        )}

        {/* Back to Login */}
        <button
          onClick={() => onNavigate("login")}
          className="flex items-center justify-center gap-2 text-primary hover:underline text-sm w-full py-2"
        >
          <ArrowLeft size={16} />
          Back to Sign In
        </button>
      </div>
    </div>
  )
}
