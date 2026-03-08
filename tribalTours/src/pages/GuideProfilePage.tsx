import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPinIcon,
  MessageSquareIcon,
  CalendarIcon,
  StarIcon,
  CheckCircleIcon } from
'lucide-react';
import { mockGuides, mockListings } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { RatingStars } from '../components/RatingStars';
import { TourListingCard } from '../components/TourListingCard';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
export function GuideProfilePage() {
  const { id } = useParams<{
    id: string;
  }>();
  // For demo, just use the first guide if ID not found
  const guide = mockGuides.find((g) => g.id === id) || mockGuides[0];
  const guideListings = mockListings.filter((l) => l.guideId === guide.id);
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Banner */}
      <div className="relative h-64 md:h-80 bg-gray-200">
        <ImagePlaceholder height="h-full" text="Guide Background Image" />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              {/* Profile Picture */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-md overflow-hidden bg-white flex-shrink-0 -mt-20 sm:-mt-24 relative z-20">
                <ImagePlaceholder height="h-full" text="Profile" />
              </div>

              <div className="mt-4 sm:mt-0 flex-grow">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                      {guide.name}
                      {guide.isApproved &&
                      <CheckCircleIcon
                        className="w-6 h-6 text-blue-500 ml-2"
                        title="Verified Guide" />

                      }
                    </h1>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPinIcon className="w-4 h-4 mr-1 text-olive" />
                      {guide.location}
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 flex space-x-3">
                    <Link to="/messages">
                      <Button variant="outline" className="flex items-center">
                        <MessageSquareIcon className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-md">
                    <span className="text-lg font-bold text-amber-700 mr-1">
                      {guide.rating}
                    </span>
                    <RatingStars rating={guide.rating} size="sm" />
                    <span className="text-sm text-amber-700 ml-2">
                      ({guide.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Joined {new Date(guide.createdAt).getFullYear()}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: About */}
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    About Me
                  </h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {guide.bio}
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Specialties
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {guide.specialties.map((specialty) =>
                    <Badge
                      key={specialty}
                      variant="olive"
                      className="px-3 py-1 text-sm">

                        {specialty}
                      </Badge>
                    )}
                  </div>
                </section>
              </div>

              {/* Right Column: Stats/Info */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 h-fit">
                <h3 className="font-bold text-gray-900 mb-4">
                  Guide Information
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-500">Response Rate</span>
                    <span className="font-medium text-gray-900">98%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Tours Completed</span>
                    <span className="font-medium text-gray-900">42</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Languages</span>
                    <span className="font-medium text-gray-900">
                      English, Tagalog, Bisaya
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tours Section */}
        <div className="mt-12 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Tours by {guide.name.split(' ')[0]}
          </h2>

          {guideListings.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guideListings.map((listing) =>
            <TourListingCard key={listing.id} listing={listing} hideGuide />
            )}
            </div> :

          <div className="bg-white p-8 rounded-xl text-center border border-gray-200">
              <p className="text-gray-500">
                This guide hasn't published any tours yet.
              </p>
            </div>
          }
        </div>

        {/* Reviews Section Placeholder */}
        <div className="mt-12 mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Reviews ({guide.reviewCount})
          </h2>
          <div className="bg-white p-8 rounded-xl border border-gray-200 space-y-6">
            {/* Sample Review */}
            <div className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                    JD
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">March 2026</p>
                  </div>
                </div>
                <RatingStars rating={5} size="sm" />
              </div>
              <p className="text-gray-600 text-sm mt-3">
                Amazing experience! {guide.name.split(' ')[0]} was incredibly
                knowledgeable and made our trip unforgettable. Highly
                recommended!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

}