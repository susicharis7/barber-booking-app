import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../screens/settings/SettingsScreen';
import UserProfileScreen from '../screens/settings/UserProfileScreen';
import MyAccountScreen from '../screens/settings/MyAccountScreen';

const Stack = createNativeStackNavigator();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="MyAccount" component={MyAccountScreen} />
    </Stack.Navigator>
  );
}