import { 
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    User,
} from 'firebase/auth';

import { firebaseAuth } from './firebase';
import { signOutFromGoogle } from './google-auth-service';

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


export const logout = async(): Promise<void> => {
    try {
        await signOutFromGoogle();
    } catch (error) {
       
        console.log('Google sign out skipped:', error);
    }
    
 
    await signOut(firebaseAuth);
};

/* Get Current User */
export const getCurrentUser = (): User | null => {
    return firebaseAuth.currentUser;
}