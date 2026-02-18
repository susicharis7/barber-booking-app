import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui';

import { styles } from '../../styles/screens/appointments-styles';
import { colors } from '../../styles/colors';
import { formatDateShort, formatTime } from '../../utils/calendar';
import type { AppointmentDetailed } from '../../types';

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  confirmed: { bg: colors.green[100], text: colors.green[500], label: 'Confirmed' },
  pending: { bg: colors.amber[100], text: colors.amber[700], label: 'Pending' },
  completed: { bg: colors.blue[50], text: colors.blue[700], label: 'Completed' },
  cancelled: { bg: colors.red[200], text: colors.red[600], label: 'Cancelled' },
};

const getStatusStyle = (status: string) =>
  STATUS_STYLES[status] ?? { bg: colors.slate[100], text: colors.muted, label: status };

type AppointmentCardProps = {
  appointment: AppointmentDetailed;
  isUpcoming: boolean;
  onCancel: (id: number) => void;
  cancelingId: number | null;
};

export const AppointmentCard = React.memo(function AppointmentCard({
  appointment,
  isUpcoming,
  onCancel,
  cancelingId,
}: AppointmentCardProps) {
  const status = getStatusStyle(appointment.status);
  const isCancelling = cancelingId === appointment.id;

  return (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar" size={16} color={colors.primary} />
          <Text style={styles.dateText}>{formatDateShort(appointment.date)}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <Text style={[styles.statusText, { color: status.text }]}>{status.label}</Text>
        </View>
      </View>

      <Text style={styles.serviceName}>{appointment.service.name}</Text>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={16} color={colors.muted} />
          <Text style={styles.detailText}>
            {appointment.barber.first_name} {appointment.barber.last_name}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color={colors.muted} />
          <Text style={styles.detailText}>
            {formatTime(appointment.start_time)} - {appointment.service.duration} min
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={16} color={colors.muted} />
          <Text style={styles.detailText}>{Number(appointment.service.price).toFixed(2)} BAM</Text>
        </View>
      </View>

      {isUpcoming && appointment.status !== 'cancelled' && (
        <View style={styles.appointmentActions}>
          <Button
            label="Cancel"
            onPress={() =>
              Alert.alert(
                'Cancel appointment',
                'Are you sure you want to cancel this appointment?',
                [
                  { text: 'No', style: 'cancel' },
                  {
                    text: 'Yes, cancel',
                    style: 'destructive',
                    onPress: () => onCancel(appointment.id),
                  },
                ],
              )
            }
            variant="danger"
            size="sm"
            leftIcon="close-circle-outline"
            disabled={isCancelling}
            loading={isCancelling}
          />
        </View>
      )}
    </View>
  );
});
