import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { HeartIcon } from "./Icons"

const CountryCard = ({ country, addToFavorites, removeFromFavorites, isInFavorites, isLoggedIn }) => {
  const isFavorite = isInFavorites ? isInFavorites(country.cca3) : false
  const navigate = useNavigate()
  
  const handleFavoriteToggle = (e) => {
    e.preventDefault() // Prevent navigating to country detail page
    
    if (isFavorite) {
      const success = removeFromFavorites(country.cca3)
      if (!success && !isLoggedIn) {
        navigate('/login')
      }
    } else {
      const success = addToFavorites(country)
      if (!success && !isLoggedIn) {
        navigate('/login')
      }
    }
  }

  return (
    <Link to={`/country/${country.cca3}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-1 relative">
        {/* Favorite button */}
        {addToFavorites && removeFromFavorites && (
          <button
            onClick={handleFavoriteToggle}
            className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md z-10 transition-all ${
              isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-400'
            }`}
            title={isLoggedIn ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Login to add favorites"}
          >
            <HeartIcon className="h-5 w-5" filled={isFavorite} />
          </button>
        )}

        <div className="h-48 overflow-hidden">
          <img
            src={country.flags.svg || country.flags.png || "/placeholder.svg"}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
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
      </div>
    </Link>
  )
}

export default CountryCard
