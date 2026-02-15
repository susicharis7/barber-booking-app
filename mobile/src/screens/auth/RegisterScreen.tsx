import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { api, isApiError } from '../../services/api';
import { styles } from '../../styles/screens/register-styles';
import { colors } from '../../styles/colors';
import {
  registerWithEmailAndPassword,
  deleteCurrentUserAccount,
} from '../../services/auth-service';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';

const logo = require('../../../assets/images/logo.png');
type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const rollbackFirebaseRegistration = async () => {
    try {
      await deleteCurrentUserAccount();
    } catch (rollbackError) {
      console.error('Registration rollback failed:', rollbackError);
    }
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    let firebaseCreated = false;

    try {
      const firebaseUser = await registerWithEmailAndPassword(email, password);
      firebaseCreated = true;

      // Ensure fresh token exists before backend call
      await firebaseUser.getIdToken(true);

      await api.post('/api/users/register', {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      });

      Alert.alert('Success', 'Account created successfully!');
    } catch (error: unknown) {
      if (isApiError(error) && error.code === 'USER_ALREADY_EXISTS') {
        Alert.alert('Success', 'Account already exists and is ready to use.');
        return;
      }

      if (firebaseCreated) {
        await rollbackFirebaseRegistration();
      }

      if (isApiError(error)) {
        Alert.alert('Registration failed', error.message);
        return;
      }

      Alert.alert('Registration failed', 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid
      enableAutomaticScroll
      extraScrollHeight={24}
      extraHeight={12}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View style={styles.logoSection}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.title}>Registracija</Text>

          <TextInput
            placeholder="Vaše ime"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />

          <TextInput
            placeholder="Vaše prezime"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            textContentType="emailAddress"
            autoComplete="email"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <View style={styles.passwordRow}>
            <TextInput
              placeholder="Šifra"
              textContentType="newPassword"
              autoComplete="password-new"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={[styles.input, styles.halfInput]}
            />

            <TextInput
              placeholder="Potvrdite šifru"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={[styles.input, styles.halfInput]}
              autoComplete="password-new"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
            />
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            style={styles.registerButton}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.registerButtonText}>Registrujte se</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footerLinkContainer}>
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Već imate račun?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footerLink}>Prijavite se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
