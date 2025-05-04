"use client"

import { Link } from "react-router-dom"
import CountryGrid from "../components/CountryGrid"
import { HeartIcon } from "../components/Icons"

const Favorites = ({ favorites, removeFromFavorites, isLoading }) => {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <HeartIcon className="h-6 w-6 text-red-500" />
          <h1 className="text-3xl font-bold text-gray-800">Favorite Countries</h1>
        </div>
        
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-4">💔</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h3>
            <p className="text-gray-600 max-w-md mb-6">
              Explore countries and click the heart icon to add them to your favorites.
            </p>
            <Link
              to="/"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors shadow-md"
            >
              Explore Countries
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              You have {favorites.length} {favorites.length === 1 ? 'country' : 'countries'} in your favorites.
            </p>
            <CountryGrid 
              countries={favorites} 
              isLoading={isLoading} 
              showFavoriteActions={true} 
              removeFromFavorites={removeFromFavorites}
              isInFavorites={() => true} // All countries in this view are favorites
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Favorites