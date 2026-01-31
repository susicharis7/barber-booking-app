import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ServiceScreen from '../screens/services/ServiceScreen';
import ServicesAndPriceListScreen from '../screens/services/ServicesAndPriceListScreen';
import CalendarScreen from '../screens/services/CalendarScreen';
import InformationScreen from '../screens/services/InformationScreen';

const Stack = createNativeStackNavigator();

export default function ServicesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ServiceMain" component={ServiceScreen} />
      <Stack.Screen name="ServicesAndPriceList" component={ServicesAndPriceListScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Information" component={InformationScreen} />
    </Stack.Navigator>
  );
}