import { AxiosResponse } from 'axios';
import api, { ApiResponse } from '.';
import { PackageModel } from '../types';

export const getAllPackages = async (): Promise<ApiResponse<PackageModel[]>> => {
  try {
    const response: AxiosResponse = await api.get('/api/Package/Get_All_Packages');
    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response.data?.message || 'Không thể lấy danh sách gói chụp ảnh',
        errors: response.data?.errors,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        'Lỗi hệ thống, vui lòng thử lại sau',
      errors: error.response?.data?.errors || null,
    };
  }
};

export const createPackage = async (
  data: PackageModel
): Promise<ApiResponse<any>> => {
  try {
    const token = localStorage.getItem("authToken");

    const response: AxiosResponse = await api.post(
      "/api/Package/Create_Package",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      console.error("Error response:", response);  // Log chi tiết lỗi response
      return {
        success: false,
        message: response.data?.message || "Không thể tạo gói chụp ảnh",
        errors: response.data?.errors,
      };
    }
  } catch (error: any) {
    console.error("Error occurred:", error);  // Log chi tiết lỗi tại đây
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Lỗi hệ thống, vui lòng thử lại sau",
      errors: error.response?.data?.errors || null,
    };
  }
};

export const getPackageById = async (id: number): Promise<ApiResponse<PackageModel[]>> => {
  try {
    const response = await api.get(`/api/Package/Get_Package_By_photographerId?id=${id}`);
    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response.data?.message || 'Không thể lấy danh sách gói chụp ảnh',
        errors: response.data?.errors,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        'Lỗi hệ thống, vui lòng thử lại sau',
      errors: error.response?.data?.errors || null,
    };
  }
};

export const updatePackage = async (
  data: PackageModel
): Promise<ApiResponse<any>> => {
  try {
    const token = localStorage.getItem("authToken");

    const response: AxiosResponse = await api.post(
      "/api/Package/Update_Package",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      console.error("Error response:", response);
      return {
        success: false,
        message: response.data?.message || "Không thể tạo gói chụp ảnh",
        errors: response.data?.errors,
      };
    }
  } catch (error: any) {
    console.error("Error occurred:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Lỗi hệ thống, vui lòng thử lại sau",
      errors: error.response?.data?.errors || null,
    };
  }
};
