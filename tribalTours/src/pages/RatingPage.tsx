import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircleIcon,
  ArrowLeftIcon,
  MapPinIcon,
  CalendarIcon } from
'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useBookings } from '../hooks/useBookings';
import { mockListings, mockGuides } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { RatingStars } from '../components/RatingStars';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
export function RatingPage() {
  const { bookingId } = useParams<{
    bookingId: string;
  }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookings } = useBookings();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // Find booking details
  const booking = bookings.find((b) => b.id === bookingId);
  const listing = booking ?
  mockListings.find((l) => l.id === booking.listingId) :
  null;
  const guide = booking ?
  mockGuides.find((g) => g.id === booking.guideId) :
  null;
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);
  if (!booking || !listing || !guide) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Booking Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          We couldn't find the tour you're trying to rate.
        </p>
        <Link to="/tawo-dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>);

  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsSubmitting(true);
    // Simulate API call to save rating
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 flex items-center justify-center">
        <Card className="max-w-lg w-full p-10 text-center shadow-2xl relative overflow-hidden">
          {/* Confetti-like decoration */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
            <div className="absolute top-10 left-10 w-3 h-3 bg-amber-400 rounded-full animate-bounce"></div>
            <div
              className="absolute top-20 right-20 w-4 h-4 bg-ocean rounded-full animate-bounce"
              style={{
                animationDelay: '0.2s'
              }}>
            </div>
            <div
              className="absolute bottom-20 left-20 w-3 h-3 bg-olive rounded-full animate-bounce"
              style={{
                animationDelay: '0.5s'
              }}>
            </div>
            <div
              className="absolute top-1/2 right-10 w-2 h-2 bg-amber-500 rounded-full animate-bounce"
              style={{
                animationDelay: '0.7s'
              }}>
            </div>
          </div>

          <div className="relative z-10">
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <RatingStars rating={5} size="lg" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Your review helps {guide.name} grow their business and helps other
              travelers find great experiences.
            </p>

            <Link to="/tawo-dashboard">
              <Button
                fullWidth
                size="lg"
                className="bg-ocean hover:bg-ocean/90">

                Back to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>);

  }
  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/tawo-dashboard"
          className="inline-flex items-center text-ocean hover:underline mb-6 font-medium">

          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <Card className="overflow-hidden shadow-xl">
          {/* Header Summary */}
          <div className="bg-ocean text-white p-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <h1 className="text-3xl font-bold mb-2 relative z-10">
              Rate Your Experience
            </h1>
            <p className="text-ocean-100 relative z-10">
              How was your tour with {guide.name}?
            </p>
          </div>

          <div className="p-8">
            {/* Tour Info Card */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 rounded-xl p-4 mb-10 border border-gray-100">
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                <ImagePlaceholder height="h-full" text="Tour" />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-bold text-gray-900 text-lg">
                  {listing.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-2 space-y-1 sm:space-y-0 sm:space-x-4">
                  <span className="flex items-center justify-center sm:justify-start">
                    <CalendarIcon className="w-4 h-4 mr-1 text-olive" />
                    {new Date(booking.date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center justify-center sm:justify-start">
                    <MapPinIcon className="w-4 h-4 mr-1 text-olive" />
                    {listing.location}
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Star Rating */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Tap to Rate
                </h3>
                <div className="flex justify-center transform scale-150 mb-4">
                  <RatingStars
                    rating={rating}
                    interactive={true}
                    onChange={setRating}
                    size="lg" />

                </div>
                <p className="text-sm font-medium h-6 text-amber-600">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent!'}
                </p>
              </div>

              {/* Text Review */}
              <div className="pt-6 border-t border-gray-100">
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Share your experience{' '}
                  <span className="text-gray-400 font-normal text-sm">
                    (Optional)
                  </span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  className="w-full border-gray-300 rounded-xl shadow-sm focus:border-ocean focus:ring-ocean p-4 resize-none"
                  placeholder={`What did you love about the tour? How was ${guide.name} as a guide?`}
                  maxLength={500}>
                </textarea>
                <div className="flex justify-end mt-2">
                  <span className="text-xs text-gray-400">
                    {comment.length}/500 characters
                  </span>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={rating === 0 || isSubmitting}
                  className="py-4 text-lg shadow-lg hover:shadow-xl transition-all">

                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
                {rating === 0 &&
                <p className="text-center text-sm text-red-500 mt-3">
                    Please select a star rating to submit.
                  </p>
                }
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>);

}