import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../../styles/screens/services-screens/calendar-styles';
import { colors } from '../../styles/colors';
import { api } from '../../services/api';
import { formatDate, isSameDay, toLocalDate } from '../../utils/calendar';
import type { WorkingHours } from '../../types';
import CalendarPicker from '../../components/calendar/CalendarPicker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ServicesStackParamList } from '../../navigation/types';

const bgImage = require('../../../assets/images/settings-bg.png');

type CalendarScreenProps = NativeStackScreenProps<ServicesStackParamList, 'Calendar'>;

const SLOT_STEP_MINUTES = 30;

type BookedSlot = {
  start_time: string;
  end_time: string;
};

type TimeWindow = {
  start: number;
  end: number;
};

const timeToMinutes = (value: string) => {
  const [h, m] = value.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

const minutesToTime = (value: number) => {
  const h = Math.floor(value / 60);
  const m = value % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

const overlaps = (aStart: number, aEnd: number, bStart: number, bEnd: number) =>
  !(aEnd <= bStart || aStart >= bEnd);

export default function CalendarScreen({ navigation, route }: CalendarScreenProps) {
  const { employee, service } = route.params;

  const serviceDuration = Math.max(1, Number(service.duration) || 0);
  const servicePrice = Number(service.price) || 0;

  const scrollRef = useRef<KeyboardAwareScrollView>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([]);
  const [workingHoursLoading, setWorkingHoursLoading] = useState(true);

  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);

  const [nextAvailableDate, setNextAvailableDate] = useState<Date | null>(null);
  const [isSearchingNext, setIsSearchingNext] = useState(false);

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const fetchWorkingHours = useCallback(async () => {
    setWorkingHoursLoading(true);
    try {
      const res = await api.get<{ workingHours: WorkingHours[] }>(
        `/api/barbers/${employee.id}/working-hours`,
        false,
      );
      setWorkingHours(res.workingHours ?? []);
    } catch (err) {
      console.error('Fetch working hours error:', err);
      setWorkingHours([]);
    } finally {
      setWorkingHoursLoading(false);
    }
  }, [employee.id]);

  useEffect(() => {
    fetchWorkingHours();
  }, [fetchWorkingHours]);

  const getWindowForDate = useCallback(
    (date: Date): TimeWindow | null => {
      const day = date.getDay();
      const dayHours = workingHours.find((w) => w.day_of_week === day && w.is_working);

      if (!dayHours) return null;

      const start = timeToMinutes(dayHours.start_time);
      const end = timeToMinutes(dayHours.end_time);

      if (end <= start) return null;

      return { start, end };
    },
    [workingHours],
  );

  const isSlotPastByStartMinutes = useCallback(
    (slotStartMinutes: number, date: Date) =>
      isSameDay(date, now) && slotStartMinutes <= nowMinutes,
    [now, nowMinutes],
  );

  const buildAvailableTimes = useCallback(
    (date: Date, busySlots: BookedSlot[]) => {
      const window = getWindowForDate(date);
      if (!window) return [];

      const available: string[] = [];

      for (
        let slotStart = window.start;
        slotStart + serviceDuration <= window.end;
        slotStart += SLOT_STEP_MINUTES
      ) {
        if (isSlotPastByStartMinutes(slotStart, date)) continue;

        const slotEnd = slotStart + serviceDuration;

        const hasConflict = busySlots.some((busy) => {
          const busyStart = timeToMinutes(busy.start_time);
          const busyEnd = timeToMinutes(busy.end_time);
          return overlaps(slotStart, slotEnd, busyStart, busyEnd);
        });

        if (!hasConflict) {
          available.push(minutesToTime(slotStart));
        }
      }

      return available;
    },
    [getWindowForDate, isSlotPastByStartMinutes, serviceDuration],
  );

  const fetchBookedSlots = useCallback(
    async (dateStr: string) => {
      setIsAvailabilityLoading(true);
      try {
        const res = await api.get<{ slots: BookedSlot[] }>(
          `/api/appointments/barber/${employee.id}/booked?date=${dateStr}`,
        );
        setBookedSlots(res.slots ?? []);
      } catch (err) {
        console.error('Fetch booked slots error:', err);
        setBookedSlots([]);
      } finally {
        setIsAvailabilityLoading(false);
      }
    },
    [employee.id],
  );

  const hasFreeSlot = useCallback(
    async (date: Date) => {
      const window = getWindowForDate(date);
      if (!window) return false;

      const dateStr = toLocalDate(date);
      const res = await api.get<{ slots: BookedSlot[] }>(
        `/api/appointments/barber/${employee.id}/booked?date=${dateStr}`,
      );

      const available = buildAvailableTimes(date, res.slots ?? []);
      return available.length > 0;
    },
    [buildAvailableTimes, employee.id, getWindowForDate],
  );

  const isDateDisabled = useCallback(
    (date: Date) => {
      const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (targetDate < todayStart) return true;

      const window = getWindowForDate(targetDate);
      if (!window) return true;

      if (isSameDay(targetDate, now) && nowMinutes >= window.end) return true;

      return false;
    },
    [getWindowForDate, now, nowMinutes],
  );

  const selectDate = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      setSelectedTime(null);
      fetchBookedSlots(toLocalDate(date));
    },
    [fetchBookedSlots],
  );

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) return;

    navigation.navigate('Information', {
      employee,
      service,
      date: toLocalDate(selectedDate),
      time: selectedTime,
      note,
    });
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    return formatDate(selectedDate, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateEndTime = () => {
    if (!selectedTime) return '';

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const endMinutesTotal = minutes + serviceDuration;
    const endHours = hours + Math.floor(endMinutesTotal / 60);
    const finalMinutes = endMinutesTotal % 60;

    return `${String(endHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
  };

  const availableTimes = useMemo(() => {
    if (!selectedDate) return [];
    return buildAvailableTimes(selectedDate, bookedSlots);
  }, [bookedSlots, buildAvailableTimes, selectedDate]);

  const availableCount = availableTimes.length;

  const isSelectedDayOver = useMemo(() => {
    if (!selectedDate) return false;

    const window = getWindowForDate(selectedDate);
    if (!window) return true;

    if (!isSameDay(selectedDate, now)) return false;

    return nowMinutes >= window.end;
  }, [getWindowForDate, now, nowMinutes, selectedDate]);

  useEffect(() => {
    let cancelled = false;

    const findNextAvailableDate = async () => {
      if (!selectedDate) {
        setNextAvailableDate(null);
        return;
      }

      if (!isSelectedDayOver && availableTimes.length > 0) {
        setNextAvailableDate(null);
        return;
      }

      setIsSearchingNext(true);
      setNextAvailableDate(null);

      const start = new Date(selectedDate);
      const maxLookaheadDays = 30;

      for (let i = 1; i <= maxLookaheadDays; i++) {
        const candidate = new Date(start);
        candidate.setDate(start.getDate() + i);

        try {
          const hasSlot = await hasFreeSlot(candidate);
          if (hasSlot) {
            if (!cancelled) setNextAvailableDate(candidate);
            break;
          }
        } catch (err) {
          console.error('Find next available date error:', err);
          break;
        }
      }

      if (!cancelled) setIsSearchingNext(false);
    };

    findNextAvailableDate();

    return () => {
      cancelled = true;
    };
  }, [availableTimes.length, hasFreeSlot, isSelectedDayOver, selectedDate]);

  const minDate = useMemo(() => new Date(now.getFullYear(), now.getMonth(), now.getDate()), [now]);

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={colors.white} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>SCHEDULE</Text>
          <Text style={styles.headerTitle}>Select Date & Time</Text>
          <Text style={styles.headerSubtitle}>Choose your preferred appointment slot.</Text>
        </View>
      </ImageBackground>

      <KeyboardAwareScrollView
        ref={scrollRef}
        style={styles.content}
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={24}
        extraHeight={12}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {workingHoursLoading ? (
          <View style={{ paddingVertical: 24, alignItems: 'center' }}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : (
          <CalendarPicker
            value={selectedDate}
            onChange={selectDate}
            minDate={minDate}
            isDateDisabled={isDateDisabled}
          />
        )}

        {selectedDate && (
          <View style={styles.timeSlotsSection}>
            <View style={styles.timeSlotsHeader}>
              <Text style={[styles.sectionLabel, styles.sectionLabelTight]}>AVAILABLE TIMES</Text>
              <View style={styles.timeSlotsBadge}>
                <Text style={styles.timeSlotsBadgeText}>{availableCount} slots</Text>
              </View>
            </View>

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
                      onPress={() => selectDate(nextAvailableDate)}
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
                      onPress={() => selectDate(nextAvailableDate)}
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
                    onPress={() => {
                      navigation.navigate('JoinWaitingListScreen', {
                        employee,
                        service,
                        date: toLocalDate(selectedDate),
                        nextAvailableDate: nextAvailableDate
                          ? toLocalDate(nextAvailableDate)
                          : null,
                      });
                    }}
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
                    onPress={() => setSelectedTime(time)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.timeSlotText,
                        selectedTime === time && styles.timeSlotTextSelected,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {selectedTime && (
              <View style={styles.selectedSummary}>
                <Ionicons name="time-outline" size={16} color={colors.primary} />
                <Text style={styles.selectedSummaryText}>
                  Selected: {formatSelectedDate()} - {selectedTime} - {calculateEndTime()}
                </Text>
              </View>
            )}
          </View>
        )}

        {selectedDate && selectedTime && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>

            <View style={styles.summaryRow}>
              <Ionicons name="cut-outline" size={18} color={colors.muted} />
              <Text style={styles.summaryLabel}>Service</Text>
              <Text style={styles.summaryValue}>{service.name}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Ionicons name="person-outline" size={18} color={colors.muted} />
              <Text style={styles.summaryLabel}>Barber</Text>
              <Text style={styles.summaryValue}>{employee.name}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Ionicons name="calendar-outline" size={18} color={colors.muted} />
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>{formatSelectedDate()}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Ionicons name="time-outline" size={18} color={colors.muted} />
              <Text style={styles.summaryLabel}>Time</Text>
              <Text style={styles.summaryValue}>
                {selectedTime} - {calculateEndTime()}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Ionicons name="cash-outline" size={18} color={colors.muted} />
              <Text style={styles.summaryLabel}>Price</Text>
              <Text style={styles.summaryValuePrice}>{servicePrice.toFixed(2)} BAM</Text>
            </View>

            <View style={styles.noteSection}>
              <Text style={styles.noteLabel}>Add a note (optional)</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="Any special requests..."
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={3}
                onFocus={() => {
                  setTimeout(() => {
                    scrollRef.current?.scrollToEnd(true);
                  }, 200);
                }}
              />
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.continueButton,
            (!selectedDate || !selectedTime) && styles.continueButtonDisabled,
          ]}
          activeOpacity={0.7}
          onPress={handleContinue}
          disabled={!selectedDate || !selectedTime}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.white} />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
