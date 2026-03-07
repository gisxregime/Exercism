import {
  User,
  Guide,
  TourListing,
  Booking,
  Rating,
  Message,
  Notification,
  GuideApplication } from
'../types';

export const mockUsers: User[] = [
{
  id: 'u1',
  name: 'Juan Tourist',
  email: 'juan@example.com',
  role: 'tawo',
  location: 'Manila',
  createdAt: '2025-01-01T00:00:00Z'
},
{
  id: 'u2',
  name: 'Maria Traveler',
  email: 'maria.t@example.com',
  role: 'tawo',
  location: 'Cebu',
  createdAt: '2025-02-15T00:00:00Z'
},
{
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@laagta.com',
  role: 'admin',
  createdAt: '2024-12-01T00:00:00Z'
}];


export const mockGuides: Guide[] = [
{
  id: 'g1',
  name: 'Maria Santos',
  email: 'maria@example.com',
  role: 'giya',
  location: 'Samal Island',
  bio: 'Kumusta! Ako si Maria. I love showing visitors the hidden beaches of Samal.',
  createdAt: '2025-01-15T00:00:00Z',
  specialties: ['Island Hopping', 'Food Tours'],
  rating: 4.9,
  reviewCount: 124,
  isApproved: true,
  applicationStatus: 'approved'
},
{
  id: 'g2',
  name: 'Pedro Lumad',
  email: 'pedro@example.com',
  role: 'giya',
  location: 'Talaingod',
  bio: 'Maayong adlaw! Experience the rich cultural heritage of the Ata-Manobo tribe with me.',
  createdAt: '2025-02-10T00:00:00Z',
  specialties: ['Cultural Heritage', 'Mountain Trekking'],
  rating: 5.0,
  reviewCount: 89,
  isApproved: true,
  applicationStatus: 'approved'
},
{
  id: 'g3',
  name: 'Elena Mindanao',
  email: 'elena@example.com',
  role: 'giya',
  location: 'New Corella',
  bio: "Malipayon ko nga makita ka! Let's explore the beautiful caves and rivers of New Corella.",
  createdAt: '2025-03-05T00:00:00Z',
  specialties: ['River Adventures', 'Nature Walks'],
  rating: 4.8,
  reviewCount: 56,
  isApproved: true,
  applicationStatus: 'approved'
},
{
  id: 'g4',
  name: 'Juan dela Cruz',
  email: 'juan.g@example.com',
  role: 'giya',
  location: 'Tagum City',
  bio: "Magandang araw! I'll take you to the best spots in the City of Palms.",
  createdAt: '2024-11-20T00:00:00Z',
  specialties: ['Festival Tours', 'City Tours', 'Food Tours'],
  rating: 4.7,
  reviewCount: 210,
  isApproved: true,
  applicationStatus: 'approved'
},
{
  id: 'g5',
  name: 'Rosa Magbanua',
  email: 'rosa@example.com',
  role: 'giya',
  location: 'Panabo City',
  bio: 'Hello! I am Rosa. Discover the banana capital of the world through my farm tours.',
  createdAt: '2025-01-25T00:00:00Z',
  specialties: ['Farm Tourism', 'Local Crafts'],
  rating: 4.9,
  reviewCount: 78,
  isApproved: true,
  applicationStatus: 'approved'
},
{
  id: 'g6',
  name: 'Carlos Dagupan',
  email: 'carlos@example.com',
  role: 'giya',
  location: 'Kapalong',
  bio: "Tara na, laag ta! For the adventurous souls, join me in exploring Kapalong's caves.",
  createdAt: '2025-04-12T00:00:00Z',
  specialties: ['Mountain Trekking', 'Caving'],
  rating: 4.8,
  reviewCount: 145,
  isApproved: true,
  applicationStatus: 'approved'
}];


export const mockListings: TourListing[] = [
{
  id: 'l1',
  guideId: 'g1',
  title: 'Hidden Beaches of Samal',
  description:
  'A full day tour exploring the untouched beaches and snorkeling spots of Island Garden City of Samal.',
  location: 'Samal Island',
  price: 1500,
  duration: '8 hours',
  maxGroupSize: 10,
  images: [],
  category: 'Island Hopping',
  isActive: true,
  createdAt: '2025-02-01T00:00:00Z'
},
{
  id: 'l2',
  guideId: 'g2',
  title: 'Ata-Manobo Cultural Immersion',
  description:
  'Experience the traditional way of life, dances, and crafts of the Ata-Manobo tribe in Talaingod.',
  location: 'Talaingod',
  price: 800,
  duration: '5 hours',
  maxGroupSize: 15,
  images: [],
  category: 'Cultural Heritage',
  isActive: true,
  createdAt: '2025-02-15T00:00:00Z'
},
{
  id: 'l3',
  guideId: 'g3',
  title: 'Panas Waterfalls Adventure',
  description:
  'Trek through lush forests to reach the multi-tiered Panas Waterfalls in New Corella.',
  location: 'New Corella',
  price: 600,
  duration: '6 hours',
  maxGroupSize: 8,
  images: [],
  category: 'River Adventures',
  isActive: true,
  createdAt: '2025-03-10T00:00:00Z'
},
{
  id: 'l4',
  guideId: 'g4',
  title: 'Tagum City Night Market & Food Tour',
  description:
  'Taste the best local street food and experience the vibrant night life of Tagum City.',
  location: 'Tagum City',
  price: 500,
  duration: '4 hours',
  maxGroupSize: 12,
  images: [],
  category: 'Food Tours',
  isActive: true,
  createdAt: '2025-01-20T00:00:00Z'
},
{
  id: 'l5',
  guideId: 'g5',
  title: 'Banana Plantation & Farm Experience',
  description:
  'Learn about banana farming, harvest your own fruits, and enjoy a farm-to-table lunch.',
  location: 'Panabo City',
  price: 700,
  duration: '5 hours',
  maxGroupSize: 20,
  images: [],
  category: 'Farm Tourism',
  isActive: true,
  createdAt: '2025-02-28T00:00:00Z'
},
{
  id: 'l6',
  guideId: 'g6',
  title: 'Okbot Cave Exploration',
  description:
  'An exciting spelunking adventure in the famous Okbot Cave of Kapalong.',
  location: 'Kapalong',
  price: 1200,
  duration: '7 hours',
  maxGroupSize: 6,
  images: [],
  category: 'Mountain Trekking',
  isActive: true,
  createdAt: '2025-04-15T00:00:00Z'
}];


export const mockBookings: Booking[] = [
{
  id: 'b1',
  visitorId: 'u1',
  guideId: 'g1',
  listingId: 'l1',
  date: '2026-04-15',
  status: 'confirmed',
  paymentMethod: 'Pay at Venue',
  paymentStatus: 'pending',
  totalPrice: 3000,
  groupSize: 2,
  createdAt: '2026-03-01T10:00:00Z'
},
{
  id: 'b2',
  visitorId: 'u1',
  guideId: 'g2',
  listingId: 'l2',
  date: '2026-05-20',
  status: 'pending',
  paymentMethod: 'Pay at Venue',
  paymentStatus: 'pending',
  totalPrice: 2400,
  groupSize: 3,
  createdAt: '2026-03-05T14:30:00Z'
},
{
  id: 'b3',
  visitorId: 'u1',
  guideId: 'g3',
  listingId: 'l3',
  date: '2026-02-10',
  status: 'completed',
  paymentMethod: 'Pay at Venue',
  paymentStatus: 'paid',
  totalPrice: 1200,
  groupSize: 2,
  createdAt: '2026-01-15T09:15:00Z'
},
{
  id: 'b4',
  visitorId: 'u1',
  guideId: 'g4',
  listingId: 'l4',
  date: '2026-01-05',
  status: 'completed',
  paymentMethod: 'Pay at Venue',
  paymentStatus: 'paid',
  totalPrice: 2000,
  groupSize: 4,
  createdAt: '2025-12-10T11:20:00Z'
},
{
  id: 'b5',
  visitorId: 'u1',
  guideId: 'g5',
  listingId: 'l5',
  date: '2026-03-10',
  status: 'cancelled',
  paymentMethod: 'Pay at Venue',
  paymentStatus: 'pending',
  totalPrice: 1400,
  groupSize: 2,
  createdAt: '2026-02-20T16:45:00Z'
}];


export const mockRatings: Rating[] = [
{
  id: 'r1',
  bookingId: 'b3',
  visitorId: 'u1',
  guideId: 'g3',
  stars: 5,
  comment:
  'Elena was an amazing guide! The waterfalls were breathtaking and she knew all the best spots for photos.',
  createdAt: '2026-02-11T10:00:00Z'
}];


export const mockMessages: Message[] = [
{
  id: 'm1',
  senderId: 'u1',
  receiverId: 'g1',
  content:
  'Hi Maria! I am interested in your Hidden Beaches tour. Is it suitable for beginners?',
  timestamp: '2026-03-01T09:00:00Z',
  isRead: true
},
{
  id: 'm2',
  senderId: 'g1',
  receiverId: 'u1',
  content:
  'Hello Juan! Yes, absolutely. We provide life jackets and the waters are very calm. Perfect for beginners!',
  timestamp: '2026-03-01T09:15:00Z',
  isRead: true
},
{
  id: 'm3',
  senderId: 'u1',
  receiverId: 'g1',
  content: 'Great! I just booked for April 15. See you then!',
  timestamp: '2026-03-01T10:05:00Z',
  isRead: false
}];


export const mockNotifications: Notification[] = [
{
  id: 'n1',
  userId: 'u1',
  type: 'booking',
  message: 'Your booking for Hidden Beaches of Samal has been confirmed!',
  isRead: false,
  createdAt: '2026-03-01T10:05:00Z',
  link: '/tawo-dashboard'
},
{
  id: 'n2',
  userId: 'u1',
  type: 'message',
  message: 'New message from Maria Santos',
  isRead: false,
  createdAt: '2026-03-01T09:15:00Z',
  link: '/messages'
}];


export const mockApplications: GuideApplication[] = [
{
  id: 'app1',
  userId: 'u3_pending',
  status: 'pending',
  documents: ['id_front.jpg', 'brgy_clearance.pdf'],
  submittedAt: '2026-03-05T08:30:00Z'
},
{
  id: 'app2',
  userId: 'u4_pending',
  status: 'pending',
  documents: ['passport.pdf', 'guide_license.jpg'],
  submittedAt: '2026-03-06T14:20:00Z'
}];