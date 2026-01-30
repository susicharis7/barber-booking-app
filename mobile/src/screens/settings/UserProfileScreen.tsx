import { View, Text, TouchableOpacity, TextInput, ImageBackground, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { styles } from '../../styles/screens/profile-styles';

const headerImage = require('../../../assets/images/settings-bg.png');

export default function UserProfileScreen({ navigation }: any) {

  const [fullName, setFullName] = useState('Haris Sušić');
  const [email, setEmail] = useState('haris.susic@stu.ibu.edu.ba');
  const [phone, setPhone] = useState('+387 62 625 427');

  const handleSave = () => {

    console.log('Saving profile...', { fullName, email, phone });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <ImageBackground
        source={headerImage}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <View style={styles.headerOverlay} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#ffffff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={60} color="#ffffff" />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{fullName}</Text>
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={[styles.input, styles.inputDisabled]}
            value={email}
            editable={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}