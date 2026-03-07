import React, { memo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  StarIcon,
  MessageSquareIcon,
  CalendarIcon,
  CheckCircleIcon } from
'lucide-react';
import { mockListings, mockGuides } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { RatingStars } from '../components/RatingStars';
export function TourDetailPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const listing = mockListings.find((l) => l.id === id);
  const guide = listing ?
  mockGuides.find((g) => g.id === listing.guideId) :
  null;
  if (!listing || !guide) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Tour Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The tour you are looking for does not exist or is no longer available.
        </p>
        <Link to="/tours">
          <Button>Browse All Tours</Button>
        </Link>
      </div>);

  }
  const highlights = [
  'Local expert guide',
  'Small group experience',
  'Authentic cultural immersion',
  'Flexible scheduling'];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/tours"
          className="inline-flex items-center text-ocean hover:underline mb-6 font-medium">

          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Tours
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden">
              <ImagePlaceholder height="h-80 md:h-96" text={listing.title} />
              <div className="absolute top-4 left-4">
                <Badge
                  variant="ocean"
                  className="text-sm px-4 py-1.5 shadow-lg">

                  {listing.category}
                </Badge>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ImagePlaceholder
                height="h-24 md:h-32"
                text="Gallery 1"
                className="rounded-lg" />

              <ImagePlaceholder
                height="h-24 md:h-32"
                text="Gallery 2"
                className="rounded-lg" />

              <ImagePlaceholder
                height="h-24 md:h-32"
                text="Gallery 3"
                className="rounded-lg" />

              <ImagePlaceholder
                height="h-24 md:h-32"
                text="Gallery 4"
                className="rounded-lg" />

            </div>

            {/* Title & Quick Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {listing.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-1.5 text-olive" />
                  {listing.location}
                </span>
                <span className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-1.5 text-olive" />
                  {listing.duration}
                </span>
                <span className="flex items-center">
                  <UsersIcon className="w-5 h-5 mr-1.5 text-olive" />
                  Max {listing.maxGroupSize} guests
                </span>
              </div>
            </div>

            {/* Description */}
            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About This Tour
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {listing.description}
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Join us for an unforgettable journey through the heart of{' '}
                {listing.location}. This carefully curated experience combines
                adventure, culture, and authentic local connections. Your Giya
                will share stories, traditions, and hidden spots that only
                locals know about.
              </p>
            </Card>

            {/* Highlights */}
            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Tour Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((highlight, index) =>
                <div key={index} className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-olive mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Guide Info */}
            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Meet Your Giya
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-olive text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  {guide.name.charAt(0)}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900">
                    {guide.name}
                  </h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    Local Expert in {guide.location}
                  </p>
                  <div className="flex items-center mt-2">
                    <RatingStars rating={guide.rating} size="sm" />
                    <span className="ml-2 text-sm text-gray-600">
                      {guide.rating.toFixed(1)} ({guide.reviewCount} reviews)
                    </span>
                  </div>
                  <p className="text-gray-700 mt-3">{guide.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {guide.specialties.map((specialty) =>
                    <Badge key={specialty} variant="gray" className="text-xs">
                        {specialty}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={() => navigate('/messages')}
                  className="w-full sm:w-auto">

                  <MessageSquareIcon className="w-4 h-4 mr-2" />
                  Message {guide.name.split(' ')[0]}
                </Button>
              </div>
            </Card>

            {/* What to Bring */}
            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                What to Bring
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-olive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Comfortable walking shoes
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-olive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Sunscreen and hat
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-olive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Water bottle
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-olive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Camera for capturing memories
                </li>
              </ul>
            </Card>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 overflow-hidden shadow-lg">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-3xl font-bold text-ocean">
                    ₱{listing.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500">per person</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <StarIcon className="w-4 h-4 text-amber-500 fill-current mr-1" />
                  <span className="font-medium">{guide.rating.toFixed(1)}</span>
                  <span className="mx-1">·</span>
                  <span>{guide.reviewCount} reviews</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center text-sm">
                    <ClockIcon className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">Duration:</span>
                    <span className="ml-auto font-medium text-gray-900">
                      {listing.duration}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <UsersIcon className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">Group size:</span>
                    <span className="ml-auto font-medium text-gray-900">
                      Up to {listing.maxGroupSize}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPinIcon className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-auto font-medium text-gray-900">
                      {listing.location}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">Availability:</span>
                    <span className="ml-auto font-medium text-green-600">
                      Available
                    </span>
                  </div>
                </div>

                <Button
                  fullWidth
                  size="lg"
                  className="py-4 text-lg"
                  onClick={() => navigate(`/booking/${listing.id}`)}>

                  Book Now
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/messages')}>

                  <MessageSquareIcon className="w-4 h-4 mr-2" />
                  Message Guide
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Free cancellation up to 48 hours before the tour
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>);

}