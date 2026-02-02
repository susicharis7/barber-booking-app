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
    created_at: Date;
}

