import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../styles/colors';
import {
  daysOfWeek,
  months,
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
  toLocalDate,
} from '../../utils/calendar';
import { styles } from './picker-styles';

type CalendarPickerProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  markedDates?: string[];
  onMonthChange?: (year: number, month: number) => void;
};

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const toMonthKey = (year: number, month: number) => year * 12 + month;

export default function CalendarPicker({
  value,
  onChange,
  minDate,
  maxDate,
  isDateDisabled,
  markedDates,
  onMonthChange,
}: CalendarPickerProps) {
  const baseDate = value ?? minDate ?? new Date();
  const [currentMonth, setCurrentMonth] = useState(baseDate.getMonth());
  const [currentYear, setCurrentYear] = useState(baseDate.getFullYear());

  useEffect(() => {
    if (!value) return;
    setCurrentMonth(value.getMonth());
    setCurrentYear(value.getFullYear());
  }, [value]);

  useEffect(() => {
    onMonthChange?.(currentYear, currentMonth);
  }, [currentYear, currentMonth, onMonthChange]);

  const min = useMemo(() => (minDate ? startOfDay(minDate) : null), [minDate]);
  const max = useMemo(() => (maxDate ? startOfDay(maxDate) : null), [maxDate]);
  const markerSet = useMemo(() => new Set(markedDates ?? []), [markedDates]);

  const currentKey = toMonthKey(currentYear, currentMonth);
  const minKey = min
    ? toMonthKey(min.getFullYear(), min.getMonth())
    : Number.NEGATIVE_INFINITY;
  const maxKey = max
    ? toMonthKey(max.getFullYear(), max.getMonth())
    : Number.POSITIVE_INFINITY;

  const canGoPrev = currentKey > minKey;
  const canGoNext = currentKey < maxKey;

  const isOutsideBounds = (date: Date) => {
    const target = startOfDay(date);
    if (min && target < min) return true;
    if (max && target > max) return true;
    return false;
  };

  const isDisabled = (date: Date) => {
    if (isOutsideBounds(date)) return true;
    if (isDateDisabled?.(date)) return true;
    return false;
  };

  const goPrevMonth = () => {
    if (!canGoPrev) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
      return;
    }
    setCurrentMonth((prev) => prev - 1);
  };

  const goNextMonth = () => {
    if (!canGoNext) return;
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
      return;
    }
    setCurrentMonth((prev) => prev + 1);
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const items: React.ReactNode[] = [];

    for (let i = 0; i < firstDay; i++) {
      items.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const disabled = isDisabled(date);
      const selected = value ? isSameDay(value, date) : false;
      const hasMarker = markerSet.has(toLocalDate(date));

      items.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            disabled && styles.calendarDayDisabled,
            selected && styles.calendarDaySelected,
          ]}
          onPress={() => onChange(date)}
          disabled={disabled}
          activeOpacity={0.7}
        >
          {hasMarker && (
            <View style={[styles.dayDot, selected && styles.dayDotSelected]} />
          )}
          <Text
            style={[
              styles.calendarDayText,
              disabled && styles.calendarDayTextDisabled,
              selected && styles.calendarDayTextSelected,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return items;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goPrevMonth} disabled={!canGoPrev} activeOpacity={0.7}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={canGoPrev ? colors.primary : colors.slate[300]}
          />
        </TouchableOpacity>

        <Text style={styles.monthYear}>
          {months[currentMonth]} {currentYear}
        </Text>

        <TouchableOpacity onPress={goNextMonth} disabled={!canGoNext} activeOpacity={0.7}>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={canGoNext ? colors.primary : colors.slate[300]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>{renderDays()}</View>
    </View>
  );
}
