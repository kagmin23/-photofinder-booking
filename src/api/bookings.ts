import api from ".";
import { BookingRequest, BookingResponse } from "../types";

export const createBooking = async (
  bookingData: BookingRequest
): Promise<BookingResponse> => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await api.post<BookingResponse>(
      "/api/bookings",
      bookingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating booking:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create booking"
    );
  }
};

export const getUserBookings = async (customerId: number) => {
  const token = localStorage.getItem("authToken");

  const res = await api.get(`/api/bookings/user`, {
    params: { customerId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getBookingById = async (
  bookingId: string | number
): Promise<BookingResponse> => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  try {
    const response = await api.get<BookingResponse>(
      `/api/bookings/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error fetching booking details:", error);

    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("Booking không tồn tại");
      } else if (error.response.status === 401) {
        throw new Error("Bạn không có quyền truy cập booking này");
      }
    }

    throw new Error(
      error.response?.data?.message || "Không thể lấy thông tin booking"
    );
  }
};
