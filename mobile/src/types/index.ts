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


