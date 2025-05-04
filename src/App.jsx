"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import CountryDetail from "./pages/CountryDetail"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Favorites from "./pages/Favorites"
import { fetchAllCountries } from "./services/api"

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState([])

  // Initialize app - load countries and check for existing session
  useEffect(() => {
    const getInitialCountries = async () => {
      try {
        setIsLoading(true)
        const data = await fetchAllCountries()
        setCountries(data)
        setFilteredCountries(data)
        setIsLoading(false)
      } catch (error) {
        setError(error.message)
        setIsLoading(false)
      }
    }

    getInitialCountries()
    
    // Check for existing user session in localStorage
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      
      // Load user-specific favorites if user exists
      const userEmail = JSON.parse(savedUser).email
      const userFavorites = localStorage.getItem(`favorites_${userEmail}`)
      if (userFavorites) {
        setFavorites(JSON.parse(userFavorites))
      }
    }
  }, [])

  // Save favorites to localStorage whenever favorites change and user exists
  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`favorites_${user.email}`, JSON.stringify(favorites))
    }
  }, [favorites, user])

  // Handle user login/logout
  const handleUserChange = (newUser) => {
    if (newUser) {
      // User logged in - store in localStorage
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      setUser(newUser)
      
      // Load user-specific favorites if they exist
      const userFavorites = localStorage.getItem(`favorites_${newUser.email}`)
      if (userFavorites) {
        setFavorites(JSON.parse(userFavorites))
      } else {
        setFavorites([]) // Reset favorites for new user
      }
    } else {
      // User logged out - clear favorites and session
      if (user && user.email) {
        // Keep the favorites in localStorage for when user logs back in
        // but clear them from the current session
        setFavorites([])
      }
      localStorage.removeItem('currentUser')
      setUser(null)
    }
  }

  // Add country to favorites - now requires logged in user
  const addToFavorites = (country) => {
    if (!user) {
      alert("Please log in to add favorites")
      return false
    }
    
    if (!favorites.some(fav => fav.cca3 === country.cca3)) {
      const newFavorites = [...favorites, country]
      setFavorites(newFavorites)
      
      // Save to user-specific storage
      if (user && user.email) {
        localStorage.setItem(`favorites_${user.email}`, JSON.stringify(newFavorites))
      }
    }
    return true
  }

  // Remove country from favorites - now requires logged in user
  const removeFromFavorites = (countryCode) => {
    if (!user) {
      alert("Please log in to manage favorites")
      return false
    }
    
    const newFavorites = favorites.filter(country => country.cca3 !== countryCode)
    setFavorites(newFavorites)
    
    // Save to user-specific storage
    if (user && user.email) {
      localStorage.setItem(`favorites_${user.email}`, JSON.stringify(newFavorites))
    }
    return true
  }

  // Check if a country is in favorites
  const isInFavorites = (countryCode) => {
    return favorites.some(country => country.cca3 === countryCode)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} setUser={handleUserChange} />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  countries={filteredCountries}
                  setFilteredCountries={setFilteredCountries}
                  allCountries={countries}
                  isLoading={isLoading}
                  error={error}
                  setIsLoading={setIsLoading}
                  setError={setError}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  isInFavorites={isInFavorites}
                  isLoggedIn={!!user}
                />
              }
            />
            <Route 
              path="/country/:code" 
              element={
                <CountryDetail 
                  countries={countries} 
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  isInFavorites={isInFavorites}
                  isLoggedIn={!!user}
                />
              } 
            />
            <Route path="/login" element={<Login setUser={handleUserChange} />} />
            <Route path="/signup" element={<Signup setUser={handleUserChange} />} />
            <Route 
              path="/favorites" 
              element={
                <Favorites 
                  favorites={favorites} 
                  removeFromFavorites={removeFromFavorites}
                  isLoading={isLoading}
                  isLoggedIn={!!user}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
