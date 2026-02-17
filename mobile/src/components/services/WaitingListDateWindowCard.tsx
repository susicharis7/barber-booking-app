import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/joinWaitingList-styles';
import { colors } from '../../styles/colors';

type WaitingListDateWindowCardProps = {
  startDateLabel: string;
  endDateLabel: string;
  showCalendar: boolean;
  onToggleCalendar: () => void;
  currentMonthName: string;
  currentYear: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  weekDays: string[];
  calendarDays: React.ReactNode[];
};

export const WaitingListDateWindowCard = ({
  startDateLabel,
  endDateLabel,
  showCalendar,
  onToggleCalendar,
  currentMonthName,
  currentYear,
  canGoPrev,
  canGoNext,
  onPrevMonth,
  onNextMonth,
  weekDays,
  calendarDays,
}: WaitingListDateWindowCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Availability window</Text>
      <Text style={styles.helperText}>
        Choose a start date. End date is fixed to the first available day.
      </Text>

      <View style={styles.windowCard}>
        <View style={styles.windowRow}>
          <View>
            <Text style={styles.windowLabel}>Start date</Text>
            <Text style={styles.windowValue}>{startDateLabel}</Text>
          </View>
          <TouchableOpacity style={styles.pickHint} activeOpacity={0.7} onPress={onToggleCalendar}>
            <Ionicons name="calendar-outline" size={16} color={colors.primary} />
            <Text style={styles.pickHintText}>{showCalendar ? 'Hide calendar' : 'Pick date'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.windowDivider} />

        <View style={styles.windowRow}>
          <View>
            <Text style={styles.windowLabel}>End date</Text>
            <Text style={styles.windowValue}>{endDateLabel}</Text>
          </View>
          <View style={styles.lockedBadge}>
            <Ionicons name="lock-closed-outline" size={14} color={colors.muted} />
            <Text style={styles.lockedText}>Fixed</Text>
          </View>
        </View>
      </View>

      {showCalendar ? (
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={onPrevMonth} disabled={!canGoPrev} activeOpacity={0.7}>
              <Ionicons
                name="chevron-back"
                size={20}
                color={canGoPrev ? colors.primary : colors.slate[300]}
              />
            </TouchableOpacity>
            <Text style={styles.calendarMonthYear}>
              {currentMonthName} {currentYear}
            </Text>
            <TouchableOpacity onPress={onNextMonth} disabled={!canGoNext} activeOpacity={0.7}>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={canGoNext ? colors.primary : colors.slate[300]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.calendarWeekDays}>
            {weekDays.map((day) => (
              <Text key={day} style={styles.calendarWeekDayText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>{calendarDays}</View>
        </View>
      ) : null}
    </View>
  );
};
