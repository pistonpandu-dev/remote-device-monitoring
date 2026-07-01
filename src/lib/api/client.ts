import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { auth } from '@/lib/firebase/config';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const user = auth.currentUser;
            if (user) {
              await user.getIdToken(true);
              const token = await user.getIdToken();
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            await auth.signOut();
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  getInstance() {
    return this.instance;
  }
}

export const apiClient = new ApiClient().getInstance();
