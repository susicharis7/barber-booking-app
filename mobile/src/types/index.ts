/* User from the PostgreSQL DB */
export type DatabaseUser = {
    id: number;
    firebase_uid: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string  | null;
    created_at: string;
}


/* Barber from the PostgreSQL DB */
export type Barber = {
  id: number;
  first_name: string;
  last_name: string;
  title: string;
  bio: string;
  avatar_url: string | null;
  email: string;
};

/* Services & Price List */
export type ServicesAndPriceList = {
  id: number;
  name: string;
  description: string | null;
  duration: number;
  price: number | string;
}

