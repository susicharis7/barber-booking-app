import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/calendar-styles';
import { colors } from '../../styles/colors';
import { formatDate } from '../../utils/calendar';

type CalendarTimeSlotsSectionProps = {
  availableCount: number;
  bookedSlotsError: string | null;
  isAvailabilityLoading: boolean;
  isSelectedDayOver: boolean;
  isSearchingNext: boolean;
  nextAvailableDate: Date | null;
  availableTimes: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  onSelectDate: (date: Date) => void;
  onJoinWaitingList: () => void;
  selectedSummaryText: string | null;
};

export const CalendarTimeSlotsSection = ({
  availableCount,
  bookedSlotsError,
  isAvailabilityLoading,
  isSelectedDayOver,
  isSearchingNext,
  nextAvailableDate,
  availableTimes,
  selectedTime,
  onSelectTime,
  onSelectDate,
  onJoinWaitingList,
  selectedSummaryText,
}: CalendarTimeSlotsSectionProps) => {
  return (
    <View style={styles.timeSlotsSection}>
      <View style={styles.timeSlotsHeader}>
        <Text style={[styles.sectionLabel, styles.sectionLabelTight]}>AVAILABLE TIMES</Text>
        <View style={styles.timeSlotsBadge}>
          <Text style={styles.timeSlotsBadgeText}>{availableCount} slots</Text>
        </View>
      </View>

      {bookedSlotsError ? (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: colors.error, textAlign: 'center' }}>{bookedSlotsError}</Text>
        </View>
      ) : null}

      {isAvailabilityLoading ? (
        <View style={{ paddingVertical: 18, alignItems: 'center' }}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : isSelectedDayOver ? (
        <View style={styles.noSlotsCard}>
          <Text style={styles.noSlotsTitle}>This day is finished</Text>
          <Text style={styles.noSlotsText}>Please select another date.</Text>
          <View style={styles.noSlotsActions}>
            {!isSearchingNext && nextAvailableDate && (
              <TouchableOpacity
                style={styles.nextAvailableButton}
                activeOpacity={0.7}
                onPress={() => onSelectDate(nextAvailableDate)}
              >
                <Ionicons name="calendar-outline" size={16} color={colors.secondary} />
                <Text style={styles.nextAvailableButtonText}>
                  Next available:{' '}
                  {formatDate(nextAvailableDate, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : availableTimes.length === 0 ? (
        <View style={styles.noSlotsCard}>
          <Text style={styles.noSlotsTitle}>No available slots for this day</Text>
          <Text style={styles.noSlotsText}>
            You can join the waiting list and we will notify you if a slot opens.
          </Text>
          <View style={styles.noSlotsActions}>
            {!isSearchingNext && nextAvailableDate && (
              <TouchableOpacity
                style={styles.nextAvailableButton}
                activeOpacity={0.7}
                onPress={() => onSelectDate(nextAvailableDate)}
              >
                <Ionicons name="calendar-outline" size={16} color={colors.secondary} />
                <Text style={styles.nextAvailableButtonText}>
                  Next available:{' '}
                  {formatDate(nextAvailableDate, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.joinWaitlistButton}
              activeOpacity={0.7}
              onPress={onJoinWaitingList}
            >
              <Ionicons name="time-outline" size={16} color={colors.white} />
              <Text style={styles.joinWaitlistButtonText}>Join Waiting List</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.timeSlotsGrid}>
          {availableTimes.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.timeSlot, selectedTime === time && styles.timeSlotSelected]}
              onPress={() => onSelectTime(time)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.timeSlotText, selectedTime === time && styles.timeSlotTextSelected]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedSummaryText ? (
        <View style={styles.selectedSummary}>
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text style={styles.selectedSummaryText}>{selectedSummaryText}</Text>
        </View>
      ) : null}
    </View>
  );
};
