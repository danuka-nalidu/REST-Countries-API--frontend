"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { SearchIcon } from "./Icons"

const SearchBar = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative w-full"
      onClick={focusInput}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`flex items-center bg-white rounded-lg overflow-hidden transition-all ${
          isFocused ? "shadow-lg ring-2 ring-blue-300" : "shadow-md hover:shadow-lg"
        }`}
        animate={{
          boxShadow: isFocused
            ? "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <motion.button
          type="submit"
          className="pl-4 pr-2 py-3 text-gray-400 hover:text-blue-500 transition-colors"
          disabled={isLoading}
          whileTap={{ scale: 0.9 }}
        >
          <SearchIcon className="h-5 w-5" />
        </motion.button>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full py-4 px-2 text-gray-700 focus:outline-none"
          disabled={isLoading}
        />
      </motion.div>
    </motion.form>
  )
}

export default SearchBar
