import React from 'react';
import { Municipality } from '../data/municipalityData';
import { ImagePlaceholder } from './ImagePlaceholder';
interface MunicipalityNavProps {
  municipalities: Municipality[];
  activeId: string;
  onSelect: (id: string) => void;
}
export function MunicipalityNav({
  municipalities,
  activeId,
  onSelect
}: MunicipalityNavProps) {
  return (
    <div className="w-full overflow-x-auto custom-scrollbar py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex space-x-3 min-w-max mx-auto justify-start md:justify-center">
        {municipalities.map((m) => {
          const isActive = activeId === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={`flex items-center p-1.5 pr-5 rounded-full border transition-all duration-200 ${isActive ? 'border-ocean bg-ocean/5 shadow-md ring-1 ring-ocean/20' : 'border-gray-200 bg-white hover:border-ocean/40 hover:shadow-sm'}`}>

              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mr-3 border border-gray-100">
                <ImagePlaceholder height="h-full" text="" />
              </div>
              <span
                className={`text-sm font-bold tracking-tight ${isActive ? 'text-ocean' : 'text-gray-700'}`}>

                {m.name}
              </span>
            </button>);

        })}
      </div>
    </div>);

}