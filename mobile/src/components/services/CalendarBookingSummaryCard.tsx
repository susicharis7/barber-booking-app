import React from 'react';
import { View, Text } from 'react-native';
import { Input } from '../ui';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/calendar-styles';
import { colors } from '../../styles/colors';

type CalendarBookingSummaryCardProps = {
  serviceName: string;
  barberName: string;
  formattedDate: string;
  selectedTime: string;
  endTime: string;
  priceText: string;
  note: string;
  onChangeNote: (value: string) => void;
  onFocusNote: () => void;
};

export const CalendarBookingSummaryCard = ({
  serviceName,
  barberName,
  formattedDate,
  selectedTime,
  endTime,
  priceText,
  note,
  onChangeNote,
  onFocusNote,
}: CalendarBookingSummaryCardProps) => {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Booking Summary</Text>

      <View style={styles.summaryRow}>
        <Ionicons name="cut-outline" size={18} color={colors.muted} />
        <Text style={styles.summaryLabel}>Service</Text>
        <Text style={styles.summaryValue}>{serviceName}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Ionicons name="person-outline" size={18} color={colors.muted} />
        <Text style={styles.summaryLabel}>Barber</Text>
        <Text style={styles.summaryValue}>{barberName}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Ionicons name="calendar-outline" size={18} color={colors.muted} />
        <Text style={styles.summaryLabel}>Date</Text>
        <Text style={styles.summaryValue}>{formattedDate}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Ionicons name="time-outline" size={18} color={colors.muted} />
        <Text style={styles.summaryLabel}>Time</Text>
        <Text style={styles.summaryValue}>
          {selectedTime} - {endTime}
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <Ionicons name="cash-outline" size={18} color={colors.muted} />
        <Text style={styles.summaryLabel}>Price</Text>
        <Text style={styles.summaryValuePrice}>{priceText}</Text>
      </View>

      <View style={styles.noteSection}>
        <Input
          label="Add a note (optional)"
          value={note}
          onChangeText={onChangeNote}
          placeholder="Any special requests..."
          multiline
          numberOfLines={3}
          onFocus={onFocusNote}
        />
      </View>
    </View>
  );
};
