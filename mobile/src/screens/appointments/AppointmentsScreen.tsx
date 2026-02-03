import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/appointments-styles';
import { Alert } from 'react-native';

import { api } from '../../services/api';
import type { AppointmentDetailed } from '../../types';
import { useFocusEffect } from '@react-navigation/native';



/* Background Image */
const bgImage = require('../../../assets/images/appoint-bg.png');



type TabType = 'upcoming' | 'past';


export default function AppointmentsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentDetailed[]>([]);
  const [pastAppointments, setPastAppointments] = useState<AppointmentDetailed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelingId, setCancelingId] = useState<number | null>(null);





  const loadAppointments = async (silent = false) => {
    if (!silent) {
      setLoading(true);
      setError(null);
    }
    

    try {
      const [upcomingRes, pastRes] = await Promise.all([
        api.get<{ appointments: AppointmentDetailed[] }>('/api/appointments/upcoming'),
        api.get<{ appointments: AppointmentDetailed[] }>('/api/appointments/past'),
      ]);

      setUpcomingAppointments(upcomingRes.appointments);
      setPastAppointments(pastRes.appointments);

    } catch(err: any) {
      if (!silent) {
       setError(err?.message ?? 'Failed to load appointments..');
      } else {
        console.error('Silent refresh failed: ', err);
      }
      
    } finally {
      if (!silent) setLoading(false);
    }


  };





  const handleCancel = async (appointmentId: number) => {
    setCancelingId(appointmentId);
    try {
      await api.put(`/api/appointments/${appointmentId}/cancel`, {});
      await loadAppointments(); 
      Alert.alert('Cancelled', 'Your appointment was cancelled.')
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Failed to cancel appointment');
    } finally {
      setCancelingId(null);
    }
  };





  useFocusEffect(
  React.useCallback(() => {
    loadAppointments();
  }, [])
);


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
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionLabel}>
                {activeTab === 'upcoming' ? 'SCHEDULED' : 'HISTORY'}
              </Text>

              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  isUpcoming={activeTab === 'upcoming'}
                  onCancel={handleCancel}
                  cancelingId={cancelingId}
                />
              ))}

              {activeTab === 'upcoming' && (
                <View style={styles.infoCard}>
                  <Ionicons name="information-circle-outline" size={22} color="#3b82f6" />
                  <Text style={styles.infoText}>
                    You can cancel or reschedule up to 2 hours before your appointment.
                  </Text>
                </View>
              )}
            </ScrollView>
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







/* APPOINTMENT CARD COMPONENT */
type AppointmentType = AppointmentDetailed;

function AppointmentCard({
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
  const formatDate = (dateString: string) => {
    const date = new Date(`${dateString}`);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => timeString.slice(0, 5);



  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { bg: '#dcfce7', text: '#15803d', label: 'Confirmed' };
      case 'pending':
        return { bg: '#fef3c7', text: '#b45309', label: 'Pending' };
      case 'completed':
        return { bg: '#e0e7ff', text: '#4338ca', label: 'Completed' };
      case 'cancelled':
        return { bg: '#fee2e2', text: '#dc2626', label: 'Cancelled' };
      default:
        return { bg: '#f1f5f9', text: '#64748b', label: status };
    }
  };

  const status = getStatusStyle(appointment.status);
  const isCancelling = cancelingId === appointment.id;



  return (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar" size={16} color="#0f172a" />
          <Text style={styles.dateText}>{formatDate(appointment.date)}</Text>
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
}