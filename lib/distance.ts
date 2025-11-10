"use client"

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Calculate ETA based on distance (assuming average speed of 30 km/h in city)
export function calculateETA(distance: number): string {
  const timeInMinutes = (distance / 30) * 60
  return `${Math.max(1, Math.round(timeInMinutes))} mins away`
}

// Calculate price based on distance and rate per km
export function calculatePrice(distance: number, ratePerKm: number): number {
  return Math.round(distance * ratePerKm * 100) / 100
}
