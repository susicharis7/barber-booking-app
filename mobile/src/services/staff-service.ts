import { api } from './api';
import type { StaffDashboardOverview, StaffAppointmentItem } from '../types';


export const getStaffDashboardOverview = async (): Promise<StaffDashboardOverview> => {
  const data = await api.get<{ overview: StaffDashboardOverview }>(
    '/api/staff/dashboard/overview'
  );
  return data.overview;
};

type GetMyStaffAppointmentsParams = {
  limit?: number;
  cursor?: string | null;
  date?: string;
};

export type StaffAppointmentsPage = {
  appointments: StaffAppointmentItem[];
  nextCursor: string | null;
};

export type StaffAppointmentDay = {
  date: string;
  count: number;
};

export const getMyStaffAppointments = async (
  params: GetMyStaffAppointmentsParams = {}
): Promise<StaffAppointmentsPage> => {
  const query = new URLSearchParams();
  query.set('limit', String(params.limit ?? 5));
  if (params.cursor) query.set('cursor', params.cursor);
  if (params.date) query.set('date', params.date);

  const data = await api.get<StaffAppointmentsPage>(
    `/api/staff/me/appointments?${query.toString()}`
  );
  return data;
};

export const getMyStaffAppointmentDays = async (
  from: string,
  to: string
): Promise<StaffAppointmentDay[]> => {
  const query = new URLSearchParams();
  query.set('from', from);
  query.set('to', to);

  const data = await api.get<{ days: StaffAppointmentDay[] }>(
    `/api/staff/me/appointment-days?${query.toString()}`
  );

  return data.days ?? [];
};

export const cancelMyStaffAppointment = async (appointmentId: number) => {
  const data = await api.put<{ appointment: { id: number; status: 'cancelled' } }>(
    `/api/staff/appointments/${appointmentId}/cancel`,
    {}
  );
  return data.appointment;
};
