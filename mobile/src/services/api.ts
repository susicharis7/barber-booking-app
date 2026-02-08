import { firebaseAuth } from './firebase';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  requiresAuth?: boolean;
};

export class ApiError extends Error {
  status: number;
  code?: string;
  errors?: unknown;

  constructor(message: string, status: number, code?: string, errors?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

// Type-guard 
export const isApiError = (err: unknown): err is ApiError =>
  err instanceof ApiError;



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
        data.message || 'Something went wrong',
        response.status,
        data?.code,
        data?.errors
      );
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