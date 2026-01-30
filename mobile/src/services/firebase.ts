import { initializeApp } from 'firebase/app';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { browserLocalPersistence, getAuth, initializeAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDx8yai5AAU7Wl0nkIScn3oQphP6a5K940",
  authDomain: "barber-booking-app-199a4.firebaseapp.com",
  projectId: "barber-booking-app-199a4",
  storageBucket: "barber-booking-app-199a4.firebasestorage.app",
  messagingSenderId: "1070876676064",
  appId: "1:1070876676064:web:d074525d9d49744249e585"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

let firebaseAuth: Auth;

try {
  const { getReactNativePersistence } = require("firebase/auth");
  firebaseAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  firebaseAuth = getAuth(app);
  firebaseAuth.setPersistence(browserLocalPersistence);
}

export { app, firebaseAuth, storage };
export const firebaseDB = getFirestore(app);


