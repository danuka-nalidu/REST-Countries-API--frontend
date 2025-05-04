import CountryCard from "./CountryCard"
import CountryGridSkeleton from "./CountryGridSkeleton"

const CountryGrid = ({ 
  countries, 
  isLoading, 
  addToFavorites, 
  removeFromFavorites, 
  isInFavorites 
}) => {
  if (isLoading) {
    return <CountryGridSkeleton />
  }

  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-5xl mb-4">🌍</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No countries found</h3>
        <p className="text-gray-600 max-w-md">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {countries.map((country) => (
        <CountryCard 
          key={country.cca3} 
          country={country} 
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
          isInFavorites={isInFavorites}
        />
      ))}
    </div>
  )
}

export default CountryGrid
