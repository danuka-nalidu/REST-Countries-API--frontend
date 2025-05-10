"use client"

import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { GlobeIcon, HeartIcon } from "./Icons"

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/login")
  }

  const handleSignup = () => {
    navigate("/signup")
  }

  const handleLogout = () => {
    // This now calls our enhanced setUser function (handleUserChange)
    // which will clear favorites and session data
    setUser(null)
    toast.error("You have been logged out")
    navigate("/")
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-blue-500 transition-colors"
          >
            <GlobeIcon className="h-6 w-6" />
            <span>REST Countries Explorer</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/favorites" className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors">
              <HeartIcon className="h-5 w-5" />
              <span>Favorites</span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
