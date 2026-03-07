import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  MapPinIcon } from
'lucide-react';
export function Footer() {
  const municipalities = [
  'Asuncion',
  'Carmen',
  'Kapalong',
  'New Corella',
  'Panabo City',
  'Samal Island',
  'Santo Tomas',
  'Tagum City',
  'Talaingod'];

  return (
    <footer className="bg-[#3A352F] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-amber-500">Tribal</span>
              <span className="text-3xl font-bold text-white">Tours</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Connecting travelers with local guides to discover the hidden gems
              and rich culture of Davao del Norte.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">

                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">

                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors">

                <TwitterIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Municipalities */}
          <div className="lg:col-span-2">
            <h3 className="text-amber-500 font-semibold text-lg mb-4">
              Covering all 9 municipalities of Davao del Norte
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
              {municipalities.map((municipality) =>
              <div
                key={municipality}
                className="flex items-center text-gray-300 text-sm">

                  <MapPinIcon className="w-3.5 h-3.5 text-olive mr-2 flex-shrink-0" />
                  <span>{municipality}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2026 TribalTours. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}