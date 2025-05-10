"use client"

import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
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
      navigate('/login')
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
      <div className="flex justify-between items-center mb-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center bg-white shadow-md hover:shadow-lg px-6 py-2 rounded-lg transition-all"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span>Back to Home</span>
        </button>

        {country && addToFavorites && removeFromFavorites && (
          <button
            onClick={handleFavoriteToggle}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all ${
              isFavorite 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white shadow-md hover:shadow-lg text-gray-700 hover:text-red-500'
            }`}
            title={isLoggedIn ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Login to add favorites"}
          >
            <HeartIcon className="h-5 w-5" filled={isFavorite} />
            <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="h-full">
          <div className="relative h-full">
            <img
              src={country.flags.svg || country.flags.png || "/placeholder.svg"}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-auto object-cover shadow-lg rounded-lg"
            />
            {country.flags.alt && (
              <div className="mt-3 text-sm text-gray-500 italic">
                <span className="font-medium">Flag description:</span> {country.flags.alt}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">{country.name.common}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
            <div>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Native Name: </span>
                <span className="text-gray-600">{getNativeName()}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Population: </span>
                <span className="text-gray-600">{country.population.toLocaleString()}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Region: </span>
                <span className="text-gray-600">{country.region}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Sub Region: </span>
                <span className="text-gray-600">{country.subregion || "N/A"}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Capital: </span>
                <span className="text-gray-600">{country.capital?.[0] || "N/A"}</span>
              </p>
            </div>

            <div>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Top Level Domain: </span>
                <span className="text-gray-600">{country.tld?.join(", ") || "N/A"}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Currencies: </span>
                <span className="text-gray-600">{getCurrencies()}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Languages: </span>
                <span className="text-gray-600">
                  {country.languages ? formatObjectValues(country.languages) : "N/A"}
                </span>
              </p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Border Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((border) => (
                  <Link
                    key={border.cca3}
                    to={`/country/${border.cca3}`}
                    className="bg-white shadow-md hover:shadow-lg px-4 py-2 rounded-lg text-sm transition-all hover:-translate-y-1"
                  >
                    {border.name.common}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {country.maps?.googleMaps && (
            <div className="mt-6">
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
              >
                <span>View on Google Maps</span>
                <ExternalLinkIcon className="h-4 w-4 ml-2" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Map section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Map View</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="w-full h-[400px] overflow-hidden rounded-lg border border-gray-300">
            <iframe
              title={`Map of ${country.name.common}`}
              className="w-full h-full"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(country.name.common)}`}
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Interactive map of {country.name.common}. You may need to enable location services to view the map.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CountryDetail
