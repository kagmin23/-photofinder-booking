export type LoginRQ = {
  email: string;
  password: string;
};

export interface SignupRQ {
  username: string;
  email: string;
  phone: string;
  password: string;
  role?: "customer" | "photographer";
  profilePic: string;
}

export type Messenges = {
  messenger_id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  is_read: boolean;
  sent_at: Date;
};

interface PhotoPostHome {
  imgUrl: string;
  title: string;
  author: string;
  actionButtons?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
}
export interface PackageModel {
  packageId: number;
  photographerId: number;
  packageName: string;
  description: string;
  price: number;
  duration: number;
  createdAt: string;
}
export interface Album {
  id: string;
  style: string;
  author: string;
  mainImage: string;
  images: string[];
}
export interface Tab {
  name: string;
  key: string;
}

export interface Photographer {
  photographerId: number;
  userId: number;
  bio: string;
  portfolioUrl: string;
  rating: number;
  location: string;
  createdAt: string;
  availabilities: any[];
  bookings: any[];
  conversations: any[];
  packages: any[];
  photos: any[];
  user: any | null;
}
export interface UserProfile {
  userId: number;
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  profilePicture: string | null;
  createdAt: string;
  updatedAt: string;
  bookings: any[];
  conversations: any[];
  messages: any[];
  notifications: any[];
  photographer: Photographer | null;
}
export interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  profilePicture: string | null;
  createdAt: string;
  updatedAt: string;
  bookings: any[];
  conversations: any[];
  messages: any[];
  notifications: any[];
  photographer: any | null;
}
export interface Booking {
  bookingId: number;
  customerId: number;
  photographerId: number;
  eventDate: string;
  eventLocation: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
export interface BookingAnalytics {
  bookingAna: Record<string, number>;
  incomeAna: Record<string, number>;
}
export interface BookingRequest {
  customerId: number;
  photographerId: number;
  eventDate: string; // ISO string
  eventLocation: string;
  status?: string; // optional nếu backend tự gán
  totalPrice: number;
}
export interface BookingResponse {
  bookingId: number;
  customerId: number;
  photographerId: number;
  eventDate: string;
  eventLocation: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  customer: {
    userId: number;
    name: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
    profilePicture: string | null;
    createdAt: string;
    updatedAt: string;
    bookings: any[];
    conversations: any[];
    messages: any[];
    notifications: any[];
    photographer: any | null;
  };
  payments: any[];
  photographer: any | null;
  reviews: any[];
}
