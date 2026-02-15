import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/service-styles';
import { colors } from '../../styles/colors';
import type { Barber } from '../../types';
import { api } from '../../services/api';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ServicesStackParamList } from '../../navigation/types';

const bgImage = require('../../../assets/images/settings-bg.png');
type ServiceScreenProps = NativeStackScreenProps<ServicesStackParamList, 'ServiceMain'>;

export default function ServiceScreen({ navigation }: ServiceScreenProps) {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBarbers();
  }, []);

  const fetchBarbers = async () => {
    try {
      const data = await api.get<{ barbers: Barber[] }>('/api/barbers', false);
      setBarbers(data.barbers);
    } catch (error) {
      console.error('Fetch barbers error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEmployee = (barber: Barber) => {
    navigation.navigate('ServicesAndPriceList', {
      employee: {
        id: barber.id,
        name: `${barber.first_name} ${barber.last_name}`,
        title: barber.title,
        avatar: barber.avatar_url,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* HERO */}
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>BOOKING</Text>
          <Text style={styles.headerTitle}>Choose Employee</Text>
          <Text style={styles.headerSubtitle}>Select your preferred barber to continue.</Text>
        </View>
      </ImageBackground>

      {/* CONTENT */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading barbers...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>AVAILABLE BARBERS</Text>

            {barbers.map((barber) => (
              <TouchableOpacity
                key={barber.id}
                style={styles.employeeCard}
                activeOpacity={0.7}
                onPress={() => handleSelectEmployee(barber)}
              >
                <View style={styles.employeeAvatar}>
                  {barber.avatar_url ? (
                    <Image source={{ uri: barber.avatar_url }} style={styles.avatarImage} />
                  ) : (
                    <Ionicons name="person" size={32} color={colors.white} />
                  )}
                </View>

                <View style={styles.employeeInfo}>
                  <Text style={styles.employeeName}>
                    {barber.first_name} {barber.last_name}
                  </Text>
                  <Text style={styles.employeeTitle}>{barber.title}</Text>
                </View>

                <Ionicons name="chevron-forward" size={22} color={colors.slate[400]} />
              </TouchableOpacity>
            ))}

            <View style={styles.infoCard}>
              <Ionicons name="information-circle-outline" size={22} color={colors.blue[500]} />
              <Text style={styles.infoText}>
                All our barbers are certified professionals with years of experience.
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
