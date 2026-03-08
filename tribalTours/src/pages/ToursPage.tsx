import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchIcon, FilterIcon, MapPinIcon, XIcon } from 'lucide-react';
import { mockListings } from '../data/mockData';
import { TourListingCard } from '../components/TourListingCard';
import { Button } from '../components/ui/Button';
import { TribalPattern } from '../components/TribalPattern';
export function ToursPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [sortBy, setSortBy] = useState('recommended');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  useEffect(() => {
    const locationParam = searchParams.get('location');
    if (locationParam) {
      setSelectedLocation(locationParam);
    }
  }, [searchParams]);
  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    if (location === 'All') {
      searchParams.delete('location');
    } else {
      searchParams.set('location', location);
    }
    setSearchParams(searchParams);
  };
  const categories = [
  'All',
  'Island Hopping',
  'Mountain Trekking',
  'Cultural Heritage',
  'Food Tours',
  'River Adventures',
  'Farm Tourism'];

  const locations = [
  'All',
  'Samal Island',
  'Tagum City',
  'Panabo City',
  'Kapalong',
  'Carmen',
  'New Corella',
  'Talaingod',
  'Asuncion',
  'Santo Tomas'];

  const filteredListings = mockListings.
  filter((listing) => {
    const matchesSearch =
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
    selectedCategory === 'All' || listing.category === selectedCategory;
    const matchesLocation =
    selectedLocation === 'All' || listing.location === selectedLocation;
    return (
      matchesSearch && matchesCategory && matchesLocation && listing.isActive);

  }).
  sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      default:
        return 0;
    }
  });
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    handleLocationChange('All');
    setSortBy('recommended');
  };
  const activeFilterCount = [
  selectedCategory !== 'All',
  selectedLocation !== 'All',
  searchQuery !== ''].
  filter(Boolean).length;
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Banner */}
      <div className="bg-ocean text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <TribalPattern opacity={1} className="h-full" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tours in Davao del Norte
          </h1>
          <p className="text-xl text-ocean-100 mb-8 max-w-2xl mx-auto">
            Discover authentic experiences crafted by local Giyas who know the
            hidden gems of their hometowns.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <div className="flex shadow-xl rounded-lg overflow-hidden bg-white p-1">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for tours, destinations, or activities..."
                  className="w-full pl-12 pr-4 py-4 text-gray-900 border-none focus:ring-0 text-lg outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />

              </div>
              <Button size="lg" className="rounded-md px-8">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              fullWidth
              className="flex items-center justify-center"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}>

              <FilterIcon className="w-5 h-5 mr-2" />
              {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
              {activeFilterCount > 0 &&
              <span className="ml-2 bg-ocean text-white text-xs px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              }
            </Button>
          </div>

          {/* Sidebar Filters */}
          <div
            className={`w-full lg:w-72 flex-shrink-0 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <FilterIcon className="w-5 h-5 mr-2 text-ocean" />
                  Filters
                </h2>
                {activeFilterCount > 0 &&
                <button
                  className="text-sm text-ocean hover:underline"
                  onClick={clearFilters}>

                    Clear All
                  </button>
                }
              </div>

              <div className="space-y-6">
                {/* Location Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2 text-gray-500" />
                    Location
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {locations.map((location) =>
                    <label
                      key={location}
                      className="flex items-center cursor-pointer group">

                        <input
                        type="radio"
                        name="location"
                        className="w-4 h-4 text-ocean border-gray-300 focus:ring-ocean"
                        checked={selectedLocation === location}
                        onChange={() => handleLocationChange(location)} />

                        <span
                        className={`ml-2 text-sm group-hover:text-ocean transition-colors ${selectedLocation === location ? 'font-medium text-gray-900' : 'text-gray-600'}`}>

                          {location}
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) =>
                    <label
                      key={category}
                      className="flex items-center cursor-pointer group">

                        <input
                        type="radio"
                        name="category"
                        className="w-4 h-4 text-ocean border-gray-300 focus:ring-ocean"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)} />

                        <span
                        className={`ml-2 text-sm group-hover:text-ocean transition-colors ${selectedCategory === category ? 'font-medium text-gray-900' : 'text-gray-600'}`}>

                          {category}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Results */}
          <div className="flex-grow">
            {/* Active Filters & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {filteredListings.length}{' '}
                  {filteredListings.length === 1 ? 'Tour' : 'Tours'} Found
                </h2>
                {selectedLocation !== 'All' &&
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-ocean/10 text-ocean">
                    {selectedLocation}
                    <button
                    onClick={() => handleLocationChange('All')}
                    className="ml-2 hover:text-ocean/70">

                      <XIcon className="w-3 h-3" />
                    </button>
                  </span>
                }
                {selectedCategory !== 'All' &&
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-olive/10 text-olive">
                    {selectedCategory}
                    <button
                    onClick={() => setSelectedCategory('All')}
                    className="ml-2 hover:text-olive/70">

                      <XIcon className="w-3 h-3" />
                    </button>
                  </span>
                }
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  className="border-gray-300 rounded-md text-sm focus:ring-ocean focus:border-ocean py-1.5 pl-3 pr-8"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}>

                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {filteredListings.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((listing) =>
              <TourListingCard key={listing.id} listing={listing} />
              )}
              </div> :

            <div className="bg-white p-12 rounded-xl border border-gray-200 text-center shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No tours found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  We couldn't find any tours matching your current filters. Try
                  adjusting your search criteria or clearing filters.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}