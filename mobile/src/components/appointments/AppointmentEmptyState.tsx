import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../../styles/screens/appointments-styles';
import { colors } from '../../styles/colors';

type TabType = 'upcoming' | 'past';

type AppointmentsEmptyStateProps = {
  activeTab: TabType;
  onPressBookNow: () => void;
};

export const AppointmentsEmptyState = ({
  activeTab,
  onPressBookNow,
}: AppointmentsEmptyStateProps) => {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Ionicons
          name={activeTab === 'upcoming' ? 'calendar-outline' : 'time-outline'}
          size={48}
          color={colors.slate[400]}
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
        <TouchableOpacity style={styles.bookButton} activeOpacity={0.7} onPress={onPressBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={18} color={colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};
