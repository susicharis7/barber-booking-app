import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/settings-screens/waitingList-styles';
import { colors } from '../../styles/colors';

type WaitingListEmptyStateProps = {
  onBrowseServices: () => void;
};

export const WaitingListEmptyState = ({ onBrowseServices }: WaitingListEmptyStateProps) => {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="list-outline" size={48} color={colors.slate[400]} />
      </View>
      <Text style={styles.emptyTitle}>No Waiting Requests</Text>
      <Text style={styles.emptyText}>
        When you join a waiting list for a fully booked time slot, it will appear here.
      </Text>
      <TouchableOpacity style={styles.browseButton} onPress={onBrowseServices} activeOpacity={0.7}>
        <Text style={styles.browseButtonText}>Browse Services</Text>
        <Ionicons name="arrow-forward" size={18} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};
