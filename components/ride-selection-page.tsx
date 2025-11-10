"use client"

import { useState } from "react"
import MapComponent from "./map-component"
import { calculateDistance, calculateETA, calculatePrice } from "@/lib/distance"
import { motion } from "framer-motion"

interface RideSelectionPageProps {
  onNavigate: (rideType: string) => void
  pickupLocation?: string
  dropLocation?: string
  pickupCoords?: { lat: number; lng: number }
  dropCoords?: { lat: number; lng: number }
}

export default function RideSelectionPage({
  onNavigate,
  pickupLocation = "Pickup Location",
  dropLocation = "Drop-off Location",
  pickupCoords = { lat: 12.9716, lng: 77.5946 },
  dropCoords = { lat: 12.9352, lng: 77.6245 },
}: RideSelectionPageProps) {
  const distance = calculateDistance(
  pickupCoords.lat,
  pickupCoords.lng,
  dropCoords.lat,
  dropCoords.lng
)

const etaString = calculateETA(distance)
const eta = Math.round(parseFloat(etaString.split(" ")[0]))

  const rideOptions = [
    {
      id: "bike",
      type: "Bike",
      displayName: "Bike",
      icon: "🏍️",
      capacity: 1,
      eta: 2,
      price: calculatePrice(distance, 10),
      pricePerKm: 10,
      description: "Quick & economical",
      discount: null,
      tag: null,
    },
    {
      id: "auto",
      type: "Auto",
      displayName: "Auto",
      icon: "🚗",
      capacity: 3,
      eta: 1,
      price: calculatePrice(distance, 20),
      pricePerKm: 20,
      description: "Comfort & affordability",
      discount: null,
      tag: null,
    },
    {
      id: "cab",
      type: "Cab",
      displayName: "Cab",
      icon: "🚙",
      capacity: 4,
      eta: 3,
      price: calculatePrice(distance, 25),
      pricePerKm: 25,
      description: "Comfortable ride",
      discount: null,
      tag: null,
    },
    {
      id: "ac-cab",
      type: "AC Cab",
      displayName: "AC Cab",
      icon: "🚕",
      capacity: 4,
      eta: 4,
      price: calculatePrice(distance, 35),
      pricePerKm: 35,
      description: "Premium comfort with AC",
      discount: null,
      tag: null,
    },
  ]

  const [selectedRide, setSelectedRide] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("Cash")

  const handleBookRide = () => {
    if (selectedRide) {
      onNavigate(selectedRide)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen flex overflow-hidden bg-gradient-to-br from-gray-50 to-white"
    >
      {/* Left Panel - Ride Selection */}
      <div className="w-full md:w-1/2 h-screen flex flex-col bg-white shadow-2xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-6 pt-8 pb-6 border-b-2 border-border"
        >
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text mb-2">
            Choose a ride
          </h1>
          <p className="text-base text-muted-foreground font-semibold">Find the perfect option for you</p>
        </motion.div>

        {/* Ride Options - Scrollable */}
        <div className="flex-1 px-6 overflow-y-auto space-y-3 py-6">
          {rideOptions.map((ride, idx) => (
            <motion.div
              key={ride.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedRide(ride.id)}
              className={`rounded-3xl border-2 cursor-pointer transition-all duration-200 p-5 hover:shadow-lg ${
                selectedRide === ride.id
                  ? "border-orange-500 bg-gradient-to-r from-orange-50 to-transparent shadow-md"
                  : "border-border bg-white hover:border-orange-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0 pt-1">{ride.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl md:text-2xl font-black text-foreground">{ride.displayName}</h3>
                    <span className="text-sm text-muted-foreground font-bold">👤 {ride.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2 font-semibold">
                    <span>⏱️ {ride.eta} min</span>
                    <span>•</span>
                    <span>📍 {ride.eta} ETA</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium italic">{ride.description}</p>
                </div>
                <div className="flex-shrink-0 text-right pt-1">
                  <p className="text-2xl md:text-3xl font-black text-orange-600">₹{Math.round(ride.price)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="sticky bottom-0 px-6 py-6 border-t-2 border-border bg-white space-y-3 shadow-2xl"
        >
          {/* Payment Method */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-50 border-2 border-border hover:border-primary hover:bg-orange-50 transition">
            <span className="text-2xl">💳</span>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="flex-1 bg-transparent text-foreground font-semibold outline-none cursor-pointer text-base"
            >
              <option className="text-foreground">💵 Cash</option>
              <option className="text-foreground">💳 Card</option>
              <option className="text-foreground">📱 Digital Wallet</option>
            </select>
          </div>

          {/* Book Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBookRide}
            disabled={!selectedRide}
            className={`w-full py-4 rounded-2xl font-black text-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
              selectedRide
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {selectedRide
              ? `🚀 Request ${rideOptions.find((r) => r.id === selectedRide)?.displayName}`
              : "SELECT A RIDE"}
          </motion.button>
        </motion.div>
      </div>

      {/* Right Panel - Map (Hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 relative">
        <div className="w-full h-full relative">
          <MapComponent
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            pickupCoords={pickupCoords}
            dropCoords={dropCoords}
            zoom={13}
          />
          {/* Route Info Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-6 right-6 bg-white rounded-3xl shadow-2xl p-6 max-w-sm border-2 border-border"
          >
            <div className="space-y-5">
              <div>
                <p className="text-xs font-black text-muted-foreground mb-2 uppercase tracking-widest">📍 To</p>
                <p className="text-xl font-black text-foreground flex items-center gap-2 break-words">{dropLocation}</p>
              </div>
              <div className="h-px bg-border"></div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-black text-muted-foreground mb-2 uppercase tracking-widest">📍 From</p>
                  <p className="text-lg font-black text-foreground break-words">{pickupLocation}</p>
                </div>
                <div className="flex items-baseline gap-2 bg-orange-50 p-3 rounded-2xl border-2 border-orange-200">
                  <p className="text-4xl font-black text-orange-600">{eta}</p>
                  <p className="text-sm text-muted-foreground font-black">min</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
