"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import LoaderEarthAnimation from "./LoaderEarthAnimation"

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative overflow-hidden mb-12">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Explore Our <span className="text-blue-600">World</span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Discover detailed information about countries around the globe. From populations to languages, currencies
              to borders - your journey around the world starts here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#explore"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Exploring
              </a>
              <a
                href="#about"
                className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg border border-gray-200"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-[400px] relative"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="relative z-10 w-full h-full">
                <LoaderEarthAnimation />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
