import api from "..";

export const getPhotoGrapherBookingAnalytics = async (): Promise<{
  bookingAna: Record<string, number>;
  incomeAna: Record<string, number>;
}> => {
  const token = localStorage.getItem("authToken");
  const response = await api.get("/api/Dashboard/Get_PhotoGrapher_Booking_Analytics", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
