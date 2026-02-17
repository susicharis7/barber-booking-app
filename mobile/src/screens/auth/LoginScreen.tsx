import { useState } from 'react';
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
import { styles } from '../../styles/screens/login-styles';
import { login } from '../../services/auth/auth-service';
import { colors } from '../../styles/colors';
import { isApiError } from '../../services/api/client';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';

const logo = require('../../../assets/images/logo.png');

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Email/Password Login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error: unknown) {
      if (isApiError(error)) {
        Alert.alert('Login failed', error.message);
        return;
      }

      Alert.alert('Login failed', 'Unexpected error');
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
        <Text style={styles.title}>Prijava</Text>

        <TextInput
          placeholder="Molimo unesite svoju email adresu"
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
          placeholder="Molimo unesite svoju šifru"
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.loginButtonText}>Prijavi se</Text>
          )}
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Nemate račun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Registrujte se</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialSection}>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <FontAwesome name="google" size={18} color={colors.black} />
            <Text style={styles.socialButtonText}>Nastavite sa Googleom</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <FontAwesome name="facebook" size={18} color={colors.black} />
            <Text style={styles.socialButtonText}>Nastavite sa Facebookom</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
