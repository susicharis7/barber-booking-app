import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/information-styles';

import { api } from '../../services/api';

const bgImage = require('../../../assets/images/settings-bg.png');

export default function InformationScreen({ navigation, route }: any) {
  const { employee, service, date, time, note } = route.params;
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const appointmentDate = new Date(`${date}`);
  const serviceDuration = Number(service.duration) || 0;
  const servicePrice = Number(service.price) || 0;

  const formatDate = () => {
    return appointmentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateEndTime = () => {
    const [hours, minutes] = time.split(':').map(Number);
    const endMinutes = minutes + serviceDuration;
    const endHours = hours + Math.floor(endMinutes / 60);
    const finalMinutes = endMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
  };

  const handleReserve = async () => {
    
    try {
      await api.post('/api/appointments', {
        barber_id: employee.id,
        service_id: service.id,
        date: date,
        start_time: time,
        note,
      });
      setShowSuccessModal(true);
    } catch(err: any) {
      console.error("Create appointment failed: ", err);

      Alert.alert('Reservation failed',
        err?.message ?? 'Unable to reserve this time slot.'
      )
    }

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
          <Ionicons name="chevron-back" size={22} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* HEADER CONTENT */}
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>CONFIRM</Text>
          <Text style={styles.headerTitle}>Booking Details</Text>
          <Text style={styles.headerSubtitle}>
            Review your appointment information.
          </Text>
        </View>
      </ImageBackground>

      {/* WHITE CONTENT */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* APPOINTMENT DETAILS */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Appointment Information</Text>

          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="cut-outline" size={20} color="#0f172a" />
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Service</Text>
              <Text style={styles.detailValue}>{service.name}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="person-outline" size={20} color="#0f172a" />
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Barber</Text>
              <Text style={styles.detailValue}>{employee.name}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="calendar-outline" size={20} color="#0f172a" />
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{formatDate()}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="time-outline" size={20} color="#0f172a" />
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{time} - {calculateEndTime()}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="hourglass-outline" size={20} color="#0f172a" />
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>{serviceDuration} minutes</Text>
            </View>
          </View>

          {note ? (
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <Ionicons name="document-text-outline" size={20} color="#0f172a" />
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>Note</Text>
                <Text style={styles.detailValue}>{note}</Text>
              </View>
            </View>
          ) : null}

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total Price</Text>
            <Text style={styles.priceValue}>{servicePrice.toFixed(2)} BAM</Text>
          </View>
        </View>

        {/* CANCELLATION POLICY */}
        <View style={styles.policyCard}>
          <View style={styles.policyHeader}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#0f172a" />
            <Text style={styles.policyTitle}>Cancellation Policy</Text>
          </View>

          <View style={styles.policyItem}>
            <Ionicons name="checkmark-circle" size={18} color="#10b981" />
            <Text style={styles.policyText}>
              Free cancellation up to 2 hours before the appointment.
            </Text>
          </View>

          <View style={styles.policyItem}>
            <Ionicons name="checkmark-circle" size={18} color="#10b981" />
            <Text style={styles.policyText}>
              Reschedule anytime before the appointment starts.
            </Text>
          </View>

          <View style={styles.policyItem}>
            <Ionicons name="alert-circle" size={18} color="#f59e0b" />
            <Text style={styles.policyText}>
              No-shows may result in restricted booking privileges.
            </Text>
          </View>
        </View>

        {/* RESERVE BUTTON */}
        <TouchableOpacity
          style={styles.reserveButton}
          activeOpacity={0.7}
          onPress={handleReserve}
        >
          <Text style={styles.reserveButtonText}>Confirm Reservation</Text>
          <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>

      {/* SUCCESS MODAL */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={handleSuccessClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={60} color="#10b981" />
            </View>

            <Text style={styles.modalTitle}>Booking Confirmed!</Text>

            <Text style={styles.modalMessage}>
              Your appointment has been successfully booked. We look forward to seeing you!
            </Text>

            <View style={styles.modalDetails}>
              <Text style={styles.modalDetailText}>
                {formatDate()} at {time}
              </Text>
              <Text style={styles.modalDetailText}>
                {service.name} with {employee.name}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSuccessClose}
              activeOpacity={0.7}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
