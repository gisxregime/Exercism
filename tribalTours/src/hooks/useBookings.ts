import { useState, useEffect } from 'react';
import { Booking, BookingStatus } from '../types';
import { mockBookings } from '../data/mockData';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Initialize with mock data
    const stored = localStorage.getItem('laagta_bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    } else {
      setBookings(mockBookings);
      localStorage.setItem('laagta_bookings', JSON.stringify(mockBookings));
    }
  }, []);

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('laagta_bookings', JSON.stringify(newBookings));
  };

  const createBooking = (
  bookingData: Omit<Booking, 'id' | 'status' | 'paymentStatus' | 'createdAt'>) =>
  {
    const newBooking: Booking = {
      ...bookingData,
      id: `b_${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString()
    };
    saveBookings([...bookings, newBooking]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    const updated = bookings.map((b) => b.id === id ? { ...b, status } : b);
    saveBookings(updated);
  };

  const cancelBooking = (id: string) => {
    updateBookingStatus(id, 'cancelled');
  };

  const markTourDone = (id: string) => {
    updateBookingStatus(id, 'completed');
  };

  const getBookingsByVisitor = (visitorId: string) => {
    return bookings.filter((b) => b.visitorId === visitorId);
  };

  const getBookingsByGuide = (guideId: string) => {
    return bookings.filter((b) => b.guideId === guideId);
  };

  return {
    bookings,
    createBooking,
    updateBookingStatus,
    cancelBooking,
    markTourDone,
    getBookingsByVisitor,
    getBookingsByGuide
  };
}