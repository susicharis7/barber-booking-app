import { api } from './api';
import type { AppointmentDetailed } from '../types';

export type AppointmentListResponse = {
  appointments: AppointmentDetailed[];
  nextCursor: string | null;
};

export type GetAppointmentsParams = {
  limit?: number;
  cursor?: string | null;
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
