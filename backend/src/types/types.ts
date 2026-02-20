export interface CreateAppointmentData {
    barber_id: number;
    service_id: number;
    date: string;
    start_time: string;
    note?: string | null;
}

export interface CreateUserData {
    firebase_uid: string; 
    email: string;
    first_name: string;
    last_name: string; 
}

export interface User {
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
}

export type UserRole = 'customer' | 'barber' | 'admin';

export interface CreateWaitingListData {
    barber_id: number;
    service_id?: number | null;
    start_date: string;
    end_date?: string | null;
}



export type StaffDashboardOverview = {
  users_total: number;
  customers_total: number;
  barbers_total: number;
  admins_total: number;
  staff_total: number;
  appointments_today: number;
  upcoming_confirmed: number;
  waiting_list_active: number;
};