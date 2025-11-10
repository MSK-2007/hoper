"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { LogoImage } from "./logo-image"
import { Menu, X } from "lucide-react"
import { geocodeAddress, getLocationSuggestions } from "@/lib/geocoding"
import { LocationSuggestions } from "./location-suggestions"
import { auth } from "@/lib/firebase"
import { saveRecentRide } from "@/lib/firestore-service"
import { onAuthStateChanged } from "firebase/auth"

interface BookingPageProps {
  onNavigate: (
    pickupLocation: string,
    dropLocation: string,
    pickupCoords: { lat: number; lng: number },
    dropCoords: { lat: number; lng: number },
  ) => void
  onNavigateMenu?: (page: string) => void
}

interface LocationSuggestion {
  name: string
  address: string
  lat: number
  lng: number
}

export default function BookingPage({ onNavigate, onNavigateMenu }: BookingPageProps) {
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropLocation, setDropLocation] = useState("")
  const [pickupCoords, setPickupCoords] = useState({ lat: 12.9716, lng: 77.5946 })
  const [dropCoords, setDropCoords] = useState({ lat: 12.9352, lng: 77.6245 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isGeocoding, setIsGeocoding] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const [pickupSuggestions, setPickupSuggestions] = useState<LocationSuggestion[]>([])
  const [pickupSuggestionsOpen, setPickupSuggestionsOpen] = useState(false)
  const [pickupSuggestionsLoading, setPickupSuggestionsLoading] = useState(false)
  const pickupSuggestionsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pickupInputRef = useRef<HTMLInputElement>(null)

  const [dropSuggestions, setDropSuggestions] = useState<LocationSuggestion[]>([])
  const [dropSuggestionsOpen, setDropSuggestionsOpen] = useState(false)
  const [dropSuggestionsLoading, setDropSuggestionsLoading] = useState(false)
  const dropSuggestionsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropInputRef = useRef<HTMLInputElement>(null)

  const geocodingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const recentPlaces = [
    { name: "Home", address: "123 Main Street" },
    { name: "Work", address: "456 Business Ave" },
    { name: "Airport", address: "Bengaluru International" },
  ]

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        onNavigateMenu?.("login")
      }
    })

    return unsubscribe
  }, [onNavigateMenu])

  useEffect(() => {
    if (pickupLocation && pickupLocation.trim().length > 1) {
      setPickupSuggestionsLoading(true)

      if (pickupSuggestionsTimeoutRef.current) {
        clearTimeout(pickupSuggestionsTimeoutRef.current)
      }

      pickupSuggestionsTimeoutRef.current = setTimeout(async () => {
        const suggestions = await getLocationSuggestions(pickupLocation)
        setPickupSuggestions(suggestions)
        setPickupSuggestionsOpen(true)
        setPickupSuggestionsLoading(false)
      }, 500)
    } else {
      setPickupSuggestions([])
      setPickupSuggestionsOpen(false)
    }

    return () => {
      if (pickupSuggestionsTimeoutRef.current) {
        clearTimeout(pickupSuggestionsTimeoutRef.current)
      }
    }
  }, [pickupLocation])

  useEffect(() => {
    if (dropLocation && dropLocation.trim().length > 1) {
      setDropSuggestionsLoading(true)

      if (dropSuggestionsTimeoutRef.current) {
        clearTimeout(dropSuggestionsTimeoutRef.current)
      }

      dropSuggestionsTimeoutRef.current = setTimeout(async () => {
        const suggestions = await getLocationSuggestions(dropLocation)
        setDropSuggestions(suggestions)
        setDropSuggestionsOpen(true)
        setDropSuggestionsLoading(false)
      }, 500)
    } else {
      setDropSuggestions([])
      setDropSuggestionsOpen(false)
    }

    return () => {
      if (dropSuggestionsTimeoutRef.current) {
        clearTimeout(dropSuggestionsTimeoutRef.current)
      }
    }
  }, [dropLocation])

  useEffect(() => {
    if (pickupLocation && pickupLocation.trim().length > 0) {
      setIsGeocoding(true)

      if (geocodingTimeoutRef.current) {
        clearTimeout(geocodingTimeoutRef.current)
      }

      geocodingTimeoutRef.current = setTimeout(async () => {
        const coords = await geocodeAddress(pickupLocation)
        if (coords) {
          setPickupCoords(coords)
        }
        setIsGeocoding(false)
      }, 800)
    }

    return () => {
      if (geocodingTimeoutRef.current) {
        clearTimeout(geocodingTimeoutRef.current)
      }
    }
  }, [pickupLocation])

  useEffect(() => {
    if (dropLocation && dropLocation.trim().length > 0) {
      setIsGeocoding(true)

      if (geocodingTimeoutRef.current) {
        clearTimeout(geocodingTimeoutRef.current)
      }

      geocodingTimeoutRef.current = setTimeout(async () => {
        const coords = await geocodeAddress(dropLocation)
        if (coords) {
          setDropCoords(coords)
        }
        setIsGeocoding(false)
      }, 800)
    }

    return () => {
      if (geocodingTimeoutRef.current) {
        clearTimeout(geocodingTimeoutRef.current)
      }
    }
  }, [dropLocation])

  const handlePickupSuggestionSelect = (suggestion: LocationSuggestion) => {
    setPickupLocation(suggestion.name || suggestion.address)
    setPickupCoords({ lat: suggestion.lat, lng: suggestion.lng })
    setPickupSuggestionsOpen(false)
  }

  const handleDropSuggestionSelect = (suggestion: LocationSuggestion) => {
    setDropLocation(suggestion.name || suggestion.address)
    setDropCoords({ lat: suggestion.lat, lng: suggestion.lng })
    setDropSuggestionsOpen(false)
  }

  const handleFindRide = (e: React.FormEvent) => {
    e.preventDefault()
    if (pickupLocation && dropLocation && !isGeocoding) {
      if (userId) {
        saveRecentRide(userId, {
          pickupLocation,
          dropLocation,
          pickupCoords,
          dropCoords,
          rideType: "",
          price: 0,
          distance: 0,
        }).catch(console.error)
      }
      onNavigate(pickupLocation, dropLocation, pickupCoords, dropCoords)
    } else if (isGeocoding) {
      alert("Please wait while we locate your addresses...")
    }
  }

  const handleMenuClick = (page: string) => {
    setMobileMenuOpen(false)
    if (onNavigateMenu) {
      onNavigateMenu(page)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("hopperRememberedEmail")
    handleMenuClick("login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <LogoImage />
            </div>
            <h1 className="text-2xl font-black">HOPER</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-semibold">
            <button
              onClick={() => handleMenuClick("booking")}
              className="hover:opacity-80 transition-opacity hover:underline underline-offset-4"
            >
              Home
            </button>
            <button
              onClick={() => handleMenuClick("booking")}
              className="hover:opacity-80 transition-opacity hover:underline underline-offset-4"
            >
              Ride
            </button>
            <button
              onClick={() => handleMenuClick("saved-places")}
              className="hover:opacity-80 transition-opacity hover:underline underline-offset-4"
            >
              Saved Places
            </button>
            <button
              onClick={() => handleMenuClick("help")}
              className="hover:opacity-80 transition-opacity hover:underline underline-offset-4"
            >
              Help
            </button>
            <button
              onClick={() => handleMenuClick("services")}
              className="hover:opacity-80 transition-opacity hover:underline underline-offset-4"
            >
              Services
            </button>
            <button
              onClick={() => handleMenuClick("about")}
              className="hover:opacity-80 transition-opacity hover:underline underline-offset-4"
            >
              About Us
            </button>
            <button
              onClick={handleLogout}
              className="hover:opacity-80 transition-opacity hover:underline underline-offset-4"
            >
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
          <nav className="md:hidden bg-orange-600 px-4 py-4 space-y-3 text-sm font-semibold">
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
              onClick={() => handleMenuClick("saved-places")}
              className="block w-full text-left hover:opacity-80 transition-opacity py-2"
            >
              Saved Places
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
              onClick={() => handleMenuClick("about")}
              className="block w-full text-left hover:opacity-80 transition-opacity py-2"
            >
              About Us
            </button>
            <button onClick={handleLogout} className="block w-full text-left hover:opacity-80 transition-opacity py-2">
              Logout
            </button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black text-foreground mb-2 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
            BOOK A RIDE
          </h2>
          <p className="text-muted-foreground font-medium">Get where you're going with ease</p>
        </div>

        {/* Recently Visited Places */}
        <div className="mb-8">
          <h3 className="text-sm font-black text-foreground mb-4 uppercase tracking-wider">📍 Recently Visited</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recentPlaces.map((place, idx) => (
              <button
                key={idx}
                onClick={() => setPickupLocation(place.name)}
                className="p-4 border-2 border-border rounded-2xl hover:border-primary hover:bg-orange-50 transition-all group"
              >
                <p className="font-black text-foreground group-hover:text-primary transition-colors">{place.name}</p>
                <p className="text-sm text-muted-foreground">{place.address}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleFindRide} className="space-y-4">
          <div className="relative">
            <input
              ref={pickupInputRef}
              type="text"
              placeholder="📍 Enter Pickup Location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              onFocus={() => pickupLocation && setPickupSuggestionsOpen(true)}
              className="w-full px-6 py-4 border-2 border-border rounded-3xl bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-medium hover:border-primary"
              required
            />
            {pickupLocation && (
              <button
                type="button"
                onClick={() => {
                  setPickupLocation("")
                  setPickupSuggestions([])
                  setPickupSuggestionsOpen(false)
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            )}
            <LocationSuggestions
              suggestions={pickupSuggestions}
              isOpen={pickupSuggestionsOpen}
              isLoading={pickupSuggestionsLoading}
              onSelectSuggestion={handlePickupSuggestionSelect}
              onClose={() => setPickupSuggestionsOpen(false)}
            />
          </div>

          <div className="relative">
            <input
              ref={dropInputRef}
              type="text"
              placeholder="📍 Enter Drop Location"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              onFocus={() => dropLocation && setDropSuggestionsOpen(true)}
              className="w-full px-6 py-4 border-2 border-border rounded-3xl bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all font-medium hover:border-primary"
              required
            />
            {dropLocation && (
              <button
                type="button"
                onClick={() => {
                  setDropLocation("")
                  setDropSuggestions([])
                  setDropSuggestionsOpen(false)
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            )}
            <LocationSuggestions
              suggestions={dropSuggestions}
              isOpen={dropSuggestionsOpen}
              isLoading={dropSuggestionsLoading}
              onSelectSuggestion={handleDropSuggestionSelect}
              onClose={() => setDropSuggestionsOpen(false)}
            />
          </div>

          {/* Find a Ride Button */}
          <button
            type="submit"
            disabled={isGeocoding}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-3xl font-black text-lg hover:shadow-lg transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700"
          >
            {isGeocoding ? "Locating addresses..." : "🚗 Find a Ride"}
          </button>
        </form>
      </main>
    </div>
  )
}
