import { 
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    User,
} from 'firebase/auth';

import { firebaseAuth } from './firebase';

export const login = async(
    email: string,
    password: string
): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
    );

    return userCredential.user;
};

/* Logout Current User */
export const logout = async(): Promise<void> => {
    await signOut(firebaseAuth);
};

/* Get Current User */
export const getCurrentUser = (): User | null => {
    return firebaseAuth.currentUser;
}

/* Registration */
export const registerWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<User> => {
    const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email.trim(),
        password
    );

    return userCredential.user;
}