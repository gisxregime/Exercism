import React from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, MapIcon, ArrowRightIcon } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
export function RoleSelector() {
  return (
    <div className="py-20 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-ocean mb-4">Begin Your Story</h2>
        <p className="text-xl text-gray-600">
          Are you a <span className="text-amber-600 font-semibold">Tawo</span>{' '}
          seeking adventure, or a{' '}
          <span className="text-olive font-semibold">Giya</span> ready to share
          your home?
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tawo Card */}
        <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <div className="h-48 bg-cream relative flex items-center justify-center border-b border-gray-100">
            {/* Background pattern placeholder */}
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjBMMjAgMEw0MCAyMEwyMCA0MEwwIDIwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjU5RTBCIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]"></div>

            <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-amber-500">
              <UserIcon className="w-10 h-10 text-amber-500" />
            </div>
          </div>
          <div className="p-8 text-center flex-grow flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              I am a Tawo (Tourist)
            </h3>
            <p className="text-gray-600 mb-8 flex-grow">
              I want to discover hidden gems, taste authentic flavors, and hear
              the stories of Davao del Norte from locals who know it best.
            </p>
            <Link to="/explore" className="w-full">
              <Button
                fullWidth
                className="bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg group">

                Start Exploring
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Giya Card */}
        <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <div className="h-48 bg-ocean/10 relative flex items-center justify-center border-b border-gray-100">
            {/* Background pattern placeholder */}
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjBMMjAgMEw0MCAyMEwyMCA0MEwwIDIwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNEE3QzU5IiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]"></div>

            <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-olive">
              <MapIcon className="w-10 h-10 text-olive" />
            </div>
          </div>
          <div className="p-8 text-center flex-grow flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              I am a Giya (Guide)
            </h3>
            <p className="text-gray-600 mb-8 flex-grow">
              I want to share my hometown's beauty, culture, and stories with
              travelers while earning a sustainable livelihood.
            </p>
            <Link to="/signup?role=giya" className="w-full">
              <Button
                variant="secondary"
                fullWidth
                className="py-3 text-lg group">

                Become a Giya
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>);

}