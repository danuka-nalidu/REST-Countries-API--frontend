"use client"

import { useState, useEffect } from "react"
import { ChevronDownIcon } from "./Icons"

const FilterBar = ({ onFilter, filterType, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")

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
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-white shadow-md rounded-lg px-4 py-3 text-gray-700 hover:shadow-lg transition-all"
        disabled={isLoading}
      >
        <span>{selectedOption || `Filter by ${filterType}`}</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg py-1 max-h-60 overflow-auto">
          <button
            onClick={handleReset}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            All {filterType}s
          </button>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterBar
