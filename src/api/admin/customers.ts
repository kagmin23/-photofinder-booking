import api from "..";
import { User } from "../../types";

// GET all users
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/api/users");
  return response.data;
};

// DELETE user by ID
export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/api/users/${id}`);
};

// CREATE a new user
export const createUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.post<User>("/api/users", userData);
  return response.data;
};

// UPDATE a user by ID
export const updateUser = async (id: string, updatedData: Partial<User>): Promise<User> => {
  const response = await api.put<User>(`/api/users/${id}`, updatedData);
  return response.data;
};
