import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from '../services/firebase';
import { loginStyles as styles } from '../styles/screens/login-styles';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }


    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };


  return(
    <View style={styles.container}>
      <Text style={styles.title}>
        Login
      </Text>

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

      <View style={styles.buttonSpacing}>
        <Button title="Login" onPress={handleLogin}/>
      </View>
      
    </View>
  )
}