import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA_bTiKVc834b64IvSZ5aeD9x3SGDy7KRY",
  authDomain: "hoper-ride.firebaseapp.com",
  projectId: "hoper-ride",
  storageBucket: "hoper-ride.firebasestorage.app",
  messagingSenderId: "1055828278880",
  appId: "1:1055828278880:web:25d81b0ecc1750ba5acd05",
  measurementId: "G-HXJXG6W0C7",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
