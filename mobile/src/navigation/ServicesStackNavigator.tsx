import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ServiceScreen from '../screens/services-screens/ServiceScreen';
import ServicesAndPriceListScreen from '../screens/services-screens/ServicesAndPriceListScreen';
import CalendarScreen from '../screens/services-screens/CalendarScreen';
import InformationScreen from '../screens/services-screens/InformationScreen';
import JoinWaitingListScreen from '../screens/services-screens/JoinWaitingListScreen';
import type { ServicesStackParamList } from './types';

const Stack = createNativeStackNavigator<ServicesStackParamList>();

export default function ServicesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ServiceMain" component={ServiceScreen} />
      <Stack.Screen name="ServicesAndPriceList" component={ServicesAndPriceListScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Information" component={InformationScreen} />
      <Stack.Screen name="JoinWaitingListScreen" component={JoinWaitingListScreen} />
    </Stack.Navigator>
  );
}
