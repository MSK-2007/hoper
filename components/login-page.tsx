"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { LogoImage } from "./logo-image"
import { Eye, EyeOff } from "lucide-react"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { createOrUpdateUserProfile } from "@/lib/firestore-service"
import { motion } from "framer-motion"

interface LoginPageProps {
  onNavigate: (page: string) => void
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const savedEmail = localStorage.getItem("hopperRememberedEmail")
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      if (rememberMe) {
        localStorage.setItem("hopperRememberedEmail", email)
      } else {
        localStorage.removeItem("hopperRememberedEmail")
      }

      await createOrUpdateUserProfile(user.uid, user.email || "", user.displayName || "")
      onNavigate("booking")
    } catch (err: any) {
      setError(err.message || "Sign in failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setIsLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const user = userCredential.user
      await createOrUpdateUserProfile(user.uid, user.email || "", user.displayName || "")
      onNavigate("booking")
    } catch (err: any) {
      setError(err.message || "Google sign in failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 w-56 h-56 mx-auto drop-shadow-lg"
        >
          <LogoImage />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl font-black text-center mb-2 text-foreground tracking-tight bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent"
        >
          HOPER
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-muted-foreground mb-8 font-medium"
        >
          Ride with confidence
        </motion.p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-2xl text-sm border border-red-200 font-medium">
            {error}
          </div>
        )}

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSignIn}
          className="space-y-4 mb-6"
        >
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3 border-2 border-border rounded-2xl bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3 border-2 border-border rounded-2xl bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all pr-12"
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-5 h-5 rounded cursor-pointer accent-orange-500"
            />
            <label htmlFor="remember" className="text-sm text-foreground font-medium cursor-pointer">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-2xl font-black hover:shadow-lg transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </motion.form>

        <div className="flex flex-col gap-3 mb-8 text-center text-sm">
          <button
            onClick={() => onNavigate("signup")}
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Don't have an account? Sign Up
          </button>
          <button
            onClick={() => onNavigate("forgot-password")}
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-muted-foreground text-sm font-medium">OR</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-white border-2 border-border text-foreground py-3 rounded-2xl font-semibold hover:bg-muted transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign in with Google
        </button>
      </div>
    </motion.div>
  )
}
