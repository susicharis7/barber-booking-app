import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../../styles/screens/appointments-styles';
import { colors } from '../../styles/colors';
import type { AppointmentDetailed } from '../../types';
import { AppointmentCard } from './AppointmentCard';

type TabType = 'upcoming' | 'past';

type AppointmentsListProps = {
  activeTab: TabType;
  appointments: AppointmentDetailed[];
  loadingUpcoming: boolean;
  loadingPast: boolean;
  cancelingId: number | null;
  onCancel: (id: number) => void;
  onEndReachedUpcoming: () => void;
  onEndReachedPast: () => void;
};

export const AppointmentsList = ({
  activeTab,
  appointments,
  loadingUpcoming,
  loadingPast,
  cancelingId,
  onCancel,
  onEndReachedUpcoming,
  onEndReachedPast,
}: AppointmentsListProps) => {
  return (
    <FlatList
      data={appointments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <AppointmentCard
          appointment={item}
          isUpcoming={activeTab === 'upcoming'}
          onCancel={onCancel}
          cancelingId={cancelingId}
        />
      )}
      showsVerticalScrollIndicator={false}
      initialNumToRender={5}
      removeClippedSubviews
      onEndReachedThreshold={0.4}
      onEndReached={() => {
        if (activeTab === 'upcoming') {
          onEndReachedUpcoming();
        } else {
          onEndReachedPast();
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
              <Ionicons name="information-circle-outline" size={22} color={colors.blue[500]} />
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
  );
};
