import React from 'react';
import { FilterSection } from '../components/FilterSection';
import { GuideCard } from '../components/GuideCard';
import { mockGuides } from '../data/mockData';
import { TribalPattern } from '../components/TribalPattern';
export function GuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-white pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Local Giyas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Meet the passionate locals ready to share the beauty, culture, and
            stories of Davao del Norte with you.
          </p>
        </div>
      </div>

      <TribalPattern opacity={0.1} className="bg-white" />

      <FilterSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">All Guides</h2>
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-sm text-gray-600">
              Sort by:
            </label>
            <select
              id="sort"
              className="border-gray-300 rounded-md text-sm focus:ring-ocean focus:border-ocean">

              <option>Highest Rated</option>
              <option>Most Reviews</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockGuides.map((guide) =>
          <GuideCard key={guide.id} guide={guide} />
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination">

            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">

              Previous
            </a>
            <a
              href="#"
              aria-current="page"
              className="z-10 bg-ocean/10 border-ocean text-ocean relative inline-flex items-center px-4 py-2 border text-sm font-medium">

              1
            </a>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">

              2
            </a>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">

              3
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">

              Next
            </a>
          </nav>
        </div>
      </div>
    </div>);

}