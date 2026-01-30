import { View, Text, TouchableOpacity, TextInput, ImageBackground, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { styles } from '../../styles/screens/profile-styles';
import { useAuth } from '../../context/auth-context';
import { api } from '../../services/api';

const headerImage = require('../../../assets/images/settings-bg.png');

export default function UserProfileScreen({ navigation }: any) {
  const { dbUser, refreshDbUser } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);
      await refreshDbUser();
      setLoadingProfile(false);
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (dbUser) {
      setFullName(`${dbUser.first_name} ${dbUser.last_name}`);
      setEmail(dbUser.email);
      setPhone(dbUser.phone || '');
    }
  }, [dbUser]);

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Full name is required');
      return;
    }

    const nameParts = fullName.trim().split(' ');
    const first_name = nameParts[0];
    const last_name = nameParts.slice(1).join(' ') || '';

    if (!last_name) {
      Alert.alert('Error', 'Please enter both first and last name');
      return;
    }

    setSaving(true);

    try {
      await api.put('/api/users/me', {
        first_name,
        last_name,
        phone: phone || null,
      });

      await refreshDbUser();
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error: any) {
      console.error('Save error:', error);
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      enableAutomaticScroll
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={headerImage}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <View style={styles.headerOverlay} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#ffffff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={60} color="#ffffff" />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{fullName || 'Loading...'}</Text>
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            autoComplete="off"
            textContentType="name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={[styles.input, styles.inputDisabled]}
            value={email}
            editable={false}
            autoComplete="off"
            textContentType="emailAddress"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}