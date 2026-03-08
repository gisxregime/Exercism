import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, ArrowRightIcon } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { GuideCard } from '../components/GuideCard';
import { RoleSelector } from '../components/RoleSelector';
import { TribalPattern } from '../components/TribalPattern';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { mockGuides } from '../data/mockData';
import { municipalitiesData } from '../data/municipalityData';
export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <HeroSection />

      {/* Explore Davao del Norte - Municipality Overview */}
      <section className="py-20 bg-cream px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-ocean mb-3">
              Explore Davao del Norte
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover the unique beauty of each municipality — from pristine
              islands to indigenous highlands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {municipalitiesData.slice(0, 9).map((municipality) =>
            <Card
              key={municipality.id}
              hoverable
              className="flex flex-col h-full overflow-hidden">

                <div className="relative h-44">
                  <ImagePlaceholder height="h-full" text={municipality.image} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">
                      {municipality.name}
                    </h3>
                    <p className="text-amber-400 text-sm font-medium italic">
                      {municipality.tagline}
                    </p>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                    {municipality.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500 flex items-center">
                      <MapPinIcon className="w-3.5 h-3.5 mr-1 text-olive" />
                      {municipality.touristSpots.length} tourist spots
                    </span>
                    <Link
                    to={`/tours?location=${encodeURIComponent(municipality.name)}`}>

                      {/* <Button
                      size="sm"
                      variant="outline"
                      className="group text-ocean border-ocean hover:bg-ocean/5">

                        Explore
                        <ArrowRightIcon className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button> */}
                    </Link>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/tours">
              <Button size="lg" className="px-8">
                View All Tours
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <TribalPattern opacity={0.15} className="bg-white" />

      {/* Meet Our Giyas Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <h2 className="text-4xl font-bold text-ocean mb-2">
                Meet Our Giyas
              </h2>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-ocean opacity-20"></div>
            </div>
            <p className="text-gray-600 mt-4">
              Locals who know every trail, tale, and taste of their hometowns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {mockGuides.slice(0, 6).map((guide) =>
            <GuideCard key={guide.id} guide={guide} />
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/guides">
              <Button
                variant="outline"
                className="px-8 py-3 border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-amber-700 font-semibold rounded-md">

                View All Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <TribalPattern opacity={0.15} className="bg-gray-50" />

      <RoleSelector />

      <TribalPattern opacity={0.2} className="bg-[#3A352F]" />
    </div>);

}