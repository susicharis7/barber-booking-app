import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../screens/settings/SettingsScreen';
import UserProfileScreen from '../screens/settings/UserProfileScreen';

const Stack = createNativeStackNavigator();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
}