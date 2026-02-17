import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/information-styles';
import { colors } from '../../styles/colors';

type BookingSuccessModalProps = {
  visible: boolean;
  onClose: () => void;
  appointmentDateLabel: string;
  startTimeLabel: string;
  serviceName: string;
  barberName: string;
};

export const BookingSuccessModal = ({
  visible,
  onClose,
  appointmentDateLabel,
  startTimeLabel,
  serviceName,
  barberName,
}: BookingSuccessModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.successIconContainer}>
            <Ionicons name="checkmark-circle" size={60} color={colors.green[500]} />
          </View>

          <Text style={styles.modalTitle}>Booking Confirmed!</Text>

          <Text style={styles.modalMessage}>
            Your appointment has been successfully booked. We look forward to seeing you!
          </Text>

          <View style={styles.modalDetails}>
            <Text style={styles.modalDetailText}>
              {appointmentDateLabel} at {startTimeLabel}
            </Text>
            <Text style={styles.modalDetailText}>
              {serviceName} with {barberName}
            </Text>
          </View>

          <TouchableOpacity style={styles.modalButton} onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.modalButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
