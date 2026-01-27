import { View, Text, Alert, Button } from 'react-native';
import { logout } from '../../services/auth-service';

export default function ProfileScreen() {
  const handleLogout = async() => {
    try {
      await logout();
    } catch (error) {
      Alert.alert("Error", "Failed to logout.");
    }
  };

  return (
    <View 
    style={{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Text style={{ fontSize: 20 }}>Profile Screen </Text>
      <Button title='Logout' onPress={handleLogout}></Button>
    </View>
  );
}
