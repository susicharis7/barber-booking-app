import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/information-styles';
import { colors } from '../../styles/colors';
import { formatDate, formatTime } from '../../utils/calendar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ServicesStackParamList } from '../../navigation/types';
import { useReserveAppointment } from '../../hooks/services/useReserveAppointment';
import { BookingDetailsCard } from '../../components/services/BookingDetailsCard';
import { BookingPolicyCard } from '../../components/services/BookingPolicyCard';
import { BookingSuccessModal } from '../../components/services/BookingSuccessModal';

const bgImage = require('../../../assets/images/settings-bg.png');
type InformationScreenProps = NativeStackScreenProps<ServicesStackParamList, 'Information'>;

export default function InformationScreen({ navigation, route }: InformationScreenProps) {
  const { employee, service, date, time, note } = route.params;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { reserving, reserve } = useReserveAppointment();

  const serviceDuration = Number(service.duration) || 0;
  const servicePrice = Number(service.price) || 0;
  const appointmentDateLabel = formatDate(date, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const startTimeLabel = formatTime(time);

  const calculateEndTime = () => {
    const [hours, minutes] = time.split(':').map(Number);
    const endMinutes = minutes + serviceDuration;
    const endHours = hours + Math.floor(endMinutes / 60);
    const finalMinutes = endMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
  };

  const handleReserve = async () => {
    const result = await reserve({
      barber_id: employee.id,
      service_id: service.id,
      date,
      start_time: time,
      note,
    });

    if (result.ok) {
      setShowSuccessModal(true);
      return;
    }

    if (result.status === 409) {
      Alert.alert('Slot unavailable', result.message);
      return;
    }

    if (result.status === 401) {
      Alert.alert('Session expired', 'Please log in again');
      return;
    }

    Alert.alert('Error', result.message);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigation.popToTop();
    navigation.getParent()?.navigate('Appointments');
  };

  return (
    <View style={styles.container}>
      {/* HERO */}
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={colors.white} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* HEADER CONTENT */}
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>CONFIRM</Text>
          <Text style={styles.headerTitle}>Booking Details</Text>
          <Text style={styles.headerSubtitle}>Review your appointment information.</Text>
        </View>
      </ImageBackground>

      {/* WHITE CONTENT */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* APPOINTMENT DETAILS */}
        <BookingDetailsCard
          serviceName={service.name}
          barberName={employee.name}
          appointmentDateLabel={appointmentDateLabel}
          startTimeLabel={startTimeLabel}
          endTimeLabel={calculateEndTime()}
          durationMinutes={serviceDuration}
          note={note}
          priceText={`${servicePrice.toFixed(2)} BAM`}
        />

        {/* CANCELLATION POLICY */}
        <BookingPolicyCard />

        {/* RESERVE BUTTON */}
        <TouchableOpacity
          style={styles.reserveButton}
          activeOpacity={0.7}
          onPress={handleReserve}
          disabled={reserving}
        >
          <Text style={styles.reserveButtonText}>
            {reserving ? 'Reserving...' : 'Confirm Reservation'}
          </Text>
          <Ionicons name="checkmark-circle" size={20} color={colors.white} />
        </TouchableOpacity>
      </ScrollView>

      {/* SUCCESS MODAL */}
      <BookingSuccessModal
        visible={showSuccessModal}
        onClose={handleSuccessClose}
        appointmentDateLabel={appointmentDateLabel}
        startTimeLabel={startTimeLabel}
        serviceName={service.name}
        barberName={employee.name}
      />
    </View>
  );
}
