import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/appointments-styles';

const bgImage = require('../../../assets/images/appoint-bg.png');

// Mock data 
const mockUpcomingAppointments = [
  {
    id: 1,
    service: 'Haircut & Beard',
    barber: 'Alija Ramakic',
    date: '2026-02-15',
    time: '10:30',
    duration: 45,
    price: 25,
    status: 'confirmed',
  },
  {
    id: 2,
    service: 'Classic Haircut',
    barber: 'Alija Ramakic',
    date: '2026-02-20',
    time: '14:00',
    duration: 30,
    price: 15,
    status: 'pending',
  },
];

const mockPastAppointments = [
  {
    id: 3,
    service: 'Beard Trim',
    barber: 'Alija Ramakic',
    date: '2026-01-25',
    time: '11:00',
    duration: 20,
    price: 10,
    status: 'completed',
  },
  {
    id: 4,
    service: 'Haircut & Beard',
    barber: 'Alija Ramakic',
    date: '2026-01-10',
    time: '09:30',
    duration: 45,
    price: 25,
    status: 'completed',
  },
  {
    id: 5,
    service: 'Classic Haircut',
    barber: 'Alija Ramakic',
    date: '2025-12-28',
    time: '16:00',
    duration: 30,
    price: 15,
    status: 'cancelled',
  },
];

type TabType = 'upcoming' | 'past';

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  const appointments = activeTab === 'upcoming' ? mockUpcomingAppointments : mockPastAppointments;
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
            {mockUpcomingAppointments.length > 0 && (
              <View style={[styles.tabBadge, activeTab === 'upcoming' && styles.tabBadgeActive]}>
                <Text style={[styles.tabBadgeText, activeTab === 'upcoming' && styles.tabBadgeTextActive]}>
                  {mockUpcomingAppointments.length}
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
        {hasAppointments ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>
              {activeTab === 'upcoming' ? 'SCHEDULED' : 'HISTORY'}
            </Text>

            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                isUpcoming={activeTab === 'upcoming'}
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
              <TouchableOpacity style={styles.bookButton} activeOpacity={0.7}>
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
type AppointmentType = typeof mockUpcomingAppointments[0];

function AppointmentCard({
  appointment,
  isUpcoming,
}: {
  appointment: AppointmentType;
  isUpcoming: boolean;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

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

      <Text style={styles.serviceName}>{appointment.service}</Text>

      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={16} color="#64748b" />
          <Text style={styles.detailText}>{appointment.barber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color="#64748b" />
          <Text style={styles.detailText}>
            {appointment.time} • {appointment.duration} min
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={16} color="#64748b" />
          <Text style={styles.detailText}>${appointment.price}</Text>
        </View>
      </View>

      {isUpcoming && appointment.status !== 'cancelled' && (
        <View style={styles.appointmentActions}>
          <TouchableOpacity style={styles.rescheduleButton} activeOpacity={0.7}>
            <Ionicons name="calendar-outline" size={16} color="#0f172a" />
            <Text style={styles.rescheduleButtonText}>Reschedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} activeOpacity={0.7}>
            <Ionicons name="close-circle-outline" size={16} color="#dc2626" />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isUpcoming && appointment.status === 'completed' && (
        <View style={styles.appointmentActions}>
          <TouchableOpacity style={styles.rebookButton} activeOpacity={0.7}>
            <Ionicons name="refresh-outline" size={16} color="#ffffff" />
            <Text style={styles.rebookButtonText}>Book Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}