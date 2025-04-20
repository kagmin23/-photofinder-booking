import api from "..";
import { Booking } from "../../types";

// GET all bookings
export const getAllBookings = async (): Promise<Booking[]> => {
  const response = await api.get<Booking[]>("/api/bookings");
  return response.data;
};

// GET a single booking by ID
export const getBookingById = async (id: string): Promise<Booking> => {
  const response = await api.get<Booking>(`/api/bookings/${id}`);
  return response.data;
};

// CREATE a new booking
export const createBooking = async (
  bookingData: Partial<Booking>,
): Promise<Booking> => {
  const response = await api.post<Booking>("/api/bookings", bookingData);
  return response.data;
};

// UPDATE a booking by ID
export const updateBooking = async (
  id: string,
  updatedData: Partial<Booking>,
): Promise<Booking> => {
  const response = await api.put<Booking>(`/api/bookings/${id}`, updatedData);
  return response.data;
};

// DELETE a booking by ID
export const deleteBooking = async (id: string): Promise<void> => {
  await api.delete(`/api/bookings/${id}`);
};
