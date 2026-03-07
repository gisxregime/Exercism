export type Role = 'tawo' | 'giya' | 'admin';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected';
export type BookingStatus =
'pending' |
'confirmed' |
'active' |
'completed' |
'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  createdAt: string;
}

export interface Guide extends User {
  specialties: string[];
  rating: number;
  reviewCount: number;
  isApproved: boolean;
  applicationStatus: ApplicationStatus;
  backgroundImage?: string;
  proofDocuments?: string[];
  tourListings?: string[]; // IDs of listings
}

export interface TourListing {
  id: string;
  guideId: string;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: string; // e.g., "4 hours", "Full day"
  maxGroupSize: number;
  images: string[];
  category: string;
  isActive: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  visitorId: string;
  guideId: string;
  listingId: string;
  date: string;
  status: BookingStatus;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  totalPrice: number;
  groupSize: number;
  createdAt: string;
}

export interface Rating {
  id: string;
  bookingId: string;
  visitorId: string;
  guideId: string;
  stars: number;
  comment: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  lastMessage?: Message;
  unreadCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'message' | 'rating' | 'system';
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface GuideApplication {
  id: string;
  userId: string;
  status: ApplicationStatus;
  documents: string[];
  submittedAt: string;
}