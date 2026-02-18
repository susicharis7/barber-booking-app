import { View, Text, Alert, ImageBackground } from 'react-native';
import { logout } from '../../services/auth/auth-service';
import { styles } from '../../styles/screens/settings-screens/settings-styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../../navigation/types';
import {
  SettingsMenuList,
  type SettingsMenuItemProps,
} from '../../components/settings/SettingsMenuList';

const headerImage = require('../../../assets/images/settings-bg.png');

type SettingsScreenProps = NativeStackScreenProps<SettingsStackParamList, 'SettingsMain'>;

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      Alert.alert('Error', 'Failed to logout.');
    }
  };

  const menuItems: SettingsMenuItemProps[] = [
    {
      icon: 'person-outline',
      label: 'User Profile',
      onPress: () => navigation.navigate('UserProfile'),
    },
    {
      icon: 'settings-outline',
      label: 'My Account',
      onPress: () => navigation.navigate('MyAccount'),
    },
    {
      icon: 'list-outline',
      label: 'Waiting List',
      onPress: () => navigation.navigate('WaitingList'),
    },
    {
      icon: 'information-circle-outline',
      label: 'About App',
      onPress: () => navigation.navigate('AboutApp'),
    },
    {
      icon: 'notifications-outline',
      label: 'Notifications',
      onPress: () => navigation.navigate('NotificationsScreen'),
    },
    { icon: 'log-out-outline', label: 'Logout', onPress: handleLogout, isDanger: true },
  ];

  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          source={headerImage}
          style={styles.headerImage}
          imageStyle={styles.headerImageVisual}
          resizeMode="cover"
        >
          <View style={styles.headerOverlay}>
            <View style={styles.headerContent}>
              <Text style={styles.headerBadge}>ACCOUNT</Text>
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSubtitle}>
                Control your profile, bookings, and app experience.
              </Text>
              <View style={styles.headerSeparator} />
            </View>
          </View>
        </ImageBackground>
        <View style={styles.headerDivider} />
      </View>

      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <SettingsMenuList items={menuItems} />
      </View>
    </View>
  );
}
