import { AxiosResponse } from "axios";
import api from ".";
import { UserProfile } from "../types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
}

export const loginUser = async (
  data: LoginRequest,
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response: AxiosResponse = await api.post("/api/Auth/Login", {
      email: data.email,
      password: data.password,
    });

    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response.data?.message || "Đăng nhập thất bại",
        errors: response.data?.errors,
      };
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      return {
        success: false,
        message: "Email hoặc mật khẩu không đúng",
        errors: null,
      };
    } else if (error.response?.status === 429) {
      return {
        success: false,
        message: "Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau.",
        errors: null,
      };
    }
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Lỗi hệ thống, vui lòng thử lại",
      errors: error.response?.data?.errors || null,
    };
  }
};

export const getProfile = async (): Promise<ApiResponse<UserProfile>> => {
  try {
    const token = localStorage.getItem('authToken');

    const response = await api.post<ApiResponse<UserProfile>>('/api/Auth/Get_Profile', {},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error("Profile fetch error details:", error);
    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred while fetching profile.',
      errors: error.response?.data?.errors || error,
    };
  }
};
