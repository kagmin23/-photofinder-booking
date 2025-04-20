import api from "..";

export const getUserBookingAnalytics = async (): Promise<{
  bookingAna: Record<string, number>;
  incomeAna: Record<string, number>;
}> => {
  const token = localStorage.getItem("authToken");
  const response = await api.get("/api/Dashboard/Get_User_Booking_Analytics", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
