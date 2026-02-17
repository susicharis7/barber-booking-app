import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { styles } from '../../styles/screens/settings-screens/profile-styles';
import { useAuth } from '../../context/auth-context';
import { api, isApiError } from '../../services/api/client';
import { colors } from '../../styles/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../../navigation/types';

const headerImage = require('../../../assets/images/settings-bg.png');
type UserProfileScreenProps = NativeStackScreenProps<SettingsStackParamList, 'UserProfile'>;

export default function UserProfileScreen({ navigation }: UserProfileScreenProps) {
  const { dbUser, refreshDbUser } = useAuth();
  const [didInitForm, setDidInitForm] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      await refreshDbUser();
    };

    loadProfile();
  }, [refreshDbUser]);

  useEffect(() => {
    if (!dbUser) return;

    setEmail(dbUser.email);

    if (didInitForm) return;

    setFullName(`${dbUser.first_name} ${dbUser.last_name}`);
    setPhone(dbUser.phone || '');
    setDidInitForm(true);
  }, [dbUser, didInitForm]);

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
      setDidInitForm(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error: unknown) {
      if (isApiError(error)) {
        Alert.alert('Update failed', error.message);
        return;
      }

      Alert.alert('Update failed', 'Unexpected error');
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
      {/* HERO */}
      <ImageBackground source={headerImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        {/* BACK BUTTON */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={colors.white} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* AVATAR & NAME */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={50} color={colors.white} />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{fullName || 'Loading...'}</Text>
        </View>

        {/* HEADER CONTENT */}
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>PROFILE</Text>
          <Text style={styles.headerSubtitle}>
            Manage your personal information and preferences.
          </Text>
        </View>
      </ImageBackground>

      {/* FORM CONTENT */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>PERSONAL INFO</Text>

        <View style={styles.inputCard}>
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

          <View style={[styles.inputGroup, { marginBottom: 0 }]}>
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
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
          {saving ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
