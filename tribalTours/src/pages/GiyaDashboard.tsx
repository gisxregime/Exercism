import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  HomeIcon,
  ListIcon,
  CalendarIcon,
  StarIcon,
  MessageSquareIcon,
  UserIcon,
  SettingsIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  ClockIcon,
  MapPinIcon,
  UploadIcon,
  CameraIcon,
  CheckCircleIcon } from
'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useBookings } from '../hooks/useBookings';
import { mockListings, mockGuides, mockRatings } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { ChatWindow } from '../components/ChatWindow';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { RatingStars } from '../components/RatingStars';
export function GiyaDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { bookings, updateBookingStatus, getBookingsByGuide } = useBookings();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeBookingTab, setActiveBookingTab] = useState('pending');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // Handle tab from URL query param
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const validTabs = [
    'overview',
    'listings',
    'bookings',
    'reviews',
    'messages',
    'profile',
    'settings'];

    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'giya') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);
  if (!user) return null;
  // Mock guide data
  const guideData = mockGuides.find((g) => g.id === user.id) || mockGuides[0]; // Fallback for demo
  const isPending = guideData.applicationStatus === 'pending';
  const guideListings = mockListings.filter((l) => l.guideId === guideData.id);
  const guideBookings = getBookingsByGuide(guideData.id);
  const guideRatings = mockRatings.filter((r) => r.guideId === guideData.id);
  const pendingBookings = guideBookings.filter((b) => b.status === 'pending');
  const confirmedBookings = guideBookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'active'
  );
  const completedBookings = guideBookings.filter(
    (b) => b.status === 'completed'
  );
  const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    icon: HomeIcon
  },
  {
    id: 'listings',
    label: 'My Listings',
    icon: ListIcon
  },
  {
    id: 'bookings',
    label: 'Bookings',
    icon: CalendarIcon
  },
  {
    id: 'reviews',
    label: 'Reviews',
    icon: StarIcon
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
      {isPending &&
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md flex items-start shadow-sm">
          <ClockIcon className="w-5 h-5 text-amber-500 mr-3 mt-0.5" />
          <div>
            <h3 className="text-amber-800 font-bold">
              Application Under Review
            </h3>
            <p className="text-amber-700 text-sm mt-1">
              Your guide application is currently being reviewed by an admin.
              You can set up your profile and draft listings while waiting, but
              they won't be visible to tourists until approved.
            </p>
          </div>
        </div>
    }

      <div className="bg-olive text-white rounded-xl p-8 relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <h2 className="text-3xl font-bold mb-2 relative z-10">
          Maayong adlaw, {user.name.split(' ')[0]}!
        </h2>
        <p className="text-olive-100 relative z-10">
          Here's what's happening with your tours today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-t-4 border-t-ocean">
          <p className="text-sm text-gray-500 font-medium mb-1">
            Active Listings
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {guideListings.length}
          </p>
        </Card>
        <Card className="p-6 border-t-4 border-t-olive">
          <p className="text-sm text-gray-500 font-medium mb-1">
            Total Bookings
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {guideBookings.length}
          </p>
        </Card>
        <Card className="p-6 border-t-4 border-t-amber-500">
          <p className="text-sm text-gray-500 font-medium mb-1">
            Pending Requests
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {pendingBookings.length}
          </p>
        </Card>
        <Card className="p-6 border-t-4 border-t-yellow-400">
          <p className="text-sm text-gray-500 font-medium mb-1">
            Average Rating
          </p>
          <div className="flex items-center">
            <p className="text-3xl font-bold text-gray-900 mr-2">
              {guideData.rating.toFixed(1)}
            </p>
            <StarIcon className="w-5 h-5 text-amber-500 fill-current" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Requests</h3>
            <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveTab('bookings');
              setActiveBookingTab('pending');
            }}>

              View All
            </Button>
          </div>

          {pendingBookings.length > 0 ?
        <div className="space-y-4">
              {pendingBookings.slice(0, 3).map((booking) => {
            const listing = mockListings.find(
              (l) => l.id === booking.listingId
            );
            return (
              <div
                key={booking.id}
                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-100">

                    <div>
                      <p className="font-bold text-sm text-gray-900">
                        {listing?.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.date).toLocaleDateString()} •{' '}
                        {booking.groupSize} pax
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                    onClick={() =>
                    updateBookingStatus(booking.id, 'confirmed')
                    }
                    className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200">

                        ✓
                      </button>
                      <button
                    onClick={() =>
                    updateBookingStatus(booking.id, 'cancelled')
                    }
                    className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200">

                        ✕
                      </button>
                    </div>
                  </div>);

          })}
            </div> :

        <p className="text-gray-500 text-sm text-center py-4">
              No pending requests.
            </p>
        }
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <Button
            variant="outline"
            fullWidth
            className="justify-start"
            onClick={() => {
              setActiveTab('listings');
              setIsCreateModalOpen(true);
            }}>

              <PlusIcon className="w-4 h-4 mr-3" /> Create New Listing
            </Button>
            <Button
            variant="outline"
            fullWidth
            className="justify-start"
            onClick={() => setActiveTab('profile')}>

              <UserIcon className="w-4 h-4 mr-3" /> Update Profile
            </Button>
            <Button
            variant="outline"
            fullWidth
            className="justify-start"
            onClick={() => setActiveTab('messages')}>

              <MessageSquareIcon className="w-4 h-4 mr-3" /> Check Messages
            </Button>
          </div>
        </Card>
      </div>
    </div>;

  const renderListings = () =>
  <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Tour Listings</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusIcon className="w-4 h-4 mr-2" /> Create New
        </Button>
      </div>

      {guideListings.length > 0 ?
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {guideListings.map((listing) =>
      <Card
        key={listing.id}
        className="overflow-hidden flex flex-col h-full">

              <div className="relative h-48">
                <ImagePlaceholder height="h-full" text="Tour Photo" />
                <div className="absolute top-3 right-3">
                  <Badge variant={listing.isActive ? 'success' : 'gray'}>
                    {listing.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                  {listing.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 flex items-center">
                  <MapPinIcon className="w-3 h-3 mr-1" /> {listing.location}
                </p>
                <div className="flex justify-between text-sm mb-4 mt-auto">
                  <span className="font-bold text-ocean">
                    ₱{listing.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500">{listing.duration}</span>
                </div>
                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <Button variant="outline" size="sm" className="flex-1">
                    <EditIcon className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
              variant="outline"
              size="sm"
              className="px-3 text-red-600 hover:bg-red-50 hover:border-red-200">

                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
      )}
        </div> :

    <Card className="p-12 text-center border-dashed border-2">
          <ListIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No listings yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Create your first tour listing to start receiving bookings from
            travelers.
          </p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create First Listing
          </Button>
        </Card>
    }

      {/* Create Listing Modal (Simplified for demo) */}
      {isCreateModalOpen &&
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create New Listing
            </h2>
            <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setIsCreateModalOpen(false);
          }}>

              <Input
            label="Tour Title"
            placeholder="e.g., Hidden Waterfalls Adventure"
            required />


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-ocean focus:ring-ocean px-4 py-2 border"
              rows={4}
              required>
            </textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-ocean focus:ring-ocean px-4 py-2 border">
                    <option>Samal Island</option>
                    <option>Tagum City</option>
                    <option>Panabo City</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-ocean focus:ring-ocean px-4 py-2 border">
                    <option>Island Hopping</option>
                    <option>Mountain Trekking</option>
                    <option>Cultural Heritage</option>
                  </select>
                </div>
                <Input label="Price (₱)" type="number" required />
                <Input
              label="Duration"
              placeholder="e.g., 4 hours, Full day"
              required />

                <Input label="Max Group Size" type="number" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Photo
                </label>
                <ImagePlaceholder height="h-32" text="Upload Tour Photo" />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <Button
              variant="ghost"
              type="button"
              onClick={() => setIsCreateModalOpen(false)}>

                  Cancel
                </Button>
                <Button type="submit">Save Listing</Button>
              </div>
            </form>
          </Card>
        </div>
    }
    </div>;

  const renderBookings = () =>
  <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Bookings</h2>

      <div className="flex border-b border-gray-200 mb-6">
        <button
        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeBookingTab === 'pending' ? 'border-ocean text-ocean' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveBookingTab('pending')}>

          Requests ({pendingBookings.length})
        </button>
        <button
        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeBookingTab === 'confirmed' ? 'border-ocean text-ocean' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveBookingTab('confirmed')}>

          Upcoming ({confirmedBookings.length})
        </button>
        <button
        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeBookingTab === 'completed' ? 'border-ocean text-ocean' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveBookingTab('completed')}>

          Completed ({completedBookings.length})
        </button>
      </div>

      <div className="space-y-4">
        {activeBookingTab === 'pending' && (
      pendingBookings.length > 0 ?
      pendingBookings.map((booking) => {
        const listing = mockListings.find(
          (l) => l.id === booking.listingId
        );
        return (
          <Card
            key={booking.id}
            className="p-6 border-l-4 border-l-amber-500">

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-bold text-gray-900">
                        {listing?.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Requested by{' '}
                        <span className="font-medium">Tourist Name</span>
                      </p>
                      <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />{' '}
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <UserIcon className="w-4 h-4 mr-1" />{' '}
                          {booking.groupSize} pax
                        </span>
                        <span className="font-medium text-ocean">
                          ₱{booking.totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-3 w-full md:w-auto">
                      <Button
                  variant="outline"
                  className="flex-1 md:flex-none text-red-600 hover:bg-red-50"
                  onClick={() =>
                  updateBookingStatus(booking.id, 'cancelled')
                  }>

                        Decline
                      </Button>
                      <Button
                  className="flex-1 md:flex-none bg-green-600 hover:bg-green-700"
                  onClick={() =>
                  updateBookingStatus(booking.id, 'confirmed')
                  }>

                        Accept
                      </Button>
                    </div>
                  </div>
                </Card>);

      }) :

      <p className="text-center text-gray-500 py-8">
              No pending requests.
            </p>)
      }

        {activeBookingTab === 'confirmed' && (
      confirmedBookings.length > 0 ?
      confirmedBookings.map((booking) => {
        const listing = mockListings.find(
          (l) => l.id === booking.listingId
        );
        return (
          <Card
            key={booking.id}
            className="p-6 border-l-4 border-l-ocean">

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {listing?.title}
                        </h3>
                        <Badge variant="success">Confirmed</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Booked by{' '}
                        <span className="font-medium">Tourist Name</span>
                      </p>
                      <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />{' '}
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <UserIcon className="w-4 h-4 mr-1" />{' '}
                          {booking.groupSize} pax
                        </span>
                        <span className="font-medium text-ocean">
                          ₱{booking.totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button
                  variant="outline"
                  onClick={() => setActiveTab('messages')}>

                        Message Tourist
                      </Button>
                    </div>
                  </div>
                </Card>);

      }) :

      <p className="text-center text-gray-500 py-8">
              No upcoming bookings.
            </p>)
      }
      </div>
    </div>;

  const renderReviews = () =>
  <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Reviews & Ratings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 md:col-span-1 flex flex-col items-center justify-center text-center bg-amber-50 border-amber-100">
          <h3 className="text-5xl font-bold text-amber-600 mb-2">
            {guideData.rating.toFixed(1)}
          </h3>
          <RatingStars rating={guideData.rating} size="md" />
          <p className="text-sm text-amber-800 mt-2">
            Based on {guideData.reviewCount} reviews
          </p>
        </Card>

        <Card className="p-6 md:col-span-2">
          <h3 className="font-bold text-gray-900 mb-4">Rating Breakdown</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) =>
          <div key={stars} className="flex items-center text-sm">
                <span className="w-12 text-gray-600">{stars} stars</span>
                <div className="flex-grow mx-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                className="h-full bg-amber-400 rounded-full"
                style={{
                  width: stars === 5 ? '80%' : stars === 4 ? '15%' : '5%'
                }}>
              </div>
                </div>
                <span className="w-8 text-right text-gray-500">
                  {stars === 5 ? '80%' : stars === 4 ? '15%' : '5%'}
                </span>
              </div>
          )}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 text-lg">Recent Reviews</h3>
        {guideRatings.length > 0 ?
      guideRatings.map((rating) =>
      <Card key={rating.id} className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                    T
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Tourist Name</p>
                    <p className="text-xs text-gray-500">
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <RatingStars rating={rating.stars} size="sm" />
              </div>
              <p className="text-gray-700 text-sm">{rating.comment}</p>
            </Card>
      ) :

      <p className="text-gray-500 py-4">No reviews yet.</p>
      }
      </div>
    </div>;

  const renderProfile = () =>
  <div className="max-w-4xl animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>

      <Card className="overflow-hidden mb-8">
        {/* Background Image */}
        <div className="relative h-48 bg-gray-200 group cursor-pointer">
          <ImagePlaceholder height="h-full" text="Background Image" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col items-center text-white">
              <CameraIcon className="w-8 h-8 mb-2" />
              <span className="font-medium">Change Background</span>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end sm:space-x-6 -mt-16 mb-8 relative z-10">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white flex-shrink-0 relative group cursor-pointer">
              <ImagePlaceholder height="h-full" text="Avatar" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-medium">
                  Change Photo
                </span>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex-grow text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
              <div className="flex items-center justify-center sm:justify-start mt-1 space-x-3">
                <Badge variant="olive">Giya</Badge>
                {guideData.applicationStatus === 'approved' ?
              <span className="flex items-center text-sm text-green-600 font-medium">
                    <CheckCircleIcon className="w-4 h-4 mr-1" /> Verified
                  </span> :

              <span className="flex items-center text-sm text-amber-600 font-medium">
                    <ClockIcon className="w-4 h-4 mr-1" /> Pending Approval
                  </span>
              }
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Member since {new Date(user.createdAt).getFullYear()}
              </p>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" defaultValue={user.name} required />
              <Input
              label="Email Address"
              defaultValue={user.email}
              disabled
              helperText="Contact support to change email" />

              <Input
              label="Phone Number"
              defaultValue={user.phone || ''}
              placeholder="+63 900 000 0000" />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-ocean focus:ring-ocean px-4 py-2 border">
                  <option value="Samal Island">Samal Island</option>
                  <option value="Tagum City">Tagum City</option>
                  <option value="Panabo City">Panabo City</option>
                  <option value="Kapalong">Kapalong</option>
                  <option value="Carmen">Carmen</option>
                  <option value="New Corella">New Corella</option>
                  <option value="Talaingod">Talaingod</option>
                  <option value="Asuncion">Asuncion</option>
                  <option value="Santo Tomas">Santo Tomas</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio / Description
              </label>
              <textarea
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-ocean focus:ring-ocean px-4 py-2 border"
              rows={4}
              defaultValue={guideData.bio || ''}
              placeholder="Tell tourists about yourself and what makes your tours special...">
            </textarea>
            </div>

            <Input
            label="Specialties"
            defaultValue={guideData.specialties.join(', ')}
            placeholder="e.g., Island Hopping, Food Tours, Mountain Trekking"
            helperText="Separate multiple specialties with commas" />


            <div className="pt-6 border-t border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Proof of Identity / Credentials
              </h4>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-ocean transition-colors cursor-pointer">
                <UploadIcon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="font-medium text-gray-900 mb-1">
                  Upload ID or License
                </p>
                <p className="text-sm text-gray-500">
                  Drag and drop or click to select files (PNG, JPG, PDF)
                </p>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <Button type="button" size="lg">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
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
                  Receive booking requests and updates via email
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
                  Receive text messages for urgent booking requests
                </p>
              </div>
              <input
              type="checkbox"
              className="w-5 h-5 text-ocean rounded focus:ring-ocean"
              defaultChecked />

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
            Once you delete your account, there is no going back. This will also
            remove all your tour listings.
          </p>
          <Button variant="danger">Delete Account</Button>
        </Card>
      </div>
    </div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-16 z-20">
        <span className="font-bold text-gray-900">Giya Menu</span>
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
              <Badge variant="olive" className="mt-1">
                Giya
              </Badge>
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
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-olive/10 text-olive' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>

                  <Icon
                    className={`w-5 h-5 mr-3 ${isActive ? 'text-olive' : 'text-gray-400'}`} />

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
          {activeTab === 'listings' && renderListings()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'reviews' && renderReviews()}
          {activeTab === 'messages' &&
          <div className="h-[calc(100vh-200px)] min-h-[600px]">
              <ChatWindow currentUserId={user.id} />
            </div>
          }
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>);

}