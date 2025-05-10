"use client"

import { motion } from "framer-motion"
import CountryCard from "./CountryCard"
import CountryGridSkeleton from "./CountryGridSkeleton"

const CountryGrid = ({ countries, isLoading, addToFavorites, removeFromFavorites, isInFavorites }) => {
  if (isLoading) {
    return <CountryGridSkeleton />
  }

  if (countries.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-7xl mb-6"
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          🌍
        </motion.div>
        <motion.h3
          className="text-2xl font-semibold text-gray-800 mb-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          No countries found
        </motion.h3>
        <motion.p
          className="text-gray-600 max-w-md mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Try adjusting your search or filter criteria to find what you're looking for.
        </motion.p>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Reset Filters
          </button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {countries.map((country, index) => (
        <CountryCard
          key={country.cca3}
          country={country}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          isInFavorites={isInFavorites}
          style={{
            animationDelay: `${index * 0.05}s`,
          }}
        />
      ))}
    </div>
  )
}

export default CountryGrid
