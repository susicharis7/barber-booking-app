import React from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useAppointmentsRefresh } from '../../hooks/appointments/useAppointmentsRefresh';
import { useCancelAppointment } from '../../hooks/appointments/useCancelAppointment';
import { useAppointmentsFeed } from '../../hooks/appointments/useAppointmentsFeed';
import { AppointmentsTabs } from '../../components/appointments/AppointmentTabs';
import { AppointmentsHeader } from '../../components/appointments/AppointmentHeader';
import { AppointmentsEmptyState } from '../../components/appointments/AppointmentEmptyState';
import { AppointmentsList } from '../../components/appointments/AppointmentList';

import { styles } from '../../styles/screens/appointments-styles';
import { colors } from '../../styles/colors';
import type { MainTabParamList } from '../../navigation/types';

const PAGE_SIZE = 5;
type AppointmentsScreenProps = BottomTabScreenProps<MainTabParamList, 'Appointments'>;



export default function AppointmentsScreen({ navigation }: AppointmentsScreenProps) {
  const {
    activeTab,
    setActiveTab,
    appointments,
    upcomingAppointments,
    loading,
    error,
    loadingUpcoming,
    loadingPast,
    hasAppointments,
    loadUpcoming,
    loadPast,
    loadInitial,
  } = useAppointmentsFeed(PAGE_SIZE);

  const refreshSilently = React.useCallback(async (): Promise<void> => {
    await Promise.all([
      loadUpcoming({ reset: true, silent: true }),
      loadPast({ reset: true, silent: true }),
    ]);
  }, [loadUpcoming, loadPast]);

  useAppointmentsRefresh({
    onFocus: loadInitial,
    onInterval: refreshSilently,
  });


  const { cancelingId, handleCancel } = useCancelAppointment({
    refreshAll: refreshSilently,
  });

  const handleCancelWithFeedback = React.useCallback(
  async (appointmentId: number) => {
    const result = await handleCancel(appointmentId);

    if (result.ok) {
      Alert.alert('Cancelled', 'Your appointment was cancelled.');
      return;
    }

    Alert.alert('Error', result.message);
  },
  [handleCancel],
);


  return (
    <View style={styles.container}>
      <AppointmentsHeader />

      <View style={styles.content}>
        <AppointmentsTabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          upcomingCount={upcomingAppointments.length}
        />

        {loading ? (
          <View style={{ paddingTop: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 12, color: colors.muted }}>Loading appointments...</Text>
          </View>
        ) : error ? (
          <View style={{ paddingTop: 40, alignItems: 'center' }}>
            <Text style={{ color: colors.error }}>{error}</Text>
          </View>
        ) : hasAppointments ? (
          <AppointmentsList
            activeTab={activeTab}
            appointments={appointments}
            loadingUpcoming={loadingUpcoming}
            loadingPast={loadingPast}
            cancelingId={cancelingId}
            onCancel={handleCancelWithFeedback}
            onEndReachedUpcoming={() => {
              void loadUpcoming({ silent: true });
            }}
            onEndReachedPast={() => {
              void loadPast({ silent: true });
            }}
          />
        ) : (
          <AppointmentsEmptyState
            activeTab={activeTab}
            onPressBookNow={() => navigation.navigate('Services')}
          />
        )}
      </View>
    </View>
  );
}
