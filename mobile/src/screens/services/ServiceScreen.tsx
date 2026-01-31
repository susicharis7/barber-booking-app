import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/service-styles';

const bgImage = require('../../../assets/images/settings-bg.png');

const employees = [
  {
    id: 1,
    name: 'Una Alagic',
    title: 'Senior Barber',
    avatar: null,
  },
  {
    id: 2,
    name: 'Elvin Pecenkovic',
    title: 'Master Barber',
    avatar: null,
  },
];

export default function ServiceScreen({ navigation }: any) {
  const handleSelectEmployee = (employee: typeof employees[0]) => {
    navigation.navigate('ServicesAndPriceList', { employee });
  };

  return (
    <View style={styles.container}>
      {/* HERO */}
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        {/* HEADER CONTENT */}
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>BOOKING</Text>
          <Text style={styles.headerTitle}>Choose Employee</Text>
          <Text style={styles.headerSubtitle}>
            Select your preferred barber to continue.
          </Text>
        </View>
      </ImageBackground>

      {/* WHITE CONTENT */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionLabel}>AVAILABLE BARBERS</Text>

          {employees.map((employee) => (
            <TouchableOpacity
              key={employee.id}
              style={styles.employeeCard}
              activeOpacity={0.7}
              onPress={() => handleSelectEmployee(employee)}
            >
              <View style={styles.employeeAvatar}>
                {employee.avatar ? (
                  <Image source={{ uri: employee.avatar }} style={styles.avatarImage} />
                ) : (
                  <Ionicons name="person" size={32} color="#ffffff" />
                )}
              </View>

              <View style={styles.employeeInfo}>
                <Text style={styles.employeeName}>{employee.name}</Text>
                <Text style={styles.employeeTitle}>{employee.title}</Text>
              </View>

              <Ionicons name="chevron-forward" size={22} color="#94a3b8" />
            </TouchableOpacity>
          ))}

          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={22} color="#3b82f6" />
            <Text style={styles.infoText}>
              All our barbers are certified professionals with years of experience.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}