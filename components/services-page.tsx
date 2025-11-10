"use client"

import { LogoImage } from "./logo-image"
import { Menu } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

interface ServicesPageProps {
  onNavigate: (page: string) => void
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMenuClick = (page: string) => {
    setMobileMenuOpen(false)
    onNavigate(page)
  }

  const services = [
    {
      title: "Standard Ride",
      description: "Affordable and reliable rides for your daily commute",
      price: "₹249 onwards",
    },
    {
      title: "Premium Ride",
      description: "Luxury vehicles with professional drivers",
      price: "₹499 onwards",
    },
    {
      title: "Shared Ride",
      description: "Share your ride and save up to 50%",
      price: "₹169 onwards",
    },
    {
      title: "Scheduled Ride",
      description: "Book your ride in advance for peace of mind",
      price: "₹329 onwards",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b-2 border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <LogoImage />
            </div>
            <h1 className="text-2xl font-black text-foreground">HOPER</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-bold">
            <button
              onClick={() => handleMenuClick("booking")}
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleMenuClick("booking")}
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Ride
            </button>
            <button
              onClick={() => handleMenuClick("saved-places")}
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Saved Places
            </button>
            <button
              onClick={() => handleMenuClick("help")}
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Help
            </button>
            <button
              onClick={() => handleMenuClick("services")}
              className="text-foreground hover:text-muted-foreground transition-colors font-black"
            >
              Services
            </button>
            <button
              onClick={() => handleMenuClick("rewards")}
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Rewards
            </button>
            <button
              onClick={() => handleMenuClick("about")}
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => handleMenuClick("login")}
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Logout
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground">
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-background border-t-2 border-border px-4 py-4 space-y-3 text-sm font-bold">
            <button
              onClick={() => handleMenuClick("booking")}
              className="block w-full text-left text-foreground hover:text-muted-foreground py-2"
            >
              Home
            </button>
            <button
              onClick={() => handleMenuClick("booking")}
              className="block w-full text-left text-foreground hover:text-muted-foreground py-2"
            >
              Ride
            </button>
            <button
              onClick={() => handleMenuClick("saved-places")}
              className="block w-full text-left text-foreground hover:text-muted-foreground py-2"
            >
              Saved Places
            </button>
            <button
              onClick={() => handleMenuClick("help")}
              className="block w-full text-left text-foreground hover:text-muted-foreground py-2"
            >
              Help
            </button>
            <button
              onClick={() => handleMenuClick("services")}
              className="block w-full text-left text-foreground hover:text-muted-foreground py-2 font-black"
            >
              Services
            </button>
            <button
              onClick={() => handleMenuClick("rewards")}
              className="block w-full text-left text-foreground hover:text-muted-foreground py-2"
            >
              Rewards
            </button>
            <button
              onClick={() => handleMenuClick("about")}
              className="block w-full text-left text-foreground hover:text-muted-foreground py-2"
            >
              About Us
            </button>
            <button
              onClick={() => handleMenuClick("login")}
              className="block w-full text-left text-foreground hover:text-muted-foreground py-2"
            >
              Logout
            </button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-5xl font-black text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground font-semibold max-w-2xl mx-auto">
            Choose the perfect ride option for your journey
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border-2 border-border rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:border-foreground/30"
            >
              <h3 className="text-2xl font-black text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground font-semibold mb-6 leading-relaxed">{service.description}</p>
              <p className="text-3xl font-black text-foreground mb-6">{service.price}</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-white py-3 rounded-2xl font-black text-lg hover:bg-foreground shadow-md transition-all"
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
