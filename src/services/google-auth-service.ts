import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebaseAuth } from './firebase';

/* We use Web Client ID for both platforms (Android & iOS) */
GoogleSignin.configure({
  webClientId: '1070876676064-o1h4e4vkdga9juunle0da0sj7ocp6f2o.apps.googleusercontent.com',
  offlineAccess: true,
});

/**
 * Google Sign In function
 * 1. Opens Google Sign In popup
 * 2. Gets ID token from Google
 * 3. Uses that token to log into Firebase
 */
export const signInWithGoogle = async () => {
  try {
    
    await GoogleSignin.hasPlayServices();

    // Open Google Sign In
    const response = await GoogleSignin.signIn();

    if (isSuccessResponse(response)) {
      const { idToken } = response.data;

      if (!idToken) {
        throw new Error('ID Not Fetched from Google..');
      }

      // console.log('ID Token:', idToken);
     
      const googleCredential = GoogleAuthProvider.credential(idToken);


      const userCredential = await signInWithCredential(firebaseAuth, googleCredential);

      console.log('Google Sign In Success:', userCredential.user.email);
      return userCredential.user;
    } else {
      
      console.log('Google Sign In canceled.');
      return null;
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.log('Sign in is in progres...');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('Google Play Services are not available.');
          break;
        default:
          console.log('Google Sign In error:', error.message);
      }
    } else {
      console.log('Unknown error:', error);
    }
    throw error;
  }
};

/* Google Sign Out Function */
export const signOutFromGoogle = async () => {
  try {
    await GoogleSignin.signOut();
    console.log('Google Sign Out succeed!');
  } catch (error) {
    console.log('Google Sign Out error:', error);
  }
};


export const isGoogleSignedIn = async () => {
  const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
  return hasPreviousSignIn;
};
