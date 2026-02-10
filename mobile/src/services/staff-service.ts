import { api } from './api';
import type { StaffDashboardOverview, StaffAppointmentItem } from '../types';


export const getStaffDashboardOverview = async (): Promise<StaffDashboardOverview> => {
  const data = await api.get<{ overview: StaffDashboardOverview }>(
    '/api/staff/dashboard/overview'
  );
  return data.overview;
};

export const getMyStaffAppointments = async (limit = 50): Promise<StaffAppointmentItem[]> => {
  const data = await api.get<{ appointments: StaffAppointmentItem[] }>(
    `/api/staff/me/appointments?limit=${limit}`
  );
  return data.appointments;
};

export const cancelMyStaffAppointment = async (appointmentId: number) => {
  const data = await api.put<{ appointment: { id: number; status: 'cancelled' } }>(
    `/api/staff/appointments/${appointmentId}/cancel`,
    {}
  );
  return data.appointment;
};
