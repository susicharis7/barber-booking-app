import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Alert, 
  TouchableOpacity, 
  ActivityIndicator,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from "firebase/auth";

import { firebaseAuth } from '../../services/firebase';
import { styles } from '../../styles/screens/login-styles';

import { useEffect } from "react";

const logo = require('../../../assets/images/logo.png');

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

  


  return (
    <View style={styles.container}>

      <View style={styles.logoSection}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Please enter your Email"
          textContentType="username"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput 
          placeholder="Please enter your Password"
          textContentType="password"
          autoComplete="password"
          autoCapitalize="none"
          autoCorrect={false}
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

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialSection}>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <FontAwesome name="google" size={18} color="#000" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <FontAwesome name="facebook" size={18} color="#000" />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
}
