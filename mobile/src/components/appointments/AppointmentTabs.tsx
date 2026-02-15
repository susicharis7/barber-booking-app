import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../../styles/screens/appointments-styles';
import { colors } from '../../styles/colors';

type TabType = 'upcoming' | 'past';

type AppointmentsTabsProps = {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  upcomingCount: number;
};

export const AppointmentsTabs = ({
  activeTab,
  onChangeTab,
  upcomingCount,
}: AppointmentsTabsProps) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
        onPress={() => onChangeTab('upcoming')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="calendar-outline"
          size={18}
          color={activeTab === 'upcoming' ? colors.white : colors.muted}
        />
        <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
          Upcoming
        </Text>
        {upcomingCount > 0 && (
          <View style={[styles.tabBadge, activeTab === 'upcoming' && styles.tabBadgeActive]}>
            <Text
              style={[styles.tabBadgeText, activeTab === 'upcoming' && styles.tabBadgeTextActive]}
            >
              {upcomingCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'past' && styles.tabActive]}
        onPress={() => onChangeTab('past')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="time-outline"
          size={18}
          color={activeTab === 'past' ? colors.white : colors.muted}
        />
        <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>Past</Text>
      </TouchableOpacity>
    </View>
  );
};
