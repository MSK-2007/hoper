"use client"

import { LogoImage } from "./logo-image"
import { Menu } from "lucide-react"
import { useState } from "react"

interface RewardsPageProps {
  onNavigate: (page: string) => void
}

export default function RewardsPage({ onNavigate }: RewardsPageProps) {
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
        <h2 className="text-4xl font-bold text-foreground mb-8 text-center">HOPER Rewards</h2>

        {/* Rewards Info */}
        <div className="bg-muted rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Earn Points on Every Ride</h3>
          <p className="text-muted-foreground mb-6">
            Every ride you take earns you points that can be redeemed for discounts, free rides, and exclusive perks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary mb-2">1000</p>
              <p className="text-muted-foreground">Points Earned</p>
            </div>
            <div className="bg-background p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary mb-2">$50</p>
              <p className="text-muted-foreground">Available Balance</p>
            </div>
            <div className="bg-background p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary mb-2">5</p>
              <p className="text-muted-foreground">Free Rides</p>
            </div>
          </div>
        </div>

        {/* Rewards Tiers */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground mb-6">Rewards Tiers</h3>
          <div className="border border-border rounded-lg p-6">
            <h4 className="text-lg font-bold text-foreground mb-2">Silver</h4>
            <p className="text-muted-foreground">Earn 1 point per dollar spent</p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h4 className="text-lg font-bold text-foreground mb-2">Gold</h4>
            <p className="text-muted-foreground">Earn 1.5 points per dollar spent + exclusive perks</p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h4 className="text-lg font-bold text-foreground mb-2">Platinum</h4>
            <p className="text-muted-foreground">Earn 2 points per dollar spent + VIP support</p>
          </div>
        </div>
      </main>
    </div>
  )
}
