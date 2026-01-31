import { View, Text, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { logout } from '../../services/auth-service';
import { styles } from '../../styles/screens/settings-screens/settings-styles';


const headerImage = require('../../../assets/images/settings-bg.png');

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isLogout?: boolean;
};

export default function SettingsScreen({ navigation }: any) {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to logout.');
    }
  };

  const menuItems: MenuItem[] = [
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
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      icon: 'log-out-outline',
      label: 'Logout',
      onPress: handleLogout,
      isLogout: true,
    },
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
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, item.isLogout && styles.logoutItem]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.menuIconContainer,
                item.isLogout && styles.logoutIconContainer,
              ]}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={item.isLogout ? '#dc2626' : '#0f172a'}
              />
            </View>
            <Text style={[styles.menuText, item.isLogout && styles.logoutText]}>
              {item.label}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={item.isLogout ? '#dc2626' : '#94a3b8'}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
