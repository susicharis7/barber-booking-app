import { api } from './api/client';
import type { DatabaseUser } from '../types';

export type UpdateMePayload = {
  first_name?: string;
  last_name?: string;
  phone?: string | null;
};

export const getMe = async () => {
  return api.get<{ user: DatabaseUser }>('/api/users/me');
};

export const updateMe = async (payload: UpdateMePayload) => {
  return api.put<{ message: string; user: DatabaseUser }>('/api/users/me', payload);
};

export const deleteMe = async () => {
  return api.delete<{ message: string }>('/api/users/me');
};
