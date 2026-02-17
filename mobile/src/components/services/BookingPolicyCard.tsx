import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/information-styles';
import { colors } from '../../styles/colors';

export const BookingPolicyCard = () => {
  return (
    <View style={styles.policyCard}>
      <View style={styles.policyHeader}>
        <Ionicons name="shield-checkmark-outline" size={22} color={colors.primary} />
        <Text style={styles.policyTitle}>Cancellation Policy</Text>
      </View>

      <View style={styles.policyItem}>
        <Ionicons name="checkmark-circle" size={18} color={colors.green[500]} />
        <Text style={styles.policyText}>
          Free cancellation up to 2 hours before the appointment.
        </Text>
      </View>

      <View style={styles.policyItem}>
        <Ionicons name="checkmark-circle" size={18} color={colors.green[500]} />
        <Text style={styles.policyText}>Reschedule anytime before the appointment starts.</Text>
      </View>

      <View style={styles.policyItem}>
        <Ionicons name="alert-circle" size={18} color={colors.amber[500]} />
        <Text style={styles.policyText}>No-shows may result in restricted booking privileges.</Text>
      </View>
    </View>
  );
};
