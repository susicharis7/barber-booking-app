/* User from the PostgreSQL DB */
export type DatabaseUser = {
    id: number;
    firebase_uid: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string  | null;
    role: 'customer' | 'barber' | 'admin';
    created_at: string;
}


/* Barber from the PostgreSQL DB */
export type Barber = {
  id: number;
  user_id: number; // FK 
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  bio: string;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
};

/* Services & Price List */
export type ServicesAndPriceList = {
  id: number;
  name: string;
  description: string | null;
  duration: number;
  price: number | string;
  is_active: boolean;
  created_at: string;
}


/* Barber Working Hours */
export type WorkingHours = {
  id: number;
  barber_id: number;
  day_of_week: number; // 0 = Sunday ... 6 = Saturday
  start_time: string;  // 'HH:mm:ss'
  end_time: string;    // 'HH:mm:ss'
  is_working: boolean;
};


/* Appointment */
export type Appointment = {
  id: number;
  customer_id: number | null;
  barber_id: number | null;
  service_id: number | null;
  date: string;        // 'YYYY-MM-DD'
  start_time: string;  // 'HH:mm:ss'
  end_time: string;    // 'HH:mm:ss'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  note: string | null;
  created_at: string;
};


/* Appointment with relations */
export type AppointmentDetailed = {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  note: string | null;

  customer: Pick<DatabaseUser, 'id' | 'first_name' | 'last_name' | 'email'>;
  barber: Pick<Barber, 'id' | 'first_name' | 'last_name' | 'title'>;
  service: Pick<ServicesAndPriceList, 'id' | 'name' | 'duration' | 'price'>;
};


/* Waiting List */
export type WaitingListItem = {
  id: number;
  start_date: string;
  end_date: string | null;
  status: 'active' | 'cancelled' | 'fulfilled';
  barber: { id: number; first_name: string; last_name: string; title: string };
  service: { id: number; name: string; duration: number; price: string };
};





/* Staff Dashboard - OVERVIEW */
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

/* Staff Appointment */
export type StaffAppointmentItem = {
  appointment_id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  note: string | null;
  customer: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  service: {
    id: number;
    name: string;
    duration: number;
    price: number | string;
  } | null;
};


