"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon } from "./Icons"

const FilterBar = ({ onFilter, filterType, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const dropdownRef = useRef(null)

  const filterOptions = {
    region: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
    subregion: [
      "Northern Africa",
      "Western Africa",
      "Middle Africa",
      "Eastern Africa",
      "Southern Africa",
      "Northern America",
      "Caribbean",
      "Central America",
      "South America",
      "Central Asia",
      "Eastern Asia",
      "Southern Asia",
      "South-Eastern Asia",
      "Western Asia",
      "Northern Europe",
      "Southern Europe",
      "Western Europe",
      "Eastern Europe",
      "Australia and New Zealand",
      "Melanesia",
      "Micronesia",
      "Polynesia",
    ],
    language: ["English", "Spanish", "French", "Arabic", "Portuguese", "Russian", "Chinese", "German", "Japanese"],
    currency: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR"],
  }

  const options = filterOptions[filterType] || []

  useEffect(() => {
    setSelectedOption("")
  }, [filterType])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (option) => {
    setSelectedOption(option)
    onFilter(option, filterType)
    setIsOpen(false)
  }

  const handleReset = () => {
    setSelectedOption("")
    onFilter("", filterType)
    setIsOpen(false)
  }

  return (
    <motion.div
      className="relative"
      ref={dropdownRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full bg-white rounded-lg px-4 py-4 text-gray-700 transition-all ${
          isOpen ? "shadow-lg ring-2 ring-blue-300" : "shadow-md hover:shadow-lg"
        }`}
        disabled={isLoading}
        whileTap={{ scale: 0.98 }}
      >
        <span className={selectedOption ? "text-gray-800 font-medium" : "text-gray-500"}>
          {selectedOption || `Filter by ${filterType}`}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDownIcon className="h-4 w-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-xl py-1 max-h-60 overflow-auto"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              onClick={handleReset}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              whileTap={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
            >
              All {filterType}s
            </motion.button>

            {options.map((option, index) => (
              <motion.button
                key={option}
                onClick={() => handleSelect(option)}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                whileTap={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default FilterBar
