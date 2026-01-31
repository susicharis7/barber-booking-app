import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/home/HomeScreen';
import AppointmentsScreen from '../screens/appointments/AppointmentsScreen';
import SettingsStackNavigator from './SettingsStackNavigator';

import ServicesStackNavigator from './ServicesStackNavigator';
import NotificationsScreen from '../screens/settings/NotificationsScreen';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Services') {
            iconName = 'cut-outline';
          } else if (route.name === 'Appointments') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else {
            iconName = 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#6B7280',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      
      <Tab.Screen 
        name="Services" 
        component={ServicesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cut-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{ title: 'My Appointments' }}
      />

      <Tab.Screen name="Notifications" component={NotificationsScreen} />

      <Tab.Screen name="Settings" component={SettingsStackNavigator} />

    </Tab.Navigator>
  );
}
