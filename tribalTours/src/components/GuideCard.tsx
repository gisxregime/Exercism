import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, StarIcon, ArrowRightIcon } from 'lucide-react';
import { Guide } from '../types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { ImagePlaceholder } from './ImagePlaceholder';
interface GuideCardProps {
  guide: Guide;
}
export function GuideCard({ guide }: GuideCardProps) {
  // Extract a greeting from bio if exists (simulating the screenshot's yellow text)
  const greetingMatch = guide.bio?.match(/^([^.!]+[.!]?)/);
  const greeting = greetingMatch ?
  greetingMatch[1] :
  `Hello! I am ${guide.name.split(' ')[0]}`;
  return (
    <Card hoverable className="flex flex-col h-full">
      <div className="relative">
        {/* Image Placeholder */}
        <ImagePlaceholder height="h-64" text="Click to add guide photo" />

        {/* Overlay content on image */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-amber-400 text-sm italic mb-1">{greeting}</p>
          <h3 className="text-white text-xl font-bold">{guide.name}</h3>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPinIcon className="w-4 h-4 mr-1 text-olive" />
            {guide.location}
          </div>
          <div className="flex items-center bg-amber-50 px-2 py-1 rounded text-sm font-medium text-amber-700">
            <StarIcon className="w-4 h-4 mr-1 fill-current" />
            {guide.rating}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 flex-grow">
          {guide.specialties.slice(0, 2).map((specialty) =>
          <Badge key={specialty} variant="ocean">
              {specialty}
            </Badge>
          )}
          {guide.specialties.length > 2 &&
          <Badge variant="gray">+{guide.specialties.length - 2}</Badge>
          }
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
          <span className="text-sm text-gray-500">
            {guide.reviewCount} reviews
          </span>
          <Link
            to={`/guide/${guide.id}`}
            className="text-sm font-medium text-ocean hover:text-ocean/80 flex items-center group">

            View Profile
            <ArrowRightIcon className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </Card>);

}