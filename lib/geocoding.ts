export async function geocodeAddress(
  address: string,
  city = "Bengaluru, India",
): Promise<{ lat: number; lng: number } | null> {
  if (!address || address.trim().length === 0) {
    return null
  }

  try {
    // Try multiple search strategies
    const searchStrategies = [
      // Strategy 1: Full address with city context
      `${address}, ${city}`,
      // Strategy 2: Just the address in Bengaluru area
      `${address}, Bengaluru`,
      // Strategy 3: Address with broader search box for Bengaluru
      address,
    ]

    for (const query of searchStrategies) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&viewbox=77.4,12.8,77.8,13.1&bounded=1`,
        {
          headers: {
            "User-Agent": "HOPER-RideShare/1.0",
          },
        },
      )

      if (!response.ok) {
        continue
      }

      const data = await response.json()
      console.log("[v0] Geocoding result for", address, "with query", query, ":", data)

      if (data && data.length > 0) {
        // Filter for more relevant results (prioritize amenities, buildings, places over generic areas)
        const relevantResult =
          data.find((item: any) => item.type !== "administrative" || item.place_rank > 20) || data[0]

        const result = {
          lat: Number.parseFloat(relevantResult.lat),
          lng: Number.parseFloat(relevantResult.lon),
        }
        console.log("[v0] Successfully geocoded:", address, "->", result)
        return result
      }
    }

    console.log("[v0] Could not geocode address with any strategy:", address)
    return null
  } catch (error) {
    console.error("[v0] Geocoding error:", error)
    return null
  }
}

export async function getLocationSuggestions(query: string): Promise<
  Array<{
    name: string
    address: string
    lat: number
    lng: number
  }>
> {
  if (!query || query.trim().length < 2) {
    return []
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}, Bengaluru, India&limit=10&viewbox=77.4,12.8,77.8,13.1&bounded=1`,
      {
        headers: {
          "User-Agent": "HOPER-RideShare/1.0",
        },
      },
    )

    if (!response.ok) {
      return []
    }

    const data = await response.json()

    return data.map((item: any) => ({
      name: item.name || "",
      address: item.display_name || "",
      lat: Number.parseFloat(item.lat),
      lng: Number.parseFloat(item.lon),
    }))
  } catch (error) {
    console.error("[v0] Error fetching location suggestions:", error)
    return []
  }
}
