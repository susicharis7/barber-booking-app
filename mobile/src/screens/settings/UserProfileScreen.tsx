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
import { styles } from '../../styles/screens/settings-screens/profile-styles';
import { colors } from '../../styles/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../../navigation/types';
import { useUserProfile } from '../../hooks/settings/useUserProfile';

const headerImage = require('../../../assets/images/settings-bg.png');
type UserProfileScreenProps = NativeStackScreenProps<SettingsStackParamList, 'UserProfile'>;

export default function UserProfileScreen({ navigation }: UserProfileScreenProps) {
  const { fullName, setFullName, email, phone, setPhone, saving, save } = useUserProfile();

  const handleSave = async () => {
    const result = await save();

    if (result.ok) {
      Alert.alert('Success', 'Profile updated successfully');
      return;
    }

    Alert.alert('Update failed', result.message);
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
      <ImageBackground source={headerImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={colors.white} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

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

        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>PROFILE</Text>
          <Text style={styles.headerSubtitle}>
            Manage your personal information and preferences.
          </Text>
        </View>
      </ImageBackground>

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
