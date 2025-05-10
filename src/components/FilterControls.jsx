"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex flex-wrap gap-2 mb-3">
        {filterTypes.map((filter, index) => (
          <motion.button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              activeFilter === filter.id
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow"
            }`}
            disabled={isLoading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>
      <FilterBar filterType={activeFilter} onFilter={onApplyFilter} isLoading={isLoading} />
    </motion.div>
  )
}

export default FilterControls
