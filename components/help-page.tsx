"use client"

import { LogoImage } from "./logo-image"
import { Menu } from "lucide-react"
import { useState } from "react"

interface HelpPageProps {
  onNavigate: (page: string) => void
}

export default function HelpPage({ onNavigate }: HelpPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMenuClick = (page: string) => {
    setMobileMenuOpen(false)
    onNavigate(page)
  }

  const faqs = [
    {
      question: "How do I book a ride?",
      answer: "Enter your pickup and drop locations, select your preferred ride type, and confirm your booking.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit cards, debit cards, digital wallets, and cash payments.",
    },
    {
      question: "How can I cancel my ride?",
      answer: "You can cancel your ride from the app up to 2 minutes after booking without any charges.",
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, we use industry-standard encryption to protect all your personal and payment information.",
    },
  ]

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
        <h2 className="text-4xl font-bold text-foreground mb-8 text-center">Help & Support</h2>

        {/* FAQs */}
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 p-8 bg-muted rounded-lg text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Still need help?</h3>
          <p className="text-muted-foreground mb-6">
            Contact our support team at support@hoper.com or call 1-800-HOPER-1
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Contact Support
          </button>
        </div>
      </main>
    </div>
  )
}
