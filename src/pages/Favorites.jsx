"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import CountryGrid from "../components/CountryGrid"
import { HeartIcon } from "../components/Icons"

const Favorites = ({ favorites, removeFromFavorites, isLoading }) => {
  return (
    <div>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <HeartIcon className="h-8 w-8 text-red-500" filled={true} />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800">Favorite Countries</h1>
        </div>

        {favorites.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-xl shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.3,
              }}
            >
              <div className="text-8xl mb-6">💔</div>
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-2xl">🌍</span>
              </motion.div>
            </motion.div>
            <motion.h3
              className="text-2xl font-semibold text-gray-800 mb-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              No favorites yet
            </motion.h3>
            <motion.p
              className="text-gray-600 max-w-md mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Explore countries and click the heart icon to add them to your favorites. Your favorite countries will
              appear here for quick access.
            </motion.p>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
              <Link
                to="/"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg inline-flex items-center space-x-2"
              >
                <span>Explore Countries</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="bg-blue-50 p-6 rounded-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-gray-700">
                You have {favorites.length} {favorites.length === 1 ? "country" : "countries"} in your favorites. Click
                on any country to view more details or remove it from your favorites.
              </p>
            </motion.div>
            <CountryGrid
              countries={favorites}
              isLoading={isLoading}
              showFavoriteActions={true}
              removeFromFavorites={removeFromFavorites}
              isInFavorites={() => true} // All countries in this view are favorites
            />
          </>
        )}
      </motion.div>
    </div>
  )
}

export default Favorites
