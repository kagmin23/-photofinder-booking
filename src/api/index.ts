import axios from 'axios';

const api = axios.create({
  baseURL: 'https://photofinderv2-ana7dpgqencje2fc.southeastasia-01.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interface cho response API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
}

export default api;