import { View, Text, Button } from 'react-native';

export default function RegisterScreen({ navigation }: any) {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Register Screen 
      </Text>

      <Button
        title="Complete Profile"
        onPress={() => navigation.navigate('CompleteProfile')}
      />
    </View>
  );
}
