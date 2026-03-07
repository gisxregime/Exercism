import React from 'react';
import { MapPinIcon, ArrowRightIcon } from 'lucide-react';
import { Municipality } from '../data/municipalityData';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ImagePlaceholder } from './ImagePlaceholder';
import { Badge } from './ui/Badge';
interface MunicipalitySectionProps {
  municipality: Municipality;
  index: number;
  onExplore: (name: string) => void;
}
export function MunicipalitySection({
  municipality,
  index,
  onExplore
}: MunicipalitySectionProps) {
  const isEven = index % 2 === 0;
  return (
    <section
      id={municipality.id}
      className="py-20 border-b border-gray-100 scroll-mt-32 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-16 items-center mb-20`}>

          {/* Image Side */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
              <ImagePlaceholder height="h-full" text={municipality.image} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-bold drop-shadow-lg mb-1">
                  {municipality.name}
                </h3>
                <p className="text-amber-400 font-medium drop-shadow-md">
                  {municipality.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center space-x-3 mb-5">
              <Badge
                variant="ocean"
                className="bg-ocean/10 text-ocean border-none px-3 py-1 uppercase tracking-wider text-xs font-bold">

                Municipality
              </Badge>
              <span className="text-amber-500 font-semibold italic text-sm">
                {municipality.tagline}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {municipality.name}
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              {municipality.description}
            </p>

            <div className="flex items-center space-x-8 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100 inline-flex">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-ocean mb-1">
                  {municipality.touristSpots.length}
                </span>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Tourist Spots
                </span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-olive mb-1">
                  Active
                </span>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Tour Status
                </span>
              </div>
            </div>

            <div>
              <Button
                size="lg"
                onClick={() => onExplore(municipality.name)}
                className="group px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all">

                Explore Tours in {municipality.name}
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tourist Spots Grid */}
        <div className="bg-gray-50/50 rounded-3xl p-8 lg:p-10 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <MapPinIcon className="w-6 h-6 mr-3 text-ocean" />
              Top Spots in {municipality.name}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {municipality.touristSpots.map((spot, idx) =>
            <Card
              key={idx}
              className="overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-100">

                <div className="h-48 relative overflow-hidden group">
                  <ImagePlaceholder height="h-full" text={spot.name} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-4 right-4">
                    <Badge
                    variant="olive"
                    className="bg-white/95 text-olive backdrop-blur-sm shadow-sm font-bold">

                      {spot.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow bg-white">
                  <h4 className="font-bold text-lg text-gray-900 mb-3 line-clamp-1">
                    {spot.name}
                  </h4>
                  <p className="text-sm text-gray-600 flex-grow leading-relaxed line-clamp-3">
                    {spot.description}
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>);

}