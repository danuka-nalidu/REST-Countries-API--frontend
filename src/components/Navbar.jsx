"use client"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { GlobeIcon, HeartIcon } from "./Icons"

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = () => {
    navigate("/login")
  }

  const handleSignup = () => {
    navigate("/signup")
  }

  const handleLogout = () => {
    setUser(null)
    toast.success("You have been logged out")
    navigate("/")
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <motion.nav
      className="bg-white shadow-md sticky top-0 z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-blue-500 transition-colors"
          >
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }}>
              <GlobeIcon className="h-7 w-7 text-blue-500" />
            </motion.div>
            <span>REST Countries Explorer</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              to="/favorites"
              className={`flex items-center space-x-1 transition-colors ${
                isActive("/favorites") ? "text-red-500 font-medium" : "text-gray-700 hover:text-red-500"
              }`}
            >
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <HeartIcon className="h-5 w-5" filled={isActive("/favorites")} />
              </motion.div>
              <span>Favorites</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <motion.div
                  className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <span>Welcome, {user.name || user.email}</span>
                </motion.div>
                <motion.button
                  onClick={handleLogout}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm transition-colors"
                  whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ y: 0 }}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <>
                <motion.button
                  onClick={handleLogin}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm transition-colors"
                  whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ y: 0 }}
                >
                  Login
                </motion.button>
                <motion.button
                  onClick={handleSignup}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
                  whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ y: 0 }}
                >
                  Sign Up
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
