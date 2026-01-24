import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDx8yai5AAU7Wl0nkIScn3oQphP6a5K940",
  authDomain: "barber-booking-app-199a4.firebaseapp.com",
  projectId: "barber-booking-app-199a4",
  storageBucket: "barber-booking-app-199a4.firebasestorage.app",
  messagingSenderId: "1070876676064",
  appId: "1:1070876676064:web:d074525d9d49744249e585"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

