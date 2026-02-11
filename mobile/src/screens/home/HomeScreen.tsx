import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/home-styles';
import { colors } from '../../styles/colors';
import MapView, { Marker } from 'react-native-maps';
import { api } from '../../services/api';

const homeBg = require('../../../assets/images/home-bg.png');
const logo = require('../../../assets/images/logo.png');

const BARBER_LOCATION = {
  latitude: 44.821766031006305,
  longitude: 15.863504410644202,
};

const DISPLAY_DAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;

const DAY_LABELS: Record<number, string> = {
  0: 'SUN',
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT',
};

type WeeklyHour = {
  day_of_week: number;
  start_time: string;
  end_time: string;
};

type ScheduleItem = {
  day: string;
  time: string;
  active: boolean;
};

const toHm = (value: string) => value.slice(0, 5);

const CLOSED_SCHEDULE: ScheduleItem[] = DISPLAY_DAY_ORDER.map((day) => ({
  day: DAY_LABELS[day],
  time: 'Closed',
  active: false,
}));

const buildSchedule = (weeklyHours: WeeklyHour[]): ScheduleItem[] => {
  const byDay = new Map<number, WeeklyHour>();
  for (const row of weeklyHours) {
    byDay.set(row.day_of_week, row);
  }

  return DISPLAY_DAY_ORDER.map((day) => {
    const row = byDay.get(day);
    if (!row) {
      return {
        day: DAY_LABELS[day],
        time: 'Closed',
        active: false,
      };
    }

    return {
      day: DAY_LABELS[day],
      time: `${toHm(row.start_time)} - ${toHm(row.end_time)}`,
      active: true,
    };
  });
};

export default function HomeScreen({ navigation }: any) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(CLOSED_SCHEDULE);
  const [loadingSchedule, setLoadingSchedule] = useState(true);

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

  useEffect(() => {
    let mounted = true;

    const loadSchedule = async () => {
      try {
        const data = await api.get<{ weeklyHours: WeeklyHour[] }>(
          '/api/barbers/weekly-hours',
          false
        );

        if (!mounted) return;
        setSchedule(buildSchedule(data.weeklyHours ?? []));
      } catch (error) {
        console.error('Load weekly hours error:', error);
        if (!mounted) return;
        setSchedule(CLOSED_SCHEDULE);
      } finally {
        if (mounted) setLoadingSchedule(false);
      }
    };

    loadSchedule();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={homeBg} style={styles.bg} resizeMode="cover">
        <View style={styles.overlay} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.heroSpacer} />

          <Image source={logo} style={styles.logo} resizeMode="contain" />

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Services')}
          >
            <Text style={styles.primaryButtonText}>RESERVATIONS</Text>
          </TouchableOpacity>

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

          <View style={styles.section}>
            <Text style={styles.sectionKicker}>Working Hours</Text>
            <Text style={styles.sectionTitle}>Visit us Today</Text>

            {loadingSchedule ? (
              <View style={{ paddingVertical: 14, alignItems: 'center' }}>
                <ActivityIndicator color={colors.white} />
              </View>
            ) : (
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
                      item.active ? styles.dayChipLight : styles.dayChipDark,
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
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionKicker}>Contact</Text>
            <Text style={styles.sectionTitle}>Find us</Text>

            <View style={styles.contactWrap}>
              <View style={styles.contactItem}>
                <Ionicons name="call-outline" size={28} color={colors.alpha.white65} />
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

          <View style={styles.section}>
            <Text style={styles.locationText}>Location</Text>
            <View style={styles.mapCard}>
              <MapView
                ref={mapRef}
                provider="google"
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
