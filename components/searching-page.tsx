"use client"
import { motion } from "framer-motion"

interface SearchingPageProps {
  onNavigate: () => void
  pickupLocation?: string
  dropLocation?: string
  selectedRide?: string
}

export default function SearchingPage({
  onNavigate,
  pickupLocation = "Pickup",
  dropLocation = "Drop-off",
  selectedRide = "Cab",
}: SearchingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 text-center border-2 border-border"
      >
        {/* Animated Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="mb-6 flex justify-center"
        >
          <div className="w-16 h-16 border-4 border-gray-300 rounded-full border-t-orange-500 border-r-blue-500"></div>
        </motion.div>

        {/* Message */}
        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold text-black mb-2 font-montserrat"
        >
          Looking for riders near you...
        </motion.h2>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 mb-2 font-montserrat"
        >
          Searching for {selectedRide}
        </motion.p>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm text-gray-500 mb-8 font-montserrat"
        >
          We're finding the best ride for you
        </motion.p>

        {/* Route Info */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-50 rounded-2xl p-4 mb-8 text-left border-2 border-border"
        >
          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1 font-montserrat">From</p>
          <p className="text-black font-bold mb-3 font-montserrat">{pickupLocation}</p>
          <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-1 font-montserrat">To</p>
          <p className="text-black font-bold font-montserrat">{dropLocation}</p>
        </motion.div>

        {/* Cancel Search Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNavigate}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-2xl font-black font-montserrat hover:shadow-lg transition-shadow"
        >
          Cancel Search
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
