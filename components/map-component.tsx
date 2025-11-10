"use client"

import { useEffect, useRef } from "react"

interface MapComponentProps {
  pickupLocation?: string
  dropLocation?: string
  pickupCoords?: { lat: number; lng: number }
  dropCoords?: { lat: number; lng: number }
  zoom?: number
}

export default function MapComponent({
  pickupLocation,
  dropLocation,
  pickupCoords = { lat: 12.9716, lng: 77.5946 },
  dropCoords = { lat: 12.9352, lng: 77.6245 },
  zoom = 13,
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    // Dynamically load Leaflet CSS
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      document.head.appendChild(link)
    }

    // Dynamically load Leaflet JS
    if (!window.L) {
      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
      script.onload = () => {
        initializeMap()
      }
      document.body.appendChild(script)
    } else {
      initializeMap()
    }

    function initializeMap() {
      if (!mapContainer.current || map.current) return

      const L = window.L
      map.current = L.map(mapContainer.current).setView([pickupCoords.lat, pickupCoords.lng], zoom)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map.current)

      updateMarkers()
    }

    function updateMarkers() {
      if (!map.current) return

      const L = window.L

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []

      const pickupMarker = L.circleMarker([pickupCoords.lat, pickupCoords.lng], {
        radius: 8,
        fillColor: "#22c55e",
        color: "#16a34a",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.8,
      })
        .addTo(map.current)
        .bindPopup(`<b>Pickup</b><br>${pickupLocation || "Pickup Location"}`)

      markersRef.current.push(pickupMarker)

      const dropMarker = L.circleMarker([dropCoords.lat, dropCoords.lng], {
        radius: 8,
        fillColor: "#ef4444",
        color: "#dc2626",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.8,
      })
        .addTo(map.current)
        .bindPopup(`<b>Drop-off</b><br>${dropLocation || "Drop-off Location"}`)

      markersRef.current.push(dropMarker)

      const L_polyline = L.polyline(
        [
          [pickupCoords.lat, pickupCoords.lng],
          [dropCoords.lat, dropCoords.lng],
        ],
        {
          color: "#3b82f6",
          weight: 3,
          opacity: 0.7,
          dashArray: "5, 5",
        },
      ).addTo(map.current)

      markersRef.current.push(L_polyline)

      const group = new (window.L as any).featureGroup([
        L.circleMarker([pickupCoords.lat, pickupCoords.lng]),
        L.circleMarker([dropCoords.lat, dropCoords.lng]),
      ])

      map.current.fitBounds(group.getBounds().pad(0.1))
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [pickupCoords, dropCoords, pickupLocation, dropLocation, zoom])

  return <div ref={mapContainer} className="w-full h-full" />
}
