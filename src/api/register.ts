import { AxiosResponse } from 'axios';
import api, { ApiResponse } from '.';
import { SignupRQ } from '../types';

export const registerUser = async (data: SignupRQ): Promise<ApiResponse<any>> => {
  try {
    const response: AxiosResponse = await api.post('/api/Auth/Register', data);
    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response.data?.message || 'Đăng ký thất bại',
        errors: response.data?.errors,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        'Lỗi hệ thống, vui lòng thử lại',
      errors: error.response?.data?.errors || null,
    };
  }
};