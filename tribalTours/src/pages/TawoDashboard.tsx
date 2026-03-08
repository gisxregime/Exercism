import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  HomeIcon,
  CalendarIcon,
  MessageSquareIcon,
  UserIcon,
  SettingsIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon } from
'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useBookings } from '../hooks/useBookings';
import { mockListings, mockGuides } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { ChatWindow } from '../components/ChatWindow';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
export function TawoDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const { bookings, cancelBooking, markTourDone, getBookingsByVisitor } =
  useBookings();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeBookingTab, setActiveBookingTab] = useState('active');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Handle tab from URL query param
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const validTabs = [
    'overview',
    'bookings',
    'messages',
    'profile',
    'settings'];

    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'tawo') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);
  if (!user) return null;
  const userBookings = getBookingsByVisitor(user.id);
  const activeBookings = userBookings.filter((b) =>
  ['pending', 'confirmed', 'active'].includes(b.status)
  );
  const completedBookings = userBookings.filter((b) => b.status === 'completed');
  const cancelledBookings = userBookings.filter((b) => b.status === 'cancelled');
  const totalSpent = completedBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const getListingDetails = (listingId: string) =>
  mockListings.find((l) => l.id === listingId);
  const getGuideDetails = (guideId: string) =>
  mockGuides.find((g) => g.id === guideId);
  const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    icon: HomeIcon
  },
  {
    id: 'bookings',
    label: 'My Bookings',
    icon: CalendarIcon
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: MessageSquareIcon
  },
  {
    id: 'profile',
    label: 'My Profile',
    icon: UserIcon
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsIcon
  }];

  const renderOverview = () =>
  <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-ocean text-white rounded-xl p-8 relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <h2 className="text-3xl font-bold mb-2 relative z-10">
          Welcome back, {user.name.split(' ')[0]}!
        </h2>
        <p className="text-ocean-100 relative z-10">
          Ready for your next adventure in Davao del Norte?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Upcoming Tours
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {activeBookings.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-olive">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Completed Tours
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {completedBookings.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-olive/20 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-olive" />
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-ocean">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Spent</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                ₱{totalSpent.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-ocean/10 rounded-full flex items-center justify-center">
              <StarIcon className="w-6 h-6 text-ocean" />
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
          <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveTab('bookings')}>

            View All
          </Button>
        </div>

        {activeBookings.length > 0 ?
      <div className="space-y-4">
            {activeBookings.slice(0, 3).map((booking) => {
          const listing = getListingDetails(booking.listingId);
          const guide = getGuideDetails(booking.guideId);
          if (!listing || !guide) return null;
          return (
            <Card
              key={booking.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:border-ocean transition-colors">

                  <div className="flex items-center mb-4 sm:mb-0">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                      <ImagePlaceholder height="h-full" text="Tour" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {listing.title}
                      </h4>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {new Date(booking.date).toLocaleDateString()} • with{' '}
                        {guide.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                    <Badge
                  variant={
                  booking.status === 'confirmed' ? 'success' : 'amber'
                  }>

                      {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
                    </Badge>
                    <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('bookings')}>

                      Details
                    </Button>
                  </div>
                </Card>);

        })}
          </div> :

      <Card className="p-8 text-center border-dashed border-2">
            <MapPinIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="font-medium text-gray-900 mb-1">
              No upcoming tours
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              You don't have any tours booked yet.
            </p>
            <Link to="/explore">
              <Button>Explore Tours</Button>
            </Link>
          </Card>
      }
      </div>
    </div>;

  const renderBookings = () =>
  <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>

      <div className="flex border-b border-gray-200 mb-6">
        <button
        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeBookingTab === 'active' ? 'border-ocean text-ocean' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveBookingTab('active')}>

          Active ({activeBookings.length})
        </button>
        <button
        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeBookingTab === 'completed' ? 'border-ocean text-ocean' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveBookingTab('completed')}>

          Completed ({completedBookings.length})
        </button>
        <button
        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeBookingTab === 'cancelled' ? 'border-ocean text-ocean' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveBookingTab('cancelled')}>

          Cancelled ({cancelledBookings.length})
        </button>
      </div>

      <div className="space-y-6">
        {activeBookingTab === 'active' && (
      activeBookings.length > 0 ?
      activeBookings.map((booking) => {
        const listing = getListingDetails(booking.listingId);
        const guide = getGuideDetails(booking.guideId);
        if (!listing || !guide) return null;
        return (
          <Card key={booking.id} className="overflow-hidden">
                  <div className="p-6 flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <ImagePlaceholder height="h-full" text="Tour Image" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {listing.title}
                        </h3>
                        <Badge
                    variant={
                    booking.status === 'confirmed' ? 'success' : 'amber'
                    }>

                          {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2 text-olive" />{' '}
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-2 text-olive" />{' '}
                          {listing.duration}
                        </div>
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 mr-2 text-olive" />{' '}
                          {booking.groupSize} pax
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-2 text-olive" />{' '}
                          {listing.location}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold mr-2">
                            {guide.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {guide.name}
                          </span>
                        </div>
                        <div className="font-bold text-ocean">
                          ₱{booking.totalPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-end space-x-3">
                    <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  if (
                  window.confirm(
                    'Are you sure you want to cancel this booking?'
                  ))
                  {
                    cancelBooking(booking.id);
                  }
                }}>

                      Cancel Booking
                    </Button>
                    <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('messages')}>

                      Message Giya
                    </Button>
                    {booking.status === 'confirmed' &&
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => markTourDone(booking.id)}>

                        Tour Done ✓
                      </Button>
              }
                  </div>
                </Card>);

      }) :

      <div className="text-center py-12 text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No active bookings found.</p>
            </div>)
      }

        {activeBookingTab === 'completed' && (
      completedBookings.length > 0 ?
      completedBookings.map((booking) => {
        const listing = getListingDetails(booking.listingId);
        const guide = getGuideDetails(booking.guideId);
        if (!listing || !guide) return null;
        // Check if rated (mock logic - assume first completed is rated)
        const isRated = booking.id === 'b3';
        return (
          <Card key={booking.id} className="overflow-hidden opacity-90">
                  <div className="p-6 flex flex-col md:flex-row">
                    <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 mb-4 md:mb-0 md:mr-6 grayscale">
                      <ImagePlaceholder height="h-full" text="Tour" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {listing.title}
                        </h3>
                        <Badge variant="gray">Completed</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {new Date(booking.date).toLocaleDateString()} •{' '}
                        {booking.groupSize} pax • ₱
                        {booking.totalPrice.toLocaleString()}
                      </p>

                      <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Guided by {guide.name}
                        </span>

                        {!isRated ?
                  <Link to={`/rate/${booking.id}`}>
                            <Button
                      size="sm"
                      className="bg-amber-500 hover:bg-amber-600 text-white border-none shadow-md">

                              Rate Your Experience ★
                            </Button>
                          </Link> :

                  <div className="flex items-center text-amber-500 text-sm font-medium">
                            Rated{' '}
                            <StarIcon className="w-4 h-4 ml-1 fill-current" />
                            <StarIcon className="w-4 h-4 fill-current" />
                            <StarIcon className="w-4 h-4 fill-current" />
                            <StarIcon className="w-4 h-4 fill-current" />
                            <StarIcon className="w-4 h-4 fill-current" />
                          </div>
                  }
                      </div>
                    </div>
                  </div>
                </Card>);

      }) :

      <div className="text-center py-12 text-gray-500">
              <CheckCircleIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No completed tours yet.</p>
            </div>)
      }

        {activeBookingTab === 'cancelled' && (
      cancelledBookings.length > 0 ?
      cancelledBookings.map((booking) => {
        const listing = getListingDetails(booking.listingId);
        if (!listing) return null;
        return (
          <Card key={booking.id} className="p-6 opacity-75">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 line-through">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Originally scheduled for{' '}
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="danger">Cancelled</Badge>
                  </div>
                </Card>);

      }) :

      <div className="text-center py-12 text-gray-500">
              <XCircleIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No cancelled bookings.</p>
            </div>)
      }
      </div>
    </div>;

  const renderMessages = () =>
  <div className="animate-in fade-in duration-300 h-[calc(100vh-200px)] min-h-[600px]">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
      <ChatWindow currentUserId={user.id} />
    </div>;

  const renderProfile = () =>
  <div className="max-w-3xl animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>

      <Card className="p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 pb-8 border-b border-gray-100">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 sm:mb-0 sm:mr-8 relative group cursor-pointer">
            <ImagePlaceholder height="h-full" text="Avatar" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-medium">Change</span>
            </div>
          </div>
          <div className="flex-grow text-center sm:text-left">
            <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-500 capitalize mb-2">{user.role} Member</p>
            <Badge variant="ocean">
              Member since {new Date(user.createdAt).getFullYear()}
            </Badge>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" defaultValue={user.name} />
            <Input
            label="Email Address"
            defaultValue={user.email}
            disabled
            helperText="Contact support to change email" />

            <Input
            label="Phone Number"
            defaultValue={user.phone || ''}
            placeholder="+63 900 000 0000" />

            <Input
            label="Location"
            defaultValue={user.location || ''}
            placeholder="City, Province" />

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio / About Me
            </label>
            <textarea
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-ocean focus:ring-ocean px-4 py-2 border"
            rows={4}
            defaultValue={user.bio || ''}
            placeholder="Tell guides a bit about yourself and what you like to explore...">
          </textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="button">Save Changes</Button>
          </div>
        </form>
      </Card>
    </div>;

  const renderSettings = () =>
  <div className="max-w-3xl animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Account Settings
      </h2>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive booking updates via email
                </p>
              </div>
              <input
              type="checkbox"
              className="w-5 h-5 text-ocean rounded focus:ring-ocean"
              defaultChecked />

            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">SMS Alerts</p>
                <p className="text-sm text-gray-500">
                  Receive text messages for important updates
                </p>
              </div>
              <input
              type="checkbox"
              className="w-5 h-5 text-ocean rounded focus:ring-ocean" />

            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
            Security
          </h3>
          <div className="space-y-4">
            <Button variant="outline">Change Password</Button>
          </div>
        </Card>

        <Card className="p-6 border-red-200 bg-red-50">
          <h3 className="text-lg font-bold text-red-800 mb-2">Danger Zone</h3>
          <p className="text-sm text-red-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button variant="danger">Delete Account</Button>
        </Card>
      </div>
    </div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-16 z-20">
        <span className="font-bold text-gray-900">Dashboard Menu</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>

          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 md:min-h-[calc(100vh-64px)] md:sticky md:top-16 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>

        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-olive text-white flex items-center justify-center font-bold text-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-gray-900 line-clamp-1">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-ocean/10 text-ocean' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>

                  <Icon
                    className={`w-5 h-5 mr-3 ${isActive ? 'text-ocean' : 'text-gray-400'}`} />

                  {tab.label}
                </button>);

            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 md:p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'messages' && renderMessages()}
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>);

}