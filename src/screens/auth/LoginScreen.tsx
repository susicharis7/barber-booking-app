import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Alert, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons';

import { firebaseAuth } from '../../services/firebase';
import { signInWithGoogle } from '../../services/google-auth-service';
import { styles } from '../../styles/screens/login-styles';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Email/Password Login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        console.log('Logged in as:', user.email);
        
      }
    } catch (error: any) {
      Alert.alert('Google Sign In Failed', error.message || 'Something went wrong');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Please enter your Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput 
        placeholder="Please enter your Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* Email/Password Login Button */}
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Google Sign In Button */}
      <TouchableOpacity 
        style={styles.googleButton} 
        onPress={handleGoogleSignIn}
        disabled={googleLoading}
      >
        {googleLoading ? (
          <ActivityIndicator color="#333" />
        ) : (
          <>
            <Ionicons name="logo-google" size={24} color="#DB4437" />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

