"use client"

import { motion } from "framer-motion"

const SkeletonCard = ({ index }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md overflow-hidden h-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
  >
    <div className="h-48 bg-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse-slow"></div>
    </div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse-slow"></div>
      </div>
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded relative overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse-slow"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
)

const CountryGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, index) => (
        <SkeletonCard key={index} index={index} />
      ))}
    </div>
  )
}

export default CountryGridSkeleton
