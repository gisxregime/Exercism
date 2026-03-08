import React, { useState } from 'react';
export function FilterSection() {
  const [activeLocation, setActiveLocation] = useState('All Areas');
  const locations = [
  'All Areas',
  'Samal Island',
  'Tagum City',
  'Panabo City',
  'Kapalong',
  'Carmen',
  'Talaingod',
  'New Corella',
  'Asuncion',
  'Santo Tomas'];

  return (
    <div className="py-12 bg-white text-center px-4">
      <h2 className="text-3xl font-bold text-ocean mb-2">
        Find Your Perfect Giya
      </h2>
      <p className="text-gray-500 mb-8">Filter by municipality</p>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Locations */}
        <div className="flex flex-wrap justify-center gap-3">
          {locations.map((loc) =>
          <button
            key={loc}
            onClick={() => setActiveLocation(loc)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${activeLocation === loc ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-600 border-gray-200 hover:border-amber-500 hover:text-amber-600'}`}>

              {loc}
            </button>
          )}
        </div>

        <p className="text-sm text-gray-400 mt-6">
          Showing guides matching your criteria
        </p>
      </div>
    </div>);

}