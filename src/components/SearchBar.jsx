"use client"

import { useState, useRef } from "react"
import { SearchIcon } from "./Icons"

const SearchBar = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("")
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
    <form onSubmit={handleSubmit} className="relative w-full" onClick={focusInput}>
      <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
        <button
          type="submit"
          className="pl-4 pr-2 py-3 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isLoading}
        >
          <SearchIcon className="h-5 w-5" />
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleChange}
          className="w-full py-3 px-2 text-gray-700 focus:outline-none"
          disabled={isLoading}
        />
      </div>
    </form>
  )
}

export default SearchBar
