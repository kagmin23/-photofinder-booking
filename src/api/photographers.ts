import api from "./index";

export interface Photographer {
  photographerId: number;
  userId: number;
  bio: string;
  portfolioUrl: string;
  rating: number;
  location: string;
}

export const getAllPhotographers = async (): Promise<Photographer[]> => {
  try {
    const response = await api.get<Photographer[]>("/api/Photographer/Get_All_Photographers");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch photographers"
    );
  }
};

export const getPhotographerById = async (id: string | number): Promise<Photographer> => {
  try {
    const response = await api.get<Photographer>('/api/Photographer/Get_Photographer_By_Id', {
      params: { id },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch photographer by ID"
    );
  }
};
