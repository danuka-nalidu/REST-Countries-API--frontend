"use client"

import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { HeartIcon } from "./Icons"

const CountryCard = ({ country, addToFavorites, removeFromFavorites, isInFavorites, isLoggedIn }) => {
  const isFavorite = isInFavorites ? isInFavorites(country.cca3) : false
  const navigate = useNavigate()

  const handleFavoriteToggle = (e) => {
    e.preventDefault() // Prevent navigating to country detail page

    if (isFavorite) {
      const success = removeFromFavorites(country.cca3)
      if (!success && !isLoggedIn) {
        navigate("/login")
      }
    } else {
      const success = addToFavorites(country)
      if (!success && !isLoggedIn) {
        navigate("/login")
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="h-full"
    >
      <Link to={`/country/${country.cca3}`} className="block h-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full relative group">
          {/* Favorite button */}
          {addToFavorites && removeFromFavorites && (
            <motion.button
              onClick={handleFavoriteToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-md z-10 transition-all ${
                isFavorite ? "text-red-500" : "text-gray-400"
              }`}
              title={
                isLoggedIn ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Login to add favorites"
              }
            >
              <HeartIcon className="h-5 w-5" filled={isFavorite} />
            </motion.button>
          )}

          <div className="h-48 overflow-hidden">
            <img
              src={country.flags.svg || country.flags.png || "/placeholder.svg"}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 line-clamp-1">{country.name.common}</h2>
            <div className="space-y-2 text-gray-600">
              <p className="flex justify-between">
                <span className="font-semibold">Population:</span>
                <span>{country.population.toLocaleString()}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Region:</span>
                <span>{country.region}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Capital:</span>
                <span className="text-right">{country.capital?.[0] || "N/A"}</span>
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
      </Link>
    </motion.div>
  )
}

export default CountryCard
