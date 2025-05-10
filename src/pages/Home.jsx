"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import SearchBar from "../components/SearchBar"
import FilterControls from "../components/FilterControls"
import CountryGrid from "../components/CountryGrid"
import HeroSection from "../components/HeroSection"
import {
  fetchCountriesByName,
  fetchCountriesByRegion,
  fetchCountriesBySubregion,
  fetchCountriesByLanguage,
  fetchCountriesByCurrency,
} from "../services/api"

const Home = ({
  countries,
  setFilteredCountries,
  allCountries,
  isLoading,
  error,
  setIsLoading,
  setError,
  addToFavorites,
  removeFromFavorites,
  isInFavorites,
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState({ type: "", value: "" })
  const searchTimeout = useRef(null)
  const exploreRef = useRef(null)

  const handleSearch = (query) => {
    setSearchQuery(query)

    // Clear any pending debounce
    if (searchTimeout.current) clearTimeout(searchTimeout.current)

    // If search cleared, reset list or reapply active filter
    if (!query.trim()) {
      if (activeFilters.value) {
        applyFilter(activeFilters.value, activeFilters.type)
      } else {
        setFilteredCountries(allCountries)
      }
      return
    }

    // Debounce API call by 400ms
    searchTimeout.current = setTimeout(async () => {
      try {
        setIsLoading(true)
        const data = await fetchCountriesByName(query)
        // Optional: sort alphabetically
        data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        setFilteredCountries(data)
        setIsLoading(false)
      } catch (err) {
        console.error("Error searching countries:", err)
        setError("No countries found matching your search.")
        setFilteredCountries([])
        setIsLoading(false)
      }
    }, 400)
  }

  const applyFilter = async (value, type) => {
    if (!value) {
      setActiveFilters({ type: "", value: "" })
      if (searchQuery) {
        handleSearch(searchQuery)
      } else {
        setFilteredCountries(allCountries)
      }
      return
    }

    setActiveFilters({ type, value })

    try {
      setIsLoading(true)
      let data = []
      switch (type) {
        case "region":
          data = await fetchCountriesByRegion(value)
          break
        case "subregion":
          data = await fetchCountriesBySubregion(value)
          break
        case "language":
          data = await fetchCountriesByLanguage(value)
          break
        case "currency":
          data = await fetchCountriesByCurrency(value)
          break
        default:
          data = allCountries
      }
      // further filter by search query if present
      if (searchQuery) {
        data = data.filter((c) => c.name.common.toLowerCase().includes(searchQuery.toLowerCase()))
      }
      setFilteredCountries(data)
      setIsLoading(false)
    } catch (err) {
      console.error(`Error filtering countries by ${type}:`, err)
      setError(`No countries found matching the selected ${type}.`)
      setFilteredCountries([])
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Add smooth scrolling to the explore section
    const handleStartExploring = () => {
      if (exploreRef.current) {
        exploreRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }

    const exploreButton = document.querySelector('a[href="#explore"]')
    if (exploreButton) {
      exploreButton.addEventListener("click", (e) => {
        e.preventDefault()
        handleStartExploring()
      })
    }

    return () => {
      if (exploreButton) {
        exploreButton.removeEventListener("click", handleStartExploring)
      }
    }
  }, [])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
        >
          Reload Application
        </button>
      </div>
    )
  }

  return (
    <div>
      <HeroSection />

      <div id="explore" ref={exploreRef} className="mb-12">
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Countries
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
          <div>
            <FilterControls onApplyFilter={applyFilter} isLoading={isLoading} />
          </div>
        </div>
      </div>

      <CountryGrid
        countries={countries}
        isLoading={isLoading}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        isInFavorites={isInFavorites}
      />

      <motion.div
        className="mt-16 p-8 bg-blue-50 rounded-xl text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Did You Know?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          There are 195 countries in the world today. This total comprises 193 countries that are member states of the
          United Nations and 2 countries that are non-member observer states: the Holy See and the State of Palestine.
        </p>
      </motion.div>
    </div>
  )
}

export default Home
