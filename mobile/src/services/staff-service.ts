import { api } from './api';
import type { StaffDashboardOverview } from '../types';

export const getStaffDashboardOverview = async (): Promise<StaffDashboardOverview> => {
  const data = await api.get<{ overview: StaffDashboardOverview }>(
    '/api/staff/dashboard/overview'
  );
  return data.overview;
};
