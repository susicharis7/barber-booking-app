import { firebaseAuth } from './firebase';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  requiresAuth?: boolean;
};

class ApiService {
  private async getToken(): Promise<string | null> {
    const user = firebaseAuth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, requiresAuth = true } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = await this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  }

  get<T>(endpoint: string, requiresAuth = true) {
    return this.request<T>(endpoint, { method: 'GET', requiresAuth });
  }

  post<T>(endpoint: string, body: any, requiresAuth = true) {
    return this.request<T>(endpoint, { method: 'POST', body, requiresAuth });
  }

  put<T>(endpoint: string, body: any, requiresAuth = true) {
    return this.request<T>(endpoint, { method: 'PUT', body, requiresAuth });
  }

  delete<T>(endpoint: string, requiresAuth = true) {
    return this.request<T>(endpoint, { method: 'DELETE', requiresAuth });
  }
}

export const api = new ApiService();