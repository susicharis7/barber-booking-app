import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/information-styles';
import { colors } from '../../styles/colors';

type BookingDetailsCardProps = {
  serviceName: string;
  barberName: string;
  appointmentDateLabel: string;
  startTimeLabel: string;
  endTimeLabel: string;
  durationMinutes: number;
  note?: string;
  priceText: string;
};

export const BookingDetailsCard = ({
  serviceName,
  barberName,
  appointmentDateLabel,
  startTimeLabel,
  endTimeLabel,
  durationMinutes,
  note,
  priceText,
}: BookingDetailsCardProps) => {
  return (
    <View style={styles.detailsCard}>
      <Text style={styles.cardTitle}>Appointment Information</Text>

      <View style={styles.detailItem}>
        <View style={styles.detailIconContainer}>
          <Ionicons name="cut-outline" size={20} color={colors.primary} />
        </View>
        <View style={styles.detailInfo}>
          <Text style={styles.detailLabel}>Service</Text>
          <Text style={styles.detailValue}>{serviceName}</Text>
        </View>
      </View>

      <View style={styles.detailItem}>
        <View style={styles.detailIconContainer}>
          <Ionicons name="person-outline" size={20} color={colors.primary} />
        </View>
        <View style={styles.detailInfo}>
          <Text style={styles.detailLabel}>Barber</Text>
          <Text style={styles.detailValue}>{barberName}</Text>
        </View>
      </View>

      <View style={styles.detailItem}>
        <View style={styles.detailIconContainer}>
          <Ionicons name="calendar-outline" size={20} color={colors.primary} />
        </View>
        <View style={styles.detailInfo}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>{appointmentDateLabel}</Text>
        </View>
      </View>

      <View style={styles.detailItem}>
        <View style={styles.detailIconContainer}>
          <Ionicons name="time-outline" size={20} color={colors.primary} />
        </View>
        <View style={styles.detailInfo}>
          <Text style={styles.detailLabel}>Time</Text>
          <Text style={styles.detailValue}>
            {startTimeLabel} - {endTimeLabel}
          </Text>
        </View>
      </View>

      <View style={styles.detailItem}>
        <View style={styles.detailIconContainer}>
          <Ionicons name="hourglass-outline" size={20} color={colors.primary} />
        </View>
        <View style={styles.detailInfo}>
          <Text style={styles.detailLabel}>Duration</Text>
          <Text style={styles.detailValue}>{durationMinutes} minutes</Text>
        </View>
      </View>

      {note ? (
        <View style={styles.detailItem}>
          <View style={styles.detailIconContainer}>
            <Ionicons name="document-text-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.detailInfo}>
            <Text style={styles.detailLabel}>Note</Text>
            <Text style={styles.detailValue}>{note}</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Total Price</Text>
        <Text style={styles.priceValue}>{priceText}</Text>
      </View>
    </View>
  );
};
