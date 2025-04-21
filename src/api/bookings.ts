import api from ".";
import { BookingRequest, BookingResponse } from "../types";

export const createBooking = async (
    bookingData: BookingRequest
  ): Promise<BookingResponse> => {
    const token = localStorage.getItem('authToken');

    try {
      const response = await api.post<BookingResponse>(
        '/api/bookings',
        bookingData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }
      );
      return response.data;
    } catch (error: any) {
        console.error('Error creating booking:', error);
        throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
  };
  