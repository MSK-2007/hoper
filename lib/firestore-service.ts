import { db } from "./firebase"
import { doc, setDoc, getDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore"

export interface RecentRide {
  pickupLocation: string
  dropLocation: string
  pickupCoords: { lat: number; lng: number }
  dropCoords: { lat: number; lng: number }
  rideType: string
  price: number
  distance: number
  timestamp: Timestamp
}

export interface FavoriteLocation {
  id: string
  name: string
  address: string
  lat: number
  lng: number
}

export interface UserProfile {
  email: string
  displayName: string
  recentRides: RecentRide[]
  favoriteLocations: FavoriteLocation[]
  createdAt: Timestamp
}

// Create or update user profile
export async function createOrUpdateUserProfile(userId: string, email: string, displayName: string) {
  const userRef = doc(db, "users", userId)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email,
      displayName,
      recentRides: [],
      favoriteLocations: [
        { id: "home", name: "Home", address: "", lat: 0, lng: 0 },
        { id: "work", name: "Work", address: "", lat: 0, lng: 0 },
        { id: "airport", name: "Airport", address: "", lat: 0, lng: 0 },
      ],
      createdAt: Timestamp.now(),
    })
  }
}

// Get user profile
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userRef = doc(db, "users", userId)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    return userSnap.data() as UserProfile
  }
  return null
}

// Save recent ride
export async function saveRecentRide(userId: string, ride: Omit<RecentRide, "timestamp">) {
  const userRef = doc(db, "users", userId)
  await updateDoc(userRef, {
    recentRides: arrayUnion({
      ...ride,
      timestamp: Timestamp.now(),
    }),
  })
}

// Update favorite location
export async function updateFavoriteLocation(userId: string, locationId: string, updates: Partial<FavoriteLocation>) {
  const userRef = doc(db, "users", userId)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    const user = userSnap.data() as UserProfile
    const updatedLocations = user.favoriteLocations.map((loc) => (loc.id === locationId ? { ...loc, ...updates } : loc))

    await updateDoc(userRef, {
      favoriteLocations: updatedLocations,
    })
  }
}

// Get favorite locations
export async function getFavoriteLocations(userId: string): Promise<FavoriteLocation[]> {
  const user = await getUserProfile(userId)
  return user?.favoriteLocations || []
}

// Get recent rides
export async function getRecentRides(userId: string): Promise<RecentRide[]> {
  const user = await getUserProfile(userId)
  return user?.recentRides || []
}
