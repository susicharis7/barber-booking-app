import type { UserRole } from './types';

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ListUsersFilters = {
  page: number;
  limit: number;
  search?: string;
  role?: UserRole;
  blocked?: boolean;
};

export type AppointmentStatus = 'confirmed' | 'completed' | 'cancelled';

export type ListUserAppointmentsFilters = {
  userId: number;
  page: number;
  limit: number;
  status?: AppointmentStatus;
};

export type AdminUserRow = {
  id: number;
  firebase_uid: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  role: UserRole;
  is_blocked: boolean;
  blocked_at: Date | null;
  created_at: Date;
};

export type AdminAppointmentRow = {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  note: string | null;
  barber: {
    id: number | null;
    first_name: string | null;
    last_name: string | null;
    title: string | null;
  };
  service: {
    id: number | null;
    name: string | null;
    duration: number | null;
    price: number | null;
  };
};
