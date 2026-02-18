import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/profile-styles';
import { colors } from '../../styles/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../../navigation/types';
import { useUserProfile } from '../../hooks/settings/useUserProfile';
import { Button, Input } from '../../components/ui';


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
          <Input
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            autoComplete="off"
            textContentType="name"
          />

          <Input
            label="Email Address"
            value={email}
            onChangeText={() => undefined}
            editable={false}
            autoComplete="off"
            textContentType="emailAddress"
          />

          <Input
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
          />
        </View>

        <View style={{ marginTop: 'auto' }}>
          <Button
            label="Save Changes"
            onPress={() => void handleSave()}
            loading={saving}
            disabled={saving}
          />
        </View>

      </View>
    </KeyboardAwareScrollView>
  );
}
