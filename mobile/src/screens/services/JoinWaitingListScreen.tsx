import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/joinWaitingList-styles';
import {
  daysOfWeek,
  months,
  getDaysInMonth,
  getFirstDayOfMonth,
  startOfDay,
  clampDate,
  formatDate,
  parseDate,
} from '../../utils/calendar';




export default function JoinWaitingListScreen({ navigation, route }: any) {
  const { employee, service, date, nextAvailableDate } = route.params || {};

  const minDate = parseDate(date) ?? new Date();
  const maxDateRaw = parseDate(nextAvailableDate ?? date);
  const maxDate = maxDateRaw && maxDateRaw >= minDate ? maxDateRaw : minDate;

  const initialStart = clampDate(parseDate(date) ?? minDate, minDate, maxDate);
  const [startDate, setStartDate] = useState<Date>(initialStart);
  const [showCalendar, setShowCalendar] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(initialStart.getMonth());
  const [currentYear, setCurrentYear] = useState(initialStart.getFullYear());

  const endDateLabel = useMemo(() => formatDate(maxDate), [maxDate]);
  const startDateLabel = useMemo(() => formatDate(startDate), [startDate]);


  const isDateDisabled = (day: number) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);
    const minBound = startOfDay(minDate);
    const maxBound = startOfDay(maxDate);
    return dateToCheck < minBound || dateToCheck > maxBound;
  };

  const isDateSelected = (day: number) => {
    return (
      startDate.getDate() === day &&
      startDate.getMonth() === currentMonth &&
      startDate.getFullYear() === currentYear
    );
  };

  const handleSelectDate = (day: number) => {
    if (isDateDisabled(day)) return;
    const next = new Date(currentYear, currentMonth, day);
    setStartDate(next);
    setShowCalendar(false);
  };

  const monthKey = (year: number, month: number) => year * 12 + month;
  const minMonthKey = monthKey(minDate.getFullYear(), minDate.getMonth());
  const maxMonthKey = monthKey(maxDate.getFullYear(), maxDate.getMonth());
  const currentKey = monthKey(currentYear, currentMonth);

  const canGoPrev = currentKey > minMonthKey;
  const canGoNext = currentKey < maxMonthKey;

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (!canGoNext) return;
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const disabled = isDateDisabled(day);
      const selected = isDateSelected(day);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            disabled && styles.calendarDayDisabled,
            selected && styles.calendarDaySelected,
          ]}
          onPress={() => handleSelectDate(day)}
          disabled={disabled}
          activeOpacity={0.7}
        >
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

    return days;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color="#0f172a" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Join Waiting List</Text>
        <Text style={styles.subtitle}>
          Pick your earliest date and we will notify you if a slot opens.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your selection</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Barber</Text>
          <Text style={styles.value}>{employee?.name || '-'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Service</Text>
          <Text style={styles.value}>{service?.name || '-'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>First available</Text>
          <Text style={styles.value}>{endDateLabel}</Text>
        </View>
      </View>

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
            <TouchableOpacity
              style={styles.pickHint}
              activeOpacity={0.7}
              onPress={() => setShowCalendar((prev) => !prev)}
            >
              <Ionicons name="calendar-outline" size={16} color="#0f172a" />
              <Text style={styles.pickHintText}>
                {showCalendar ? 'Hide calendar' : 'Pick date'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.windowDivider} />

          <View style={styles.windowRow}>
            <View>
              <Text style={styles.windowLabel}>End date</Text>
              <Text style={styles.windowValue}>{endDateLabel}</Text>
            </View>
            <View style={styles.lockedBadge}>
              <Ionicons name="lock-closed-outline" size={14} color="#64748b" />
              <Text style={styles.lockedText}>Fixed</Text>
            </View>
          </View>
        </View>

        {showCalendar && (
          <View style={styles.calendarCard}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity
                onPress={handlePrevMonth}
                disabled={!canGoPrev}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color={canGoPrev ? '#0f172a' : '#cbd5e1'}
                />
              </TouchableOpacity>
              <Text style={styles.calendarMonthYear}>
                {months[currentMonth]} {currentYear}
              </Text>
              <TouchableOpacity
                onPress={handleNextMonth}
                disabled={!canGoNext}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={canGoNext ? '#0f172a' : '#cbd5e1'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.calendarWeekDays}>
              {daysOfWeek.map((day) => (
                <Text key={day} style={styles.calendarWeekDayText}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={styles.calendarGrid}>{renderCalendar()}</View>
          </View>
        )}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="information-circle-outline" size={18} color="#2563eb" />
        <Text style={styles.tipText}>
          We will notify you when any slot becomes available between your start
          date and the first open day.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.ctaButton}
        activeOpacity={0.7}
        onPress={() => {
          // TODO: submit waiting list request
        }}
      >
        <Text style={styles.ctaButtonText}>Join Waiting List</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
