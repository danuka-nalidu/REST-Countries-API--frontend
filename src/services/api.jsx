// API endpoints
const BASE_URL = "https://restcountries.com/v3.1"

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `API request failed with status ${response.status}`)
  }
  return response.json()
}

// Fetch all countries with limited fields for better performance
export const fetchAllCountries = async () => {
  const fields = "name,capital,population,region,subregion,flags,cca3,borders,currencies,languages,tld"
  const response = await fetch(`${BASE_URL}/all?fields=${fields}`)
  return handleResponse(response)
}

// Fetch countries by name
export const fetchCountriesByName = async (name) => {
  const fields = "name,capital,population,region,subregion,flags,cca3"
  const response = await fetch(`${BASE_URL}/name/${name}?fields=${fields}`)
  return handleResponse(response)
}

// Fetch countries by region
export const fetchCountriesByRegion = async (region) => {
  const fields = "name,capital,population,region,subregion,flags,cca3"
  const response = await fetch(`${BASE_URL}/region/${region}?fields=${fields}`)
  return handleResponse(response)
}

// Fetch countries by subregion
export const fetchCountriesBySubregion = async (subregion) => {
  const fields = "name,capital,population,region,subregion,flags,cca3"
  const response = await fetch(`${BASE_URL}/subregion/${subregion}?fields=${fields}`)
  return handleResponse(response)
}

// Fetch countries by currency
export const fetchCountriesByCurrency = async (currency) => {
  const fields = "name,capital,population,region,subregion,flags,cca3"
  const response = await fetch(`${BASE_URL}/currency/${currency}?fields=${fields}`)
  return handleResponse(response)
}

// Fetch countries by language
export const fetchCountriesByLanguage = async (language) => {
  const fields = "name,capital,population,region,subregion,flags,cca3"
  const response = await fetch(`${BASE_URL}/lang/${language}?fields=${fields}`)
  return handleResponse(response)
}

// Fetch countries by capital
export const fetchCountriesByCapital = async (capital) => {
  const fields = "name,capital,population,region,subregion,flags,cca3"
  const response = await fetch(`${BASE_URL}/capital/${capital}?fields=${fields}`)
  return handleResponse(response)
}

// Fetch country by code (for detailed view)
export const fetchCountryByCode = async (code) => {
  const response = await fetch(`${BASE_URL}/alpha/${code}`)
  return handleResponse(response)
}
