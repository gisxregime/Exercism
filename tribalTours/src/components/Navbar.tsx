import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MessageSquareIcon,
  MenuIcon,
  XIcon,
  LogOutIcon,
  UserIcon,
  LayoutDashboardIcon } from
'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';
import { NotificationBar } from './NotificationBar';
export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Guides',
    path: '/guides'
  },
  {
    name: 'Tours',
    path: '/tours'
  },
  {
    name: 'Explore',
    path: '/explore'
  },
  {
    name: 'About',
    path: '/about'
  }];

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin-dashboard';
    if (user.role === 'giya') return '/giya-dashboard';
    return '/tawo-dashboard';
  };
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-cream py-4'}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-bold text-ocean">Tribal</span>
            <span className="text-3xl font-bold text-olive">Tours</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-ocean ${location.pathname === link.path ? 'text-ocean font-semibold' : 'text-gray-600'}`}>

                {link.name}
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ?
            <>
                <NotificationBar />
                <Link
                to="/messages"
                className="text-gray-500 hover:text-ocean p-2">

                  <MessageSquareIcon className="w-5 h-5" />
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                  onClick={() =>
                  setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 focus:outline-none">

                    <div className="w-8 h-8 rounded-full bg-olive text-white flex items-center justify-center font-bold text-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  </button>

                  {isProfileDropdownOpen &&
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {user?.role}
                        </p>
                      </div>
                      <Link
                    to={getDashboardLink()}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsProfileDropdownOpen(false)}>

                        <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                    to={`${getDashboardLink()}?tab=profile`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsProfileDropdownOpen(false)}>

                        <UserIcon className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <button
                    onClick={() => {
                      logout();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">

                        <LogOutIcon className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                }
                </div>
              </> :

            <>
                <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-ocean">

                  Login
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            }
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-ocean focus:outline-none">

              {isMobileMenuOpen ?
              <XIcon className="w-6 h-6" /> :

              <MenuIcon className="w-6 h-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen &&
      <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) =>
          <Link
            key={link.name}
            to={link.path}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-ocean hover:bg-gray-50"
            onClick={() => setIsMobileMenuOpen(false)}>

                {link.name}
              </Link>
          )}

            {isAuthenticated ?
          <>
                <div className="border-t border-gray-100 pt-4 pb-2">
                  <div className="flex items-center px-5">
                    <div className="w-10 h-10 rounded-full bg-olive text-white flex items-center justify-center font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user?.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500 capitalize">
                        {user?.role}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Link
                  to={getDashboardLink()}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-ocean hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}>

                      Dashboard
                    </Link>
                    <Link
                  to={`${getDashboardLink()}?tab=profile`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-ocean hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}>

                      Profile
                    </Link>
                    <Link
                  to="/messages"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-ocean hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}>

                      Messages
                    </Link>
                    <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">

                      Logout
                    </button>
                  </div>
                </div>
              </> :

          <div className="border-t border-gray-100 pt-4 pb-2 px-5 flex flex-col space-y-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth>
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth>
                    Sign Up
                  </Button>
                </Link>
              </div>
          }
          </div>
        </div>
      }
    </nav>);

}