import { api } from './api/client';
import type { AppointmentDetailed } from '../types';

export type AppointmentListResponse = {
  appointments: AppointmentDetailed[];
  nextCursor: string | null;
};

export type GetAppointmentsParams = {
  limit?: number;
  cursor?: string | null;
};

export type BookedSlot = {
  start_time: string;
  end_time: string;
};

export type CreateAppointmentPayload = {
  barber_id: number;
  service_id: number;
  date: string;
  start_time: string;
  note?: string;
};

export const getBookedSlots = async (barberId: number, date: string) => {
  return api.get<{ slots: BookedSlot[] }>(
    `/api/appointments/barber/${barberId}/booked?date=${encodeURIComponent(date)}`,
  );
};

export const createAppointment = async (payload: CreateAppointmentPayload) => {
  return api.post('/api/appointments', payload);
};

const buildAppointmentsQuery = ({ limit, cursor }: GetAppointmentsParams = {}) => {
  const params = new URLSearchParams();

  if (typeof limit === 'number') {
    params.set('limit', String(limit));
  }

  if (cursor) {
    params.set('cursor', cursor);
  }

  const query = params.toString();
  return query ? `?${query}` : '';
};

export const getUpcomingAppointments = async (
  params: GetAppointmentsParams = {},
): Promise<AppointmentListResponse> => {
  const query = buildAppointmentsQuery(params);
  return api.get<AppointmentListResponse>(`/api/appointments/upcoming${query}`);
};

export const getPastAppointments = async (
  params: GetAppointmentsParams = {},
): Promise<AppointmentListResponse> => {
  const query = buildAppointmentsQuery(params);
  return api.get<AppointmentListResponse>(`/api/appointments/past${query}`);
};

export const cancelAppointment = async (appointmentId: number): Promise<void> => {
  await api.put(`/api/appointments/${appointmentId}/cancel`, {});
};
