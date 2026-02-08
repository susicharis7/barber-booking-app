import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/appointments-styles';
import { Alert } from 'react-native';

import { api, isApiError } from '../../services/api';
import type { AppointmentDetailed } from '../../types';
import { useFocusEffect } from '@react-navigation/native';
import { formatDateShort, formatTime } from '../../utils/calendar';



/* Background Image */
const bgImage = require('../../../assets/images/appoint-bg.png');

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  confirmed: { bg: '#dcfce7', text: '#15803d', label: 'Confirmed' },
  pending:   { bg: '#fef3c7', text: '#b45309', label: 'Pending' },
  completed: { bg: '#e0e7ff', text: '#4338ca', label: 'Completed' },
  cancelled: { bg: '#fee2e2', text: '#dc2626', label: 'Cancelled' },
};

const getStatusStyle = (status: string) =>
  STATUS_STYLES[status] ?? { bg: '#f1f5f9', text: '#64748b', label: status };

type TabType = 'upcoming' | 'past';
const PAGE_SIZE = 5;


export default function AppointmentsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentDetailed[]>([]);
  const [pastAppointments, setPastAppointments] = useState<AppointmentDetailed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelingId, setCancelingId] = useState<number | null>(null);

  const [upcomingCursor, setUpcomingCursor] = useState<string | null>(null);
  const [pastCursor, setPastCursor] = useState<string | null>(null);

  const [upcomingHasMore, setUpcomingHasMore] = useState(true);
  const [pastHasMore, setPastHasMore] = useState(true);

  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [loadingPast, setLoadingPast] = useState(false);


  /* ─── Refs (source of truth for closures) ─── */
  const loadingUpcomingRef = useRef(false);
  const loadingPastRef = useRef(false);
  const upcomingCursorRef = useRef<string | null>(null);
  const pastCursorRef = useRef<string | null>(null);
  const upcomingHasMoreRef = useRef(true);
  const pastHasMoreRef = useRef(true);


  /* ─── Sync helpers (update ref + state together) ─── */
  const setUpcomingLoadingSync = (val: boolean) => {
    loadingUpcomingRef.current = val;
    setLoadingUpcoming(val);
  };

  const setPastLoadingSync = (val: boolean) => {
    loadingPastRef.current = val;
    setLoadingPast(val);
  };

  const setUpcomingCursorSync = (val: string | null) => {
    upcomingCursorRef.current = val;
    setUpcomingCursor(val);
  };

  const setPastCursorSync = (val: string | null) => {
    pastCursorRef.current = val;
    setPastCursor(val);
  };

  const setUpcomingHasMoreSync = (val: boolean) => {
    upcomingHasMoreRef.current = val;
    setUpcomingHasMore(val);
  };

  const setPastHasMoreSync = (val: boolean) => {
    pastHasMoreRef.current = val;
    setPastHasMore(val);
  };


  /* ─── Data loaders (stable references, read from refs) ─── */

  const loadUpcoming = React.useCallback(async ({
    reset = false,
    silent = false,
  }: { reset?: boolean; silent?: boolean } = {}) => {

    if (loadingUpcomingRef.current) return;
    if (!reset && !upcomingHasMoreRef.current) return;

    setUpcomingLoadingSync(true);

    if (reset) {
      setUpcomingCursorSync(null);
      setUpcomingHasMoreSync(true);
    }

    try {
      const cursor = reset ? null : upcomingCursorRef.current;
      const query = cursor
        ? `?limit=${PAGE_SIZE}&cursor=${encodeURIComponent(cursor)}`
        : `?limit=${PAGE_SIZE}`;

      const res = await api.get<{
        appointments: AppointmentDetailed[];
        nextCursor: string | null;
      }>(`/api/appointments/upcoming${query}`);

      const items = res.appointments ?? [];

      setUpcomingAppointments((prev) => (reset ? items : [...prev, ...items]));
      setUpcomingCursorSync(res.nextCursor ?? null);
      setUpcomingHasMoreSync(Boolean(res.nextCursor));

    } catch (err: unknown) {
      if (isApiError(err)) {
        if (!silent) {
          setError(err.message);
        } else {
          console.error('Silent refresh failed:', err.status, err.code, err.message);
        }
        return;
      }

      if (!silent) {
        setError('Failed to load appointments.');
      } else {
        console.error('Silent refresh failed:', err);
      }
    } finally {
      setUpcomingLoadingSync(false);
      }}, []);


  const loadPast = React.useCallback(async ({
    reset = false,
    silent = false,
  }: { reset?: boolean; silent?: boolean } = {}) => {

    if (loadingPastRef.current) return;
    if (!reset && !pastHasMoreRef.current) return;

    setPastLoadingSync(true);

    if (reset) {
      setPastCursorSync(null);
      setPastHasMoreSync(true);
    }

    try {
      const cursor = reset ? null : pastCursorRef.current;
      const query = cursor
        ? `?limit=${PAGE_SIZE}&cursor=${encodeURIComponent(cursor)}`
        : `?limit=${PAGE_SIZE}`;

      const res = await api.get<{
        appointments: AppointmentDetailed[];
        nextCursor: string | null;
      }>(`/api/appointments/past${query}`);

      const items = res.appointments ?? [];
      setPastAppointments((prev) => (reset ? items : [...prev, ...items]));
      setPastCursorSync(res.nextCursor ?? null);
      setPastHasMoreSync(Boolean(res.nextCursor));

    } catch (err: unknown) {
      if (isApiError(err)) {
        if (!silent) {
          setError(err.message);
        } else {
          console.error('Silent refresh failed:', err.status, err.code, err.message);
        }
        return;
      }

      if (!silent) {
        setError('Failed to load appointments.');
      } else {
        console.error('Silent refresh failed:', err);
      }
    } finally {
      setPastLoadingSync(false);
      }}, []);


  /* ─── Initial load ─── */

  const loadInitial = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    await Promise.all([
      loadUpcoming({ reset: true }),
      loadPast({ reset: true }),
    ]);

    setLoading(false);
  }, [loadUpcoming, loadPast]);


  useFocusEffect(
    React.useCallback(() => {
      loadInitial();

      const interval = setInterval(() => {
        Promise.all([
          loadUpcoming({ reset: true, silent: true }),
          loadPast({ reset: true, silent: true }),
        ]);
      }, 30000); 

      return () => clearInterval(interval); 
    }, [loadInitial])
  );


  /* ─── Cancel handler ─── */

  const handleCancel = async (appointmentId: number) => {
    setCancelingId(appointmentId);

    try {
      await api.put(`/api/appointments/${appointmentId}/cancel`, {});
      await Promise.all([
        loadUpcoming({ reset: true, silent: true }),
        loadPast({ reset: true, silent: true }),
      ]);
      Alert.alert('Cancelled', 'Your appointment was cancelled.');

    } catch (err: unknown) {
      if (isApiError(err)) {
        Alert.alert('Error', err.message);
        return;
      }
      Alert.alert('Error', 'Unexpected error');
    } finally {
      setCancelingId(null);
      }};



  const appointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;
  const hasAppointments = appointments.length > 0;


  return (
    <View style={styles.container}>
      {/* HERO */}
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        {/* HEADER CONTENT */}
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>BOOKINGS</Text>
          <Text style={styles.headerTitle}>My Appointments</Text>
          <Text style={styles.headerSubtitle}>
            Manage your upcoming and past bookings.
          </Text>
        </View>
      </ImageBackground>

      {/* WHITE CONTENT */}
      <View style={styles.content}>
        {/* TABS */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
            onPress={() => setActiveTab('upcoming')}
            activeOpacity={0.7}
          >
            <Ionicons
              name="calendar-outline"
              size={18}
              color={activeTab === 'upcoming' ? '#ffffff' : '#64748b'}
            />
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
              Upcoming
            </Text>
            {upcomingAppointments.length > 0 && (
              <View style={[styles.tabBadge, activeTab === 'upcoming' && styles.tabBadgeActive]}>
                <Text style={[styles.tabBadgeText, activeTab === 'upcoming' && styles.tabBadgeTextActive]}>
                  {upcomingAppointments.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'past' && styles.tabActive]}
            onPress={() => setActiveTab('past')}
            activeOpacity={0.7}
          >
            <Ionicons
              name="time-outline"
              size={18}
              color={activeTab === 'past' ? '#ffffff' : '#64748b'}
            />
            <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {/* APPOINTMENTS LIST */}
        {loading ? (
            <View style={{ paddingTop: 40, alignItems: 'center' }}>
              <ActivityIndicator size="large" />
              <Text style={{ marginTop: 12, color: '#64748b' }}>
                Loading appointments...
              </Text>
            </View>
          ) : error ? (
            <View style={{ paddingTop: 40, alignItems: 'center' }}>
              <Text style={{ color: '#dc2626' }}>{error}</Text>
            </View>
          ) : hasAppointments ? (
            <FlatList
              data={appointments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <AppointmentCard
                  appointment={item}
                  isUpcoming={activeTab === 'upcoming'}
                  onCancel={handleCancel}
                  cancelingId={cancelingId}
                />
              )}
              showsVerticalScrollIndicator={false}
              initialNumToRender={5}
              removeClippedSubviews
              onEndReachedThreshold={0.4}
              onEndReached={() => {
                if (activeTab === 'upcoming') {
                  if (!loadingUpcomingRef.current && upcomingHasMoreRef.current) loadUpcoming({ silent: true });
                } else {
                  if (!loadingPastRef.current && pastHasMoreRef.current) loadPast({ silent: true });
                }
              }}
              ListHeaderComponent={
                <Text style={styles.sectionLabel}>
                  {activeTab === 'upcoming' ? 'SCHEDULED' : 'HISTORY'}
                </Text>
              }
              ListFooterComponent={
                <>
                  {activeTab === 'upcoming' && (
                    <View style={styles.infoCard}>
                      <Ionicons name="information-circle-outline" size={22} color="#3b82f6" />
                      <Text style={styles.infoText}>
                        You can cancel or reschedule up to 2 hours before your appointment.
                      </Text>
                    </View>
                  )}
                  {(activeTab === 'upcoming' ? loadingUpcoming : loadingPast) && (
                    <View style={{ paddingVertical: 12 }}>
                      <ActivityIndicator />
                    </View>
                  )}
                </>
              }
            />

          ) : (

          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons
                name={activeTab === 'upcoming' ? 'calendar-outline' : 'time-outline'}
                size={48}
                color="#94a3b8"
              />
            </View>
            <Text style={styles.emptyTitle}>
              {activeTab === 'upcoming' ? 'No Upcoming Appointments' : 'No Past Appointments'}
            </Text>
            <Text style={styles.emptyText}>
              {activeTab === 'upcoming'
                ? 'Book your next appointment and it will appear here.'
                : 'Your appointment history will appear here.'}
            </Text>
            {activeTab === 'upcoming' && (
              <TouchableOpacity style={styles.bookButton} activeOpacity={0.7} onPress={() => navigation.navigate('Services')}>
                <Text style={styles.bookButtonText}>Book Now</Text>
                <Ionicons name="arrow-forward" size={18} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
}






type AppointmentType = AppointmentDetailed;

const AppointmentCard = React.memo(function AppointmentCard({
  appointment,
  isUpcoming,
  onCancel,
  cancelingId,
}: {
  appointment: AppointmentType;
  isUpcoming: boolean;
  onCancel: (id: number) => void;
  cancelingId: number | null;
}) {
  const status = getStatusStyle(appointment.status);
  const isCancelling = cancelingId === appointment.id;

  return (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar" size={16} color="#0f172a" />
          <Text style={styles.dateText}>{formatDateShort(appointment.date)}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <Text style={[styles.statusText, { color: status.text }]}>{status.label}</Text>
        </View>
      </View>

      <Text style={styles.serviceName}>{appointment.service.name}</Text>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={16} color="#64748b" />
          <Text style={styles.detailText}>
            {appointment.barber.first_name} {appointment.barber.last_name}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color="#64748b" />
          <Text style={styles.detailText}>
            {formatTime(appointment.start_time)} • {appointment.service.duration} min
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={16} color="#64748b" />
          <Text style={styles.detailText}>
            {Number(appointment.service.price).toFixed(2)} BAM
          </Text>
        </View>
      </View>

      {isUpcoming && appointment.status !== 'cancelled' && (
        <View style={styles.appointmentActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.7}
            disabled={isCancelling}
            onPress={() =>
              Alert.alert(
                'Cancel appointment',
                'Are you sure you want to cancel this appointment?',
                [
                  { text: 'No', style: 'cancel' },
                  { text: 'Yes, cancel', style: 'destructive', onPress: () => onCancel(appointment.id) },
                ]
              )
            }
          >
            <Ionicons name="close-circle-outline" size={16} color="#dc2626" />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});