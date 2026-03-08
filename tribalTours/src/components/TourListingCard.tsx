import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, ClockIcon, UsersIcon, ArrowRightIcon } from 'lucide-react';
import { TourListing } from '../types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { ImagePlaceholder } from './ImagePlaceholder';
interface TourListingCardProps {
  listing: TourListing;
  hideGuide?: boolean;
}
export function TourListingCard({
  listing,
  hideGuide = false
}: TourListingCardProps) {
  return (
    <Card hoverable className="flex flex-col h-full">
      <Link to={`/tour/${listing.id}`} className="block">
        <div className="relative">
          <ImagePlaceholder height="h-48" text="Click to add tour photo" />
          <div className="absolute top-4 right-4">
            <Badge variant={listing.isActive ? 'success' : 'gray'}>
              {listing.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
            <Badge variant="ocean" className="mb-2">
              {listing.category}
            </Badge>
            <h3 className="text-white text-lg font-bold line-clamp-1">
              {listing.title}
            </h3>
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPinIcon className="w-4 h-4 mr-1 text-olive" />
          {listing.location}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
          {listing.description}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-1.5 text-gray-400" />
            {listing.duration}
          </div>
          <div className="flex items-center">
            <UsersIcon className="w-4 h-4 mr-1.5 text-gray-400" />
            Max {listing.maxGroupSize} pax
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
          <div>
            <span className="text-xs text-gray-500 block">Price</span>
            <span className="text-lg font-bold text-ocean">
              ₱{listing.price.toLocaleString()}
            </span>
          </div>
          <Link to={`/tour/${listing.id}`}>
            <Button size="sm" className="group">
              View Details
              <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>);

}