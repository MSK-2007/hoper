"use client"

import { useState, useEffect } from "react"
import { LogoImage } from "./logo-image"
import { Menu, Plus, Trash2 } from "lucide-react"
import { auth } from "@/lib/firebase"
import { getFavoriteLocations, updateFavoriteLocation } from "@/lib/firestore-service"
import { onAuthStateChanged } from "firebase/auth"
import { geocodeAddress } from "@/lib/geocoding"

interface SavedPlacesPageProps {
  onNavigate: (page: string) => void
  onSelectPlace?: (name: string, lat: number, lng: number) => void
}

interface FavoriteLocation {
  id: string
  name: string
  address: string
  lat: number
  lng: number
}

export default function SavedPlacesPage({ onNavigate, onSelectPlace }: SavedPlacesPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [places, setPlaces] = useState<FavoriteLocation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState({ name: "", address: "" })
  const [newPlaceName, setNewPlaceName] = useState("")
  const [newPlaceAddress, setNewPlaceAddress] = useState("")
  const [isAddingPlace, setIsAddingPlace] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid)
        const savedPlaces = await getFavoriteLocations(user.uid)
        setPlaces(savedPlaces)
      } else {
        onNavigate("login")
      }
      setIsLoading(false)
    })

    return unsubscribe
  }, [onNavigate])

  const handleMenuClick = (page: string) => {
    setMobileMenuOpen(false)
    onNavigate(page)
  }

  const handleEditStart = (place: FavoriteLocation) => {
    setEditingId(place.id)
    setEditValues({ name: place.name, address: place.address })
  }

  const handleEditSave = async (placeId: string) => {
    if (userId && editValues.name && editValues.address) {
      const coords = await geocodeAddress(editValues.address)
      if (coords) {
        await updateFavoriteLocation(userId, placeId, {
          name: editValues.name,
          address: editValues.address,
          lat: coords.lat,
          lng: coords.lng,
        })
        const updatedPlaces = places.map((p) =>
          p.id === placeId
            ? { ...p, name: editValues.name, address: editValues.address, lat: coords.lat, lng: coords.lng }
            : p,
        )
        setPlaces(updatedPlaces)
        setEditingId(null)
      }
    }
  }

  const handleAddPlace = async () => {
    if (newPlaceName && newPlaceAddress && userId) {
      setIsAddingPlace(true)
      const coords = await geocodeAddress(newPlaceAddress)
      if (coords) {
        const newPlace: FavoriteLocation = {
          id: `custom-${Date.now()}`,
          name: newPlaceName,
          address: newPlaceAddress,
          lat: coords.lat,
          lng: coords.lng,
        }
        // Note: In production, you'd save this to Firestore
        setPlaces([...places, newPlace])
        setNewPlaceName("")
        setNewPlaceAddress("")
      }
      setIsAddingPlace(false)
    }
  }

  const handleDeletePlace = async (placeId: string) => {
    if (userId && placeId.startsWith("custom-")) {
      setPlaces(places.filter((p) => p.id !== placeId))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading saved places...</p>
        </div>
      </div>
    )
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
            <button onClick={() => handleMenuClick("booking")} className="hover:opacity-80 transition-opacity">
              Home
            </button>
            <button onClick={() => handleMenuClick("booking")} className="hover:opacity-80 transition-opacity">
              Ride
            </button>
            <button onClick={() => handleMenuClick("saved-places")} className="hover:opacity-80 transition-opacity">
              Saved Places
            </button>
            <button onClick={() => handleMenuClick("help")} className="hover:opacity-80 transition-opacity">
              Help
            </button>
            <button onClick={() => handleMenuClick("services")} className="hover:opacity-80 transition-opacity">
              Services
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
          <nav className="md:hidden bg-orange-600 px-4 py-4 space-y-3 text-sm font-semibold">
            <button onClick={() => handleMenuClick("booking")} className="block w-full text-left hover:opacity-80 py-2">
              Home
            </button>
            <button onClick={() => handleMenuClick("booking")} className="block w-full text-left hover:opacity-80 py-2">
              Ride
            </button>
            <button
              onClick={() => handleMenuClick("saved-places")}
              className="block w-full text-left hover:opacity-80 py-2"
            >
              Saved Places
            </button>
            <button onClick={() => handleMenuClick("help")} className="block w-full text-left hover:opacity-80 py-2">
              Help
            </button>
            <button
              onClick={() => handleMenuClick("services")}
              className="block w-full text-left hover:opacity-80 py-2"
            >
              Services
            </button>
            <button onClick={() => handleMenuClick("login")} className="block w-full text-left hover:opacity-80 py-2">
              Logout
            </button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-black text-foreground mb-2 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
          Saved Places
        </h2>
        <p className="text-muted-foreground mb-8">Manage your favorite locations for quick access</p>

        {/* Add New Place */}
        <div className="bg-white border-2 border-border rounded-3xl p-6 mb-8">
          <h3 className="text-xl font-black text-foreground mb-4">Add New Place</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Place name (e.g., Coffee Shop, Gym)"
              value={newPlaceName}
              onChange={(e) => setNewPlaceName(e.target.value)}
              className="w-full px-6 py-3 border-2 border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary font-medium"
            />
            <input
              type="text"
              placeholder="Full address"
              value={newPlaceAddress}
              onChange={(e) => setNewPlaceAddress(e.target.value)}
              className="w-full px-6 py-3 border-2 border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary font-medium"
            />
            <button
              onClick={handleAddPlace}
              disabled={isAddingPlace || !newPlaceName || !newPlaceAddress}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-2xl font-black hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Plus size={20} className="inline mr-2" />
              Add Place
            </button>
          </div>
        </div>

        {/* Saved Places List */}
        <div className="space-y-4">
          {places.map((place) => (
            <div
              key={place.id}
              className="bg-white border-2 border-border rounded-3xl p-6 hover:shadow-lg transition-shadow"
            >
              {editingId === place.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editValues.name}
                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                    className="w-full px-6 py-3 border-2 border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                  <input
                    type="text"
                    value={editValues.address}
                    onChange={(e) => setEditValues({ ...editValues, address: e.target.value })}
                    className="w-full px-6 py-3 border-2 border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditSave(place.id)}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-xl font-black hover:shadow-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 bg-gray-200 text-foreground py-2 rounded-xl font-black hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-foreground">{place.name}</h3>
                    <p className="text-muted-foreground">{place.address}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      📍 {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditStart(place)}
                      className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl font-semibold hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    {place.id.startsWith("custom-") && (
                      <button
                        onClick={() => handleDeletePlace(place.id)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    {onSelectPlace && (
                      <button
                        onClick={() => onSelectPlace(place.name, place.lat, place.lng)}
                        className="px-4 py-2 bg-orange-100 text-orange-600 rounded-xl font-semibold hover:bg-orange-200"
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
