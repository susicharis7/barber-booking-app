import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/screens/staff-screens/staffDasboard-styles';
import { colors } from '../../styles/colors';
import { formatDate, formatTime, toLocalDate } from '../../utils/calendar';
import CalendarPicker from '../../components/calendar-component/CalendarPicker';

import type { StaffAppointmentItem, StaffDashboardOverview } from '../../types';
import {
  cancelMyStaffAppointment,
  getMyStaffAppointmentDays,
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

const STATUS_META: Record<
  StaffAppointmentItem['status'],
  { label: string; bg: string; text: string }
> = {
  confirmed: { label: 'Confirmed', bg: colors.green[100], text: colors.green[500] },
  completed: { label: 'Completed', bg: colors.blue[100], text: colors.blue[700] },
  cancelled: { label: 'Cancelled', bg: colors.red[100], text: colors.red[600] },
};

const formatPrice = (value: number | string | undefined) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return '-';
  return `${parsed.toFixed(2)} BAM`;
};

const PAGE_SIZE = 5;

export default function StaffDashboardScreen() {
  const [overview, setOverview] = useState<StaffDashboardOverview>(initialOverview);
  const [appointments, setAppointments] = useState<StaffAppointmentItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [expandedAppointmentId, setExpandedAppointmentId] = useState<number | null>(null);
  const [cancelingId, setCancelingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [overviewError, setOverviewError] = useState<string | null>(null);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [markedDates, setMarkedDates] = useState<string[]>([]);

  const loadingAppointmentsRef = useRef(false);
  const hasMoreRef = useRef(true);
  const cursorRef = useRef<string | null>(null);
  const initializedRef = useRef(false);
  const monthDotsCacheRef = useRef<Record<string, string[]>>({});

  const selectedDateKey = useMemo(() => toLocalDate(selectedDate), [selectedDate]);

  const setLoadingAppointmentsSync = (value: boolean) => {
    loadingAppointmentsRef.current = value;
    setLoadingAppointments(value);
  };

  const setHasMoreSync = (value: boolean) => {
    hasMoreRef.current = value;
    setHasMore(value);
  };

  const setCursorSync = (value: string | null) => {
    cursorRef.current = value;
  };

  const loadOverview = useCallback(async () => {
    const overviewData = await getStaffDashboardOverview();
    setOverview(overviewData);
  }, []);

  const loadMonthDots = useCallback(
    async (year: number, month: number, force = false) => {
      const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;

      if (!force && monthDotsCacheRef.current[monthKey]) {
        setMarkedDates(monthDotsCacheRef.current[monthKey]);
        return;
      }

      try {
        const from = toLocalDate(new Date(year, month, 1));
        const to = toLocalDate(new Date(year, month + 1, 0));
        const days = await getMyStaffAppointmentDays(from, to);
        const dateKeys = days.map((item) => item.date);

        monthDotsCacheRef.current[monthKey] = dateKeys;
        setMarkedDates(dateKeys);
      } catch (err) {
        if (isApiError(err)) {
          console.error('Load month dots error:', err.status, err.code, err.message);
        } else {
          console.error('Load month dots error:', err);
        }
        setMarkedDates([]);
      }
    },
    []
  );

  const loadAppointments = useCallback(
    async ({
      reset = false,
      silent = false,
    }: { reset?: boolean; silent?: boolean } = {}) => {
      if (loadingAppointmentsRef.current) return;
      if (!reset && !hasMoreRef.current) return;

      setLoadingAppointmentsSync(true);
      if (reset) {
        setCursorSync(null);
        setHasMoreSync(true);
      }

      try {
        const response = await getMyStaffAppointments({
          limit: PAGE_SIZE,
          cursor: reset ? null : cursorRef.current,
          date: selectedDateKey,
        });

        const items = response.appointments ?? [];
        setAppointments((prev) => (reset ? items : [...prev, ...items]));
        setCursorSync(response.nextCursor ?? null);
        setHasMoreSync(Boolean(response.nextCursor));
        if (!silent) setAppointmentsError(null);
      } catch (err) {
        if (!silent) {
          if (isApiError(err)) {
            setAppointmentsError(err.message);
          } else {
            setAppointmentsError('Failed to load appointments.');
          }
        }
      } finally {
        setLoadingAppointmentsSync(false);
      }
    },
    [selectedDateKey]
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!initializedRef.current) {
          setLoading(true);
          await Promise.all([
            loadOverview(),
            loadMonthDots(selectedDate.getFullYear(), selectedDate.getMonth(), true),
          ]);
          initializedRef.current = true;
        }

        await loadAppointments({ reset: true });
      } catch (err) {
        if (isApiError(err)) {
          if (err.status === 403) {
            setOverviewError('You do not have staff access.');
          } else {
            setOverviewError(err.message);
          }
        } else {
          setOverviewError('Failed to load dashboard.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loadOverview, loadAppointments, loadMonthDots, selectedDate]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      setOverviewError(null);
      setAppointmentsError(null);
      await Promise.all([
        loadOverview(),
        loadAppointments({ reset: true }),
        loadMonthDots(selectedDate.getFullYear(), selectedDate.getMonth(), true),
      ]);
    } catch (err) {
      if (isApiError(err) && err.status === 403) {
        setOverviewError('You do not have staff access.');
      } else {
        setOverviewError('Failed to refresh dashboard.');
      }
    } finally {
      setRefreshing(false);
    }
  };

  const handleCancel = async (appointmentId: number) => {
    setCancelingId(appointmentId);
    try {
      await cancelMyStaffAppointment(appointmentId);
      await Promise.all([
        loadOverview(),
        loadAppointments({ reset: true, silent: true }),
        loadMonthDots(selectedDate.getFullYear(), selectedDate.getMonth(), true),
      ]);
      Alert.alert('Success', 'Appointment cancelled.');
    } catch (err) {
      if (isApiError(err)) {
        Alert.alert('Cancel failed', err.message);
      } else {
        Alert.alert('Cancel failed', 'Unexpected error.');
      }
    } finally {
      setCancelingId(null);
    }
  };

  const selectedDateLabel = useMemo(
    () =>
      formatDate(selectedDate, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    [selectedDate]
  );

  const toggleExpandedAppointment = (appointmentId: number) => {
    setExpandedAppointmentId((prev) => (prev === appointmentId ? null : appointmentId));
  };

  const handleCalendarMonthChange = useCallback(
    (year: number, month: number) => {
      loadMonthDots(year, month);
    },
    [loadMonthDots]
  );

  const confirmCancel = (appointmentId: number) => {
    Alert.alert(
      'Cancel appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes, cancel', style: 'destructive', onPress: () => handleCancel(appointmentId) },
      ]
    );
  };

  const summaryStats = [
    { label: 'Today', value: overview.appointments_today, icon: 'calendar-outline' as const },
    { label: 'Upcoming', value: overview.upcoming_confirmed, icon: 'time-outline' as const },
    { label: 'Waitlist', value: overview.waiting_list_active, icon: 'list-outline' as const },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (overviewError) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.center}>
          <Text style={styles.errorText}>{overviewError}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => String(item.appointment_id)}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          if (!loadingAppointmentsRef.current && hasMoreRef.current) {
            loadAppointments({ silent: true });
          }
        }}
        ListHeaderComponent={
          <>
            <View style={styles.heroCard}>
              <View style={styles.heroTopRow}>
                <View>
                  <Text style={styles.heroEyebrow}>STAFF CONTROL PANEL</Text>
                  <Text style={styles.heroTitle}>My Dashboard</Text>
                  <Text style={styles.heroSubtitle}>Operational view for appointments and staffing.</Text>
                </View>
                <View style={styles.heroIconCircle}>
                  <Ionicons name="analytics-outline" size={22} color={colors.white} />
                </View>
              </View>

              <View style={styles.statsRow}>
                {summaryStats.map((stat) => (
                  <View key={stat.label} style={styles.statCard}>
                    <Ionicons name={stat.icon} size={16} color={colors.slate[500]} />
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.sectionCard}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Overview</Text>
                <Ionicons name="grid-outline" size={18} color={colors.slate[500]} />
              </View>
              <View style={styles.overviewGrid}>
                <View style={styles.overviewItem}>
                  <Text style={styles.overviewLabel}>Users</Text>
                  <Text style={styles.overviewValue}>{overview.users_total}</Text>
                </View>
                <View style={styles.overviewItem}>
                  <Text style={styles.overviewLabel}>Customers</Text>
                  <Text style={styles.overviewValue}>{overview.customers_total}</Text>
                </View>
                <View style={styles.overviewItem}>
                  <Text style={styles.overviewLabel}>Barbers</Text>
                  <Text style={styles.overviewValue}>{overview.barbers_total}</Text>
                </View>
                <View style={styles.overviewItem}>
                  <Text style={styles.overviewLabel}>Admins</Text>
                  <Text style={styles.overviewValue}>{overview.admins_total}</Text>
                </View>
                <View style={styles.overviewItem}>
                  <Text style={styles.overviewLabel}>Staff Total</Text>
                  <Text style={styles.overviewValue}>{overview.staff_total}</Text>
                </View>
              </View>
            </View>

            <View style={styles.sectionCard}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>My Appointments</Text>
                <Ionicons name="calendar-number-outline" size={18} color={colors.slate[500]} />
              </View>
              <Text style={styles.sectionSubtitle}>
                Pick a date and manage all appointments for that day.
              </Text>

              <CalendarPicker
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setExpandedAppointmentId(null);
                  setAppointmentsError(null);
                  setAppointments([]);
                }}
                markedDates={markedDates}
                onMonthChange={handleCalendarMonthChange}
              />

              <View style={styles.selectedDateRow}>
                <Text style={styles.selectedDateText}>{selectedDateLabel}</Text>
                <View style={styles.selectedDateCountBadge}>
                  <Text style={styles.selectedDateCountText}>
                    {appointments.length} loaded
                  </Text>
                </View>
              </View>

              {appointmentsError ? (
                <View style={styles.emptyDayCard}>
                  <Text style={styles.emptyDayTitle}>Cannot load appointments</Text>
                  <Text style={styles.emptyDayText}>{appointmentsError}</Text>
                  <TouchableOpacity
                    style={styles.retryInlineButton}
                    onPress={() => loadAppointments({ reset: true })}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.retryInlineButtonText}>Retry</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </>
        }
        renderItem={({ item: appointment }) => {
          const statusMeta = STATUS_META[appointment.status];
          const isExpanded = expandedAppointmentId === appointment.appointment_id;
          const isCanceling = cancelingId === appointment.appointment_id;
          const customerName = appointment.customer
            ? `${appointment.customer.first_name} ${appointment.customer.last_name}`
            : 'Unknown customer';

          return (
            <TouchableOpacity
              style={styles.appointmentCard}
              activeOpacity={0.8}
              onPress={() => toggleExpandedAppointment(appointment.appointment_id)}
            >
              <View style={styles.appointmentRowTop}>
                <View style={styles.appointmentTimeChip}>
                  <Ionicons name="time-outline" size={14} color={colors.secondary} />
                  <Text style={styles.appointmentTimeText}>
                    {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.appointmentStatusPill,
                    { backgroundColor: statusMeta.bg },
                  ]}
                >
                  <Text
                    style={[
                      styles.appointmentStatusText,
                      { color: statusMeta.text },
                    ]}
                  >
                    {statusMeta.label}
                  </Text>
                </View>
              </View>

              <Text style={styles.appointmentPrimaryText}>{customerName}</Text>
              <Text style={styles.appointmentSecondaryText}>
                {appointment.service?.name ?? 'Unknown service'}
              </Text>

              <View style={styles.appointmentFooterRow}>
                <Text style={styles.appointmentFooterText}>
                  Tap to {isExpanded ? 'collapse' : 'expand'}
                </Text>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={colors.slate[500]}
                />
              </View>

              {isExpanded && (
                <View style={styles.appointmentExpanded}>
                  <View style={styles.appointmentDetailRow}>
                    <Ionicons name="mail-outline" size={14} color={colors.slate[500]} />
                    <Text style={styles.appointmentDetailText}>
                      {appointment.customer?.email ?? 'No customer email'}
                    </Text>
                  </View>

                  <View style={styles.appointmentDetailRow}>
                    <Ionicons name="cut-outline" size={14} color={colors.slate[500]} />
                    <Text style={styles.appointmentDetailText}>
                      {appointment.service?.duration ?? '-'} min |{' '}
                      {formatPrice(appointment.service?.price)}
                    </Text>
                  </View>

                  {appointment.note ? (
                    <>
                      <Text style={styles.appointmentNoteLabel}>Note</Text>
                      <Text style={styles.appointmentNoteText}>{appointment.note}</Text>
                    </>
                  ) : null}

                  {appointment.status === 'confirmed' ? (
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => confirmCancel(appointment.appointment_id)}
                      disabled={isCanceling}
                      activeOpacity={0.8}
                    >
                      {isCanceling ? (
                        <ActivityIndicator size="small" color={colors.white} />
                      ) : (
                        <>
                          <Ionicons name="close-circle-outline" size={16} color={colors.white} />
                          <Text style={styles.cancelButtonText}>Cancel appointment</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  ) : null}
                </View>
              )}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          !loadingAppointments ? (
            <View style={styles.emptyDayCard}>
              <Text style={styles.emptyDayTitle}>No appointments for this date</Text>
              <Text style={styles.emptyDayText}>Choose another date from the calendar.</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          <View style={styles.listFooter}>
            {loadingAppointments ? <ActivityIndicator size="small" color={colors.primary} /> : null}
            {!loadingAppointments && !hasMore && appointments.length > 0 ? (
              <Text style={styles.footerText}>End of list</Text>
            ) : null}
          </View>
        }
      />
    </SafeAreaView>
  );
}

