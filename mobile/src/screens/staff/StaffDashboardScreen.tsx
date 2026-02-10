import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../styles/screens/staff-screens/staffDasboard-styles';
import { colors } from '../../styles/colors';
import { formatDateShort, formatTime } from '../../utils/calendar';

import type { StaffAppointmentItem, StaffDashboardOverview } from '../../types';
import {
  cancelMyStaffAppointment,
  getMyStaffAppointments,
  getStaffDashboardOverview,
} from '../../services/staff-service';
import { isApiError } from '../../services/api';

const initialOverview: StaffDashboardOverview = {
  users_total: 0,
  customers_total: 0,
  barbers_total: 0,
  admins_total: 0,
  staff_total: 0,
  appointments_today: 0,
  upcoming_confirmed: 0,
  waiting_list_active: 0,
};

export default function StaffDashboardScreen() {
  const [overview, setOverview] = useState<StaffDashboardOverview>(initialOverview);
  const [appointments, setAppointments] = useState<StaffAppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    const [overviewData, appointmentsData] = await Promise.all([
      getStaffDashboardOverview(),
      getMyStaffAppointments(50),
    ]);

    setOverview(overviewData);
    setAppointments(appointmentsData);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        await loadDashboard();
      } catch (err) {
        if (isApiError(err) && err.status === 403) {
          setError('You do not have staff access.');
        } else {
          setError('Failed to load dashboard.');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [loadDashboard]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      setError(null);
      await loadDashboard();
    } catch (err) {
      if (isApiError(err) && err.status === 403) {
        setError('You do not have staff access.');
      } else {
        setError('Failed to refresh dashboard.');
      }
    } finally {
      setRefreshing(false);
    }
  };

  const handleCancel = async (appointmentId: number) => {
    try {
      await cancelMyStaffAppointment(appointmentId);

      setAppointments((prev) =>
        prev.map((appt) =>
          appt.appointment_id === appointmentId
            ? { ...appt, status: 'cancelled' }
            : appt
        )
      );

      Alert.alert('Success', 'Appointment cancelled.');
    } catch (err) {
      if (isApiError(err)) {
        Alert.alert('Cancel failed', err.message);
      } else {
        Alert.alert('Cancel failed', 'Unexpected error.');
      }
    }
  };

  const formatAppointmentDateTime = (appointment: StaffAppointmentItem) => {
    const date = formatDateShort(appointment.date);
    const start = formatTime(appointment.start_time);
    const end = formatTime(appointment.end_time);

    return `${date} | ${start} - ${end}`;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    >
      <Text style={styles.title}>Staff Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Overview</Text>
        <Text style={styles.item}>Users total: {overview.users_total}</Text>
        <Text style={styles.item}>Customers: {overview.customers_total}</Text>
        <Text style={styles.item}>Barbers: {overview.barbers_total}</Text>
        <Text style={styles.item}>Admins: {overview.admins_total}</Text>
        <Text style={styles.item}>Staff total: {overview.staff_total}</Text>
        <Text style={styles.item}>Appointments today: {overview.appointments_today}</Text>
        <Text style={styles.item}>Upcoming confirmed: {overview.upcoming_confirmed}</Text>
        <Text style={styles.item}>Waiting list active: {overview.waiting_list_active}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>My Appointments</Text>

        {appointments.length === 0 ? (
          <Text style={styles.emptyText}>No appointments found.</Text>
        ) : (
          appointments.map((appt) => (
            <View key={appt.appointment_id} style={styles.appointmentCard}>
              <Text style={styles.appointmentTitle}>{formatAppointmentDateTime(appt)}</Text>
              <Text style={styles.appointmentText}>Status: {appt.status}</Text>
              <Text style={styles.appointmentText}>
                Customer:{' '}
                {appt.customer
                  ? `${appt.customer.first_name} ${appt.customer.last_name}`
                  : 'Unknown'}
              </Text>
              <Text style={styles.appointmentText}>
                Service: {appt.service?.name ?? 'Unknown'}
              </Text>

              {appt.status === 'confirmed' && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancel(appt.appointment_id)}
                >
                  <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

