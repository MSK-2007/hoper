"use client"

import { LogoImage } from "./logo-image"
import { Menu } from "lucide-react"
import { useState } from "react"

interface AboutPageProps {
  onNavigate: (page: string) => void
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMenuClick = (page: string) => {
    setMobileMenuOpen(false)
    onNavigate(page)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <LogoImage />
            </div>
            <h1 className="text-2xl font-bold">HOPER</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <button onClick={() => handleMenuClick("booking")} className="hover:opacity-80 transition-opacity">
              Home
            </button>
            <button onClick={() => handleMenuClick("booking")} className="hover:opacity-80 transition-opacity">
              Ride
            </button>
            <button onClick={() => handleMenuClick("help")} className="hover:opacity-80 transition-opacity">
              Help
            </button>
            <button onClick={() => handleMenuClick("services")} className="hover:opacity-80 transition-opacity">
              Services
            </button>
            <button onClick={() => handleMenuClick("rewards")} className="hover:opacity-80 transition-opacity">
              Rewards
            </button>
            <button onClick={() => handleMenuClick("about")} className="hover:opacity-80 transition-opacity">
              About Us
            </button>
            <button onClick={() => handleMenuClick("login")} className="hover:opacity-80 transition-opacity">
              Logout
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-primary/95 px-4 py-4 space-y-3 text-sm font-medium">
            <button
              onClick={() => handleMenuClick("booking")}
              className="block w-full text-left hover:opacity-80 transition-opacity py-2"
            >
              Home
            </button>
            <button
              onClick={() => handleMenuClick("booking")}
              className="block w-full text-left hover:opacity-80 transition-opacity py-2"
            >
              Ride
            </button>
            <button
              onClick={() => handleMenuClick("help")}
              className="block w-full text-left hover:opacity-80 transition-opacity py-2"
            >
              Help
            </button>
            <button
              onClick={() => handleMenuClick("services")}
              className="block w-full text-left hover:opacity-80 transition-opacity py-2"
            >
              Services
            </button>
            <button
              onClick={() => handleMenuClick("rewards")}
              className="block w-full text-left hover:opacity-80 transition-opacity py-2"
            >
              Rewards
            </button>
            <button
              onClick={() => handleMenuClick("about")}
              className="block w-full text-left hover:opacity-80 transition-opacity py-2"
            >
              About Us
            </button>
            <button
              onClick={() => handleMenuClick("login")}
              className="block w-full text-left hover:opacity-80 transition-opacity py-2"
            >
              Logout
            </button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-foreground mb-8 text-center">About HOPER</h2>

        {/* About Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground text-lg">
              At HOPER, we're committed to providing safe, affordable, and reliable ride-sharing services to everyone.
              We believe in making transportation accessible and convenient for all.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Why Choose HOPER?</h3>
            <ul className="text-muted-foreground text-lg space-y-3">
              <li>✓ Transparent pricing with no hidden charges</li>
              <li>✓ Professional and vetted drivers</li>
              <li>✓ 24/7 customer support</li>
              <li>✓ Safe and secure rides</li>
              <li>✓ Multiple payment options</li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Values</h3>
            <p className="text-muted-foreground text-lg">
              Safety, reliability, and customer satisfaction are at the core of everything we do. We continuously
              innovate to provide the best ride-sharing experience.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
