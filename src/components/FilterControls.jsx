"use client"

import { useState } from "react"
import FilterBar from "./FilterBar"

const FilterControls = ({ onApplyFilter, isLoading }) => {
  const [activeFilter, setActiveFilter] = useState("region")

  const filterTypes = [
    { id: "region", label: "Region" },
    { id: "subregion", label: "Subregion" },
    { id: "language", label: "Language" },
    { id: "currency", label: "Currency" },
  ]

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-3">
        {filterTypes.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              activeFilter === filter.id ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            disabled={isLoading}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <FilterBar filterType={activeFilter} onFilter={onApplyFilter} isLoading={isLoading} />
    </div>
  )
}

export default FilterControls
