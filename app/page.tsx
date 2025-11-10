"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import SignupPage from "@/components/signup-page"
import ForgotPasswordPage from "@/components/forgot-password-page"
import BookingPage from "@/components/booking-page"
import RideSelectionPage from "@/components/ride-selection-page"
import SearchingPage from "@/components/searching-page"
import HelpPage from "@/components/help-page"
import ServicesPage from "@/components/services-page"
import AboutPage from "@/components/about-page"
import RewardsPage from "@/components/rewards-page"
import SavedPlacesPage from "@/components/saved-places-page"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<
    | "login"
    | "signup"
    | "forgot-password"
    | "booking"
    | "selection"
    | "searching"
    | "help"
    | "services"
    | "about"
    | "rewards"
    | "saved-places" // Added saved-places to page types
  >("login")

  const [locationData, setLocationData] = useState({
    pickupLocation: "",
    dropLocation: "",
    pickupCoords: { lat: 12.9716, lng: 77.5946 },
    dropCoords: { lat: 12.9352, lng: 77.6245 },
  })

  const [selectedRide, setSelectedRide] = useState<string>("")

  const handleNavigate = (page: string) => {
    setCurrentPage(
      page as
        | "login"
        | "signup"
        | "forgot-password"
        | "booking"
        | "selection"
        | "searching"
        | "help"
        | "services"
        | "about"
        | "rewards"
        | "saved-places", // Updated to include saved-places
    )
  }

  const handleBookingNavigate = (
    pickupLocation: string,
    dropLocation: string,
    pickupCoords: { lat: number; lng: number },
    dropCoords: { lat: number; lng: number },
  ) => {
    setLocationData({
      pickupLocation,
      dropLocation,
      pickupCoords,
      dropCoords,
    })
    setCurrentPage("selection")
  }

  const handleRideSelection = (rideType: string) => {
    setSelectedRide(rideType)
    setCurrentPage("searching")
  }

  return (
    <main>
      {currentPage === "login" && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === "signup" && <SignupPage onNavigate={handleNavigate} />}
      {currentPage === "forgot-password" && <ForgotPasswordPage onNavigate={handleNavigate} />}
      {currentPage === "booking" && <BookingPage onNavigate={handleBookingNavigate} onNavigateMenu={handleNavigate} />}
      {currentPage === "selection" && (
        <RideSelectionPage
          onNavigate={handleRideSelection}
          pickupLocation={locationData.pickupLocation}
          dropLocation={locationData.dropLocation}
          pickupCoords={locationData.pickupCoords}
          dropCoords={locationData.dropCoords}
        />
      )}
      {currentPage === "searching" && (
        <SearchingPage
          onNavigate={() => handleNavigate("booking")}
          pickupCoords={locationData.pickupCoords}
          dropCoords={locationData.dropCoords}
          pickupLocation={locationData.pickupLocation}
          dropLocation={locationData.dropLocation}
          selectedRide={selectedRide}
        />
      )}
      {currentPage === "help" && <HelpPage onNavigate={handleNavigate} />}
      {currentPage === "services" && <ServicesPage onNavigate={handleNavigate} />}
      {currentPage === "about" && <AboutPage onNavigate={handleNavigate} />}
      {currentPage === "rewards" && <RewardsPage onNavigate={handleNavigate} />}
      {currentPage === "saved-places" && <SavedPlacesPage onNavigate={handleNavigate} />} // Added saved places page
    </main>
  )
}
