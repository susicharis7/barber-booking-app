import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { api , isApiError } from '../../services/api';
import { styles } from '../../styles/screens/register-styles';

import { registerWithEmailAndPassword } from '../../services/auth-service';

const logo = require('../../../assets/images/logo.png');

export default function RegisterScreen({ navigation }: any) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('error');


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

    try {
   
      await registerWithEmailAndPassword(email, password);
 
      const data = await api.post('/api/users/register', {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      });

      console.log('User registered successfully:', data);
      Alert.alert('Success', 'Account created successfully!');

    } catch (error: unknown) {
        if (isApiError(error)) {
          Alert.alert('Registration failed', error.message);
          return;
        }

        Alert.alert('Registration failed', 'Unexpected error');
      } finally {
         setLoading(false);
      }};

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
            textContentType='emailAddress'
            autoComplete='email'
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
              textContentType='newPassword'
              autoComplete='password-new'
              autoCapitalize='none'
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
              autoComplete='password-new'
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='newPassword'
            />
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            style={styles.registerButton}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
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