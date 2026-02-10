import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/home-styles';
import { colors } from '../../styles/colors';

import MapView, { Marker } from 'react-native-maps';

const homeBg = require('../../../assets/images/home-bg.png');
const logo = require('../../../assets/images/logo.png');

const BARBER_LOCATION = {
  latitude: 44.821766031006305,
  longitude: 15.863504410644202,
};

export default function HomeScreen({ navigation }: any) {
  const schedule = [
    { day: 'MON', time: 'Closed', active: false },
    { day: 'TUE', time: '11:00 - 18:00', active: true },
    { day: 'WED', time: '11:00 - 18:00', active: true },
    { day: 'THU', time: '11:00 - 18:00', active: true },
    { day: 'FRI', time: '11:00 - 18:00', active: true },
    { day: 'SAT', time: '09:00 - 15:00', active: true },
    { day: 'SUN', time: 'Closed', active: false },
  ];

  const mapRef = useRef<MapView | null>(null);

  const recenterMap = () => {
    mapRef.current?.animateToRegion(
      {
        ...BARBER_LOCATION,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      500 
    );
};


  return (
    <View style={styles.container}>
      <ImageBackground source={homeBg} style={styles.bg} resizeMode="cover">
        <View style={styles.overlay} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* HERO SPACE */}
          <View style={styles.heroSpacer} />

          {/* LOGO */}
          <Image source={logo} style={styles.logo} resizeMode="contain" />

          {/* Reservations */}
          <TouchableOpacity 
            style={styles.primaryButton} 
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Services')}
          >
            <Text style={styles.primaryButtonText}>RESERVATIONS</Text>
          </TouchableOpacity>

          {/* ABOUT */}
          <View style={styles.section}>
            <Text style={styles.sectionKicker}>About us</Text>
            <Text style={styles.sectionTitle}>UNA BARBERINA</Text>

            <Text style={styles.paragraph}>
              Welcome to our Barber Shop, where tradition meets modern style. Our goal is for every guest to leave feeling satisfied and confident.
            </Text>

            <Text style={styles.paragraph}>
              We are dedicated to quality, attention to detail, and a personalized approach for every client in a relaxed and professional atmosphere.
            </Text>
          </View>

          {/* VISIT */}
          <View style={styles.section}>
            <Text style={styles.sectionKicker}>Working Hours</Text>
            <Text style={styles.sectionTitle}>Visit us Today</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.daysRow}
            >
              {schedule.map((item) => (
                <View
                  key={item.day}
                  style={[
                    styles.dayChip,
                    item.active
                      ? styles.dayChipLight
                      : styles.dayChipDark,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayChipDay,
                      item.active
                        ? styles.dayChipDayDarkText
                        : styles.dayChipDayLightText,
                    ]}
                  >
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      styles.dayChipTime,
                      item.active
                        ? styles.dayChipDayDarkText
                        : styles.dayChipDayLightText,
                    ]}
                  >
                    {item.time}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* CONTACT */}
          <View style={styles.section}>
            <Text style={styles.sectionKicker}>Contact</Text>
            <Text style={styles.sectionTitle}>Find us</Text>

            <View style={styles.contactWrap}>
              <View style={styles.contactItem}>
                <Ionicons
                  name="call-outline"
                  size={28}
                  color={colors.alpha.white65}
                />
                <Text style={styles.contactText}>+387 61 537 551</Text>
              </View>

              <View style={styles.socialItem}>
                <Ionicons
                  name="logo-instagram"
                  size={34}
                  color={colors.alpha.white45}
                />
                <Text style={styles.socialText}>@una_barberina_studio</Text>
              </View>

              <View style={styles.socialItem}>
                <Ionicons
                  name="logo-tiktok"
                  size={34}
                  color={colors.alpha.white45}
                />
                <Text style={styles.socialText}>@unabarberina</Text>
              </View>
            </View>
          </View>

          
          {/* MAP */}
            <View style={styles.section}>
              <Text style={styles.locationText}>Location</Text>
              <View style={styles.mapCard}>
                <MapView
                  ref={mapRef}
                  provider='google'
                  style={styles.map}
                  initialRegion={{
                    ...BARBER_LOCATION,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                >
                  <Marker
                    coordinate={BARBER_LOCATION}
                    title="UNA BARBERINA"
                    description="Barber Studio"
                  />
                </MapView>

                <TouchableOpacity
                  style={styles.recenterButton}
                  onPress={recenterMap}
                  activeOpacity={0.85}
                >
                  <Ionicons name="locate-outline" size={20} color={colors.gray[900]} />
                </TouchableOpacity>

              </View>
            </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
