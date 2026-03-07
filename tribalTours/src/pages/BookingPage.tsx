import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  CalendarIcon,
  UsersIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  InfoIcon,
  MessageSquareIcon } from
'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useBookings } from '../hooks/useBookings';
import { mockListings, mockGuides } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { PaymentSelector } from '../components/PaymentSelector';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { Badge } from '../components/ui/Badge';
export function BookingPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { createBooking } = useBookings();
  const [step, setStep] = useState(0); // 0 is Tour Details, 1 is Date/Guests, 2 is Payment, 3 is Review, 4 is Success
  const [date, setDate] = useState('');
  const [groupSize, setGroupSize] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Pay at Venue');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  // Find listing and guide
  const listing = mockListings.find((l) => l.id === id);
  const guide = listing ?
  mockGuides.find((g) => g.id === listing.guideId) :
  null;
  useEffect(() => {
    if (!isAuthenticated) {
      // In a real app, we'd save the redirect URL
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  if (!listing || !guide) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Tour Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The tour you are trying to book does not exist or is no longer
          available.
        </p>
        <Link to="/explore">
          <Button>Explore Other Tours</Button>
        </Link>
      </div>);

  }
  const totalPrice = listing.price * groupSize;
  const handleNext = () => {
    if (step === 0) setStep(1);else
    if (step === 1 && date && groupSize > 0) setStep(2);else
    if (step === 2 && paymentMethod) setStep(3);
  };
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };
  const handleConfirm = () => {
    if (!user) return;
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      const newBooking = createBooking({
        visitorId: user.id,
        guideId: guide.id,
        listingId: listing.id,
        date: date,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
        groupSize: groupSize
      });
      setBookingRef(newBooking.id.toUpperCase());
      setIsSubmitting(false);
      setStep(4); // Success step
    }, 1500);
  };
  // Success State
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 flex items-center justify-center">
        <Card className="max-w-lg w-full p-10 text-center shadow-2xl border-t-8 border-t-ocean">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 mb-6">
            Your booking request has been sent to {guide.name}. They will review
            and confirm shortly.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-100">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <span className="text-gray-500 font-medium">
                Booking Reference
              </span>
              <span className="font-bold text-ocean text-lg">{bookingRef}</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tour</span>
                <span className="font-medium text-gray-900 text-right">
                  {listing.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium text-gray-900">
                  {new Date(date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Guests</span>
                <span className="font-medium text-gray-900">
                  {groupSize} pax
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Amount</span>
                <span className="font-bold text-ocean">
                  ₱{totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-medium text-gray-900">
                  {paymentMethod}
                </span>
              </div>
            </div>
          </div>

          <Link to="/tawo-dashboard">
            <Button fullWidth size="lg">
              View My Bookings
            </Button>
          </Link>
        </Card>
      </div>);

  }
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header & Progress */}
        <div className="mb-8">
          <Link
            to="/explore"
            className="inline-flex items-center text-ocean hover:underline mb-6 font-medium">

            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Explore
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {step === 0 ? 'Tour Details' : 'Complete Your Booking'}
          </h1>

          {step > 0 &&
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
              <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-ocean -z-10 transition-all duration-300"
              style={{
                width: `${(step - 1) * 50}%`
              }}>
            </div>

              {[1, 2, 3].map((num) =>
            <div key={num} className="flex flex-col items-center">
                  <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-ocean text-white shadow-md' : 'bg-white text-gray-400 border-2 border-gray-200'}`}>

                    {step > num ? <CheckCircleIcon className="w-6 h-6" /> : num}
                  </div>
                  <span
                className={`text-xs font-medium mt-2 ${step >= num ? 'text-ocean' : 'text-gray-400'}`}>

                    {num === 1 ? 'Details' : num === 2 ? 'Payment' : 'Review'}
                  </span>
                </div>
            )}
            </div>
          }
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 md:p-8">
              {step === 0 &&
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="h-64 md:h-80 rounded-xl overflow-hidden relative mb-6">
                    <ImagePlaceholder height="h-full" text="Tour Image" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="ocean" className="text-sm px-3 py-1">
                        {listing.category}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {listing.title}
                    </h2>
                    <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6">
                      <span className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1 text-olive" />{' '}
                        {listing.location}
                      </span>
                      <span className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1 text-olive" />{' '}
                        {listing.duration}
                      </span>
                      <span className="flex items-center">
                        <UsersIcon className="w-4 h-4 mr-1 text-olive" /> Max{' '}
                        {listing.maxGroupSize} pax
                      </span>
                    </div>
                  </div>

                  <div className="prose max-w-none text-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      About this tour
                    </h3>
                    <p className="leading-relaxed">{listing.description}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mt-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Your Giya (Guide)
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-olive text-white flex items-center justify-center font-bold text-lg mr-4">
                          {guide.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {guide.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Local Expert in {guide.location}
                          </p>
                        </div>
                      </div>
                      <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/messages')}>

                        <MessageSquareIcon className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              }

              {step === 1 &&
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2 text-ocean" />
                      When are you going?
                    </h2>
                    <Input
                    type="date"
                    label="Select Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required />

                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <UsersIcon className="w-5 h-5 mr-2 text-ocean" />
                      How many people?
                    </h2>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">Group Size</p>
                        <p className="text-sm text-gray-500">
                          Maximum {listing.maxGroupSize} people
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                        onClick={() =>
                        setGroupSize(Math.max(1, groupSize - 1))
                        }
                        className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-ocean transition-colors focus:outline-none"
                        disabled={groupSize <= 1}>

                          -
                        </button>
                        <span className="text-xl font-bold w-6 text-center">
                          {groupSize}
                        </span>
                        <button
                        onClick={() =>
                        setGroupSize(
                          Math.min(listing.maxGroupSize, groupSize + 1)
                        )
                        }
                        className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-ocean transition-colors focus:outline-none"
                        disabled={groupSize >= listing.maxGroupSize}>

                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              }

              {step === 2 &&
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <PaymentSelector
                  selectedMethod={paymentMethod}
                  onSelect={setPaymentMethod} />

                </div>
              }

              {step === 3 &&
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Review Your Booking
                  </h2>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start">
                    <ClockIcon className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-900">
                        Cancellation Policy
                      </h4>
                      <p className="text-sm text-amber-800 mt-1">
                        Free cancellation up to 48 hours before the tour starts.
                        After that, a cancellation fee may apply.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 border-b pb-2">
                      Guest Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Name</p>
                        <p className="font-medium">{user?.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 border-b pb-2">
                      Payment Details
                    </h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Method</span>
                      <span className="font-medium">{paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <span className="font-medium text-amber-600">
                        To be paid at venue
                      </span>
                    </div>
                  </div>
                </div>
              }

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className={step === 0 ? 'invisible' : ''}>

                  Back
                </Button>

                {step === 0 ?
                <Button onClick={handleNext} className="px-8">
                    Proceed to Booking
                  </Button> :
                step < 3 ?
                <Button
                  onClick={handleNext}
                  disabled={step === 1 && (!date || groupSize < 1)}
                  className="px-8">

                    Next Step
                  </Button> :

                <Button
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="px-8 bg-green-600 hover:bg-green-700 focus:ring-green-500">

                    {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                  </Button>
                }
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 overflow-hidden">
              <div className="h-40 relative">
                <ImagePlaceholder height="h-full" text="Tour Image" />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold leading-tight">
                    {listing.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-olive text-white flex items-center justify-center font-bold text-xs mr-3">
                    {guide.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Guided by {guide.name}
                    </p>
                    <div className="flex items-center text-xs">
                      <MapPinIcon className="w-3 h-3 mr-1 text-olive" />
                      {listing.location}
                    </div>
                  </div>
                </div>

                {step > 0 &&
                <div className="space-y-3 mb-6">
                    {date &&
                  <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Date</span>
                        <span className="font-medium text-gray-900">
                          {new Date(date).toLocaleDateString()}
                        </span>
                      </div>
                  }
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium text-gray-900">
                        {listing.duration}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Guests</span>
                      <span className="font-medium text-gray-900">
                        {groupSize} pax
                      </span>
                    </div>
                  </div>
                }

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      ₱{listing.price.toLocaleString()} × {groupSize}
                    </span>
                    <span className="font-medium text-gray-900">
                      ₱{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service Fee</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-3">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-ocean">
                      ₱{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>);

}