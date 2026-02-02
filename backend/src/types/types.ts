export interface CreateAppointmentData {
    barber_id: number;
    service_id: number;
    date: string;
    start_time: string;
    note?: string | null;
}


