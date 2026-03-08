import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  SearchIcon,
  CalendarIcon,
  HeartIcon,
  MapPinIcon,
  UsersIcon,
  MapIcon,
  StarIcon } from
'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { TribalPattern } from '../components/TribalPattern';
export function AboutPage() {
  const municipalities = [
  {
    name: 'Tagum City',
    desc: 'City of Palms and Festivals'
  },
  {
    name: 'Panabo City',
    desc: 'Banana Capital of the World'
  },
  {
    name: 'Samal Island',
    desc: 'Island Garden City'
  },
  {
    name: 'Kapalong',
    desc: 'Caving Capital of Mindanao'
  },
  {
    name: 'New Corella',
    desc: 'Waterfalls Capital of Davao del Norte'
  },
  {
    name: 'Talaingod',
    desc: 'Home of the Ata-Manobo Tribe'
  },
  {
    name: 'Carmen',
    desc: 'Historical and Cultural Hub'
  },
  {
    name: 'Asuncion',
    desc: 'Agricultural Heartland'
  },
  {
    name: 'Santo Tomas',
    desc: 'Agri-Industrial Center'
  }];

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Hero Section */}
      <div className="relative bg-[#3A352F] text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <TribalPattern opacity={1} className="h-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-amber-500">Laag</span>Ta
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
            Connecting travelers with authentic local experiences while
            empowering communities in Davao del Norte.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-ocean mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            "LaagTa" comes from the Visayan phrase meaning "Let's
            travel/wander." We believe that the best way to experience a place
            is through the eyes of the people who call it home. Our platform
            connects curious travelers (Tawo) with passionate local guides
            (Giya) to create sustainable, authentic tourism experiences that
            benefit local communities directly.
          </p>
        </div>
      </section>

      <TribalPattern opacity={0.15} className="bg-gray-50" />

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to your next great adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-ocean/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchIcon className="w-10 h-10 text-ocean" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                1. Find a Giya
              </h3>
              <p className="text-gray-600">
                Browse our directory of verified local guides based on your
                preferred location and activities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-olive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CalendarIcon className="w-10 h-10 text-olive" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2. Book a Tour
              </h3>
              <p className="text-gray-600">
                Select a tour listing, choose your date, and securely book your
                experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3. Experience Culture
              </h3>
              <p className="text-gray-600">
                Meet your Giya, explore hidden gems, and create lasting memories
                while supporting locals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Explanation */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-10 border-t-4 border-t-amber-500">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <UsersIcon className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              What is a Tawo?
            </h3>
            <p className="text-gray-600 mb-6">
              "Tawo" means person or human in Visayan. On LaagTa, a Tawo is a
              traveler, tourist, or explorer seeking authentic experiences. As a
              Tawo, you get to discover the real Davao del Norte beyond the
              usual tourist traps, guided by locals who know the stories behind
              every trail and taste.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" />{' '}
                Discover hidden gems
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" />{' '}
                Support local livelihoods
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" />{' '}
                Learn authentic culture
              </li>
            </ul>
          </Card>

          <Card className="p-10 border-t-4 border-t-olive">
            <div className="w-16 h-16 bg-olive/10 rounded-full flex items-center justify-center mb-6">
              <MapIcon className="w-8 h-8 text-olive" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              What is a Giya?
            </h3>
            <p className="text-gray-600 mb-6">
              "Giya" means guide in Visayan. A Giya is a passionate local who
              wants to share the beauty of their hometown. They aren't just tour
              guides; they are storytellers, cultural ambassadors, and hosts.
              LaagTa empowers Giyas to earn a sustainable income by doing what
              they love.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-olive mr-2 flex-shrink-0" />{' '}
                Share your hometown's beauty
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-olive mr-2 flex-shrink-0" />{' '}
                Earn sustainable income
              </li>
              <li className="flex items-start">
                <StarIcon className="w-5 h-5 text-olive mr-2 flex-shrink-0" />{' '}
                Preserve local heritage
              </li>
            </ul>
          </Card>
        </div>
      </section>

      <TribalPattern opacity={0.1} className="bg-cream" />

      {/* Coverage Area */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-ocean mb-4">
              Our Coverage Area
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We proudly cover all 9 municipalities of Davao del Norte, each
              offering unique adventures and cultural experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {municipalities.map((mun) =>
            <div
              key={mun.name}
              className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 hover:border-amber-300 transition-colors">

                <div className="flex items-start">
                  <MapPinIcon className="w-6 h-6 text-olive mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {mun.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{mun.desc}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-ocean text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <TribalPattern opacity={1} className="h-full" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to begin your story?
          </h2>
          <p className="text-xl text-ocean-100 mb-10">
            Join thousands of travelers and local guides creating meaningful
            connections in Davao del Norte.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/explore">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-ocean hover:bg-gray-100 px-8 py-4 text-lg font-bold">

                Find a Tour
              </Button>
            </Link>
            <Link to="/signup?role=giya">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-olive text-white hover:bg-olive/90 px-8 py-4 text-lg font-bold border-none">

                Become a Giya
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>);

}