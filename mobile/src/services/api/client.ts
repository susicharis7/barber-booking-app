import { firebaseAuth } from '../auth/firebase';
import { ApiError, isApiError } from './errors';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  requiresAuth?: boolean;
};

class ApiService {
  private async getToken(): Promise<string | null> {
    const user = firebaseAuth.currentUser;
    if (!user) return null;
    return user.getIdToken();
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, requiresAuth = true } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = await this.getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (body !== undefined) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);

    const raw = await response.text();
    let data: any = null;

    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        data = { message: raw };
      }
    }

    if (!response.ok) {
      throw new ApiError(
        data?.message || 'Something went wrong',
        response.status,
        data?.code,
        data?.errors,
      );
    }

    return data as T;
  }

  get<T>(endpoint: string, requiresAuth = true) {
    return this.request<T>(endpoint, { method: 'GET', requiresAuth });
  }

  post<T>(endpoint: string, body: unknown, requiresAuth = true) {
    return this.request<T>(endpoint, { method: 'POST', body, requiresAuth });
  }

  put<T>(endpoint: string, body: unknown, requiresAuth = true) {
    return this.request<T>(endpoint, { method: 'PUT', body, requiresAuth });
  }

  delete<T>(endpoint: string, requiresAuth = true) {
    return this.request<T>(endpoint, { method: 'DELETE', requiresAuth });
  }
}

export const api = new ApiService();
export { ApiError, isApiError };
