"use client"

import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { ArrowLeftIcon, ExternalLinkIcon, HeartIcon } from "../components/Icons"
import { fetchCountryByCode } from "../services/api"

const CountryDetail = ({ countries, addToFavorites, removeFromFavorites, isInFavorites, isLoggedIn }) => {
  const { code } = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState(null)
  const [borderCountries, setBorderCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const getCountryDetails = async () => {
      setIsLoading(true)

      try {
        let foundCountry = countries.find((c) => c.cca3 === code)

        if (!foundCountry || countries.length === 0) {
          foundCountry = await fetchCountryByCode(code)
          if (Array.isArray(foundCountry)) {
            foundCountry = foundCountry[0]
          }
        }

        if (foundCountry) {
          setCountry(foundCountry)

          if (isInFavorites) {
            setIsFavorite(isInFavorites(foundCountry.cca3))
          }

          if (foundCountry.borders && foundCountry.borders.length > 0) {
            const borderData = []

            if (countries.length > 0) {
              const borders = countries.filter((c) => foundCountry.borders.includes(c.cca3))
              if (borders.length === foundCountry.borders.length) {
                setBorderCountries(borders)
              } else {
                for (const borderCode of foundCountry.borders) {
                  try {
                    const borderCountry = await fetchCountryByCode(borderCode)
                    if (Array.isArray(borderCountry)) {
                      borderData.push(borderCountry[0])
                    } else {
                      borderData.push(borderCountry)
                    }
                  } catch (err) {
                    console.error(`Error fetching border country ${borderCode}:`, err)
                  }
                }
                setBorderCountries(borderData)
              }
            } else {
              for (const borderCode of foundCountry.borders) {
                try {
                  const borderCountry = await fetchCountryByCode(borderCode)
                  if (Array.isArray(borderCountry)) {
                    borderData.push(borderCountry[0])
                  } else {
                    borderData.push(borderCountry)
                  }
                } catch (err) {
                  console.error(`Error fetching border country ${borderCode}:`, err)
                }
              }
              setBorderCountries(borderData)
            }
          }
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching country details:", err)
        setError("Failed to load country details. Please try again.")
        setIsLoading(false)
      }
    }

    getCountryDetails()
  }, [code, countries, isInFavorites])

  useEffect(() => {
    if (country && isInFavorites) {
      setIsFavorite(isInFavorites(country.cca3))
    }
  }, [country, isInFavorites])

  const handleFavoriteToggle = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to manage favorites")
      navigate("/login")
      return
    }

    if (isFavorite) {
      const success = removeFromFavorites(country.cca3)
      if (success) {
        setIsFavorite(false)
      }
    } else {
      const success = addToFavorites(country)
      if (success) {
        setIsFavorite(true)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 w-32 bg-gray-200 rounded-lg mb-12"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-80 bg-gray-200 rounded-lg"></div>
          <div>
            <div className="h-10 w-48 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-5 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-5 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
        >
          Go Back to Home
        </button>
      </div>
    )
  }

  if (!country) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">Country not found</div>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
        >
          Go Back to Home
        </button>
      </div>
    )
  }

  const formatObjectValues = (obj) => {
    if (!obj) return "N/A"
    return Object.values(obj)
      .map((val) => (typeof val === "string" ? val : val.common || val.name || val))
      .join(", ")
  }

  const getNativeName = () => {
    if (!country.name.nativeName) return country.name.common
    const firstNativeName = Object.values(country.name.nativeName)[0]
    return firstNativeName.common || firstNativeName.official || country.name.common
  }

  const getCurrencies = () => {
    if (!country.currencies) return "N/A"
    return Object.entries(country.currencies)
      .map(([code, currency]) => `${currency.name} (${currency.symbol || code})`)
      .join(", ")
  }

  return (
    <div>
      <motion.div
        className="flex justify-between items-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={() => navigate("/")}
          className="flex items-center bg-white shadow-md hover:shadow-lg px-6 py-2 rounded-lg transition-all"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span>Back to Home</span>
        </motion.button>

        {country && addToFavorites && removeFromFavorites && (
          <motion.button
            onClick={handleFavoriteToggle}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all ${
              isFavorite
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white shadow-md hover:shadow-lg text-gray-700 hover:text-red-500"
            }`}
            title={isLoggedIn ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Login to add favorites"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HeartIcon className="h-5 w-5" filled={isFavorite} />
            <span>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
          </motion.button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          className="h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-full overflow-hidden rounded-lg shadow-lg">
            <img
              src={country.flags.svg || country.flags.png || "/placeholder.svg"}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-auto object-cover"
            />
            {country.flags.alt && (
              <div className="mt-3 text-sm text-gray-500 italic p-4 bg-white bg-opacity-90 absolute bottom-0 left-0 right-0">
                <span className="font-medium">Flag description:</span> {country.flags.alt}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {country.name.common}
          </motion.h1>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="space-y-3">
              <p className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Native Name: </span>
                <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full">{getNativeName()}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Population: </span>
                <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                  {country.population.toLocaleString()}
                </span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Region: </span>
                <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full">{country.region}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Sub Region: </span>
                <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full">{country.subregion || "N/A"}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Capital: </span>
                <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full">{country.capital?.[0] || "N/A"}</span>
              </p>
            </div>

            <div className="space-y-3">
              <p className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Top Level Domain: </span>
                <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                  {country.tld?.join(", ") || "N/A"}
                </span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Currencies: </span>
                <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full">{getCurrencies()}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Languages: </span>
                <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                  {country.languages ? formatObjectValues(country.languages) : "N/A"}
                </span>
              </p>
            </div>
          </motion.div>

          {borderCountries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="font-semibold text-gray-800 mb-3">Border Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((border, index) => (
                  <motion.div
                    key={border.cca3}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                  >
                    <Link
                      to={`/country/${border.cca3}`}
                      className="bg-white shadow-md hover:shadow-lg px-4 py-2 rounded-lg text-sm transition-all hover:-translate-y-1 inline-block"
                    >
                      {border.name.common}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {country.maps?.googleMaps && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <span>View on Google Maps</span>
                <ExternalLinkIcon className="h-4 w-4 ml-2" />
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Map section */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Map View</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="w-full h-[500px] overflow-hidden rounded-lg border border-gray-200">
            <iframe
              title={`Map of ${country.name.common}`}
              className="w-full h-full"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(country.name.common)}`}
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Interactive map of {country.name.common}. You may need to enable location services to view the map.
          </p>
        </div>
      </motion.div>

      {/* Country facts section */}
      <motion.div
        className="mt-16 bg-blue-50 rounded-xl p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Facts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl text-blue-500 mb-2">🌍</div>
            <h3 className="font-semibold text-lg mb-2">Region</h3>
            <p>{country.region}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl text-blue-500 mb-2">👨‍👩‍👧‍👦</div>
            <h3 className="font-semibold text-lg mb-2">Population</h3>
            <p>{country.population.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl text-blue-500 mb-2">🏙️</div>
            <h3 className="font-semibold text-lg mb-2">Capital</h3>
            <p>{country.capital?.[0] || "N/A"}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl text-blue-500 mb-2">💬</div>
            <h3 className="font-semibold text-lg mb-2">Languages</h3>
            <p>{country.languages ? formatObjectValues(country.languages) : "N/A"}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CountryDetail
