import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ServicesStackParamList } from '../../navigation/types';
import { styles } from '../../styles/screens/services-screens/calendar-styles';
import { formatDate, toLocalDate } from '../../utils/calendar';
import { calculateEndTime } from '../../utils/time';
import { useCalendarClock } from '../../hooks/services/useCalendarClock';
import { useWorkingHours } from '../../hooks/services/useWorkingHours';
import { useBookedSlots } from '../../hooks/services/useBookedSlots';
import { useAvailableTimeSlots } from '../../hooks/services/useAvailableTimeSlots';
import { useNextAvailableDate } from '../../hooks/services/useNextAvailableDate';
import { CalendarHeroHeader } from '../../components/services/CalendarHeroHeader';
import { CalendarDatePickerSection } from '../../components/services/CalendarDatePickerSection';
import { CalendarTimeSlotsSection } from '../../components/services/CalendarTimeSlotsSection';
import { CalendarBookingSummaryCard } from '../../components/services/CalendarBookingSummaryCard';
import { CalendarContinueButton } from '../../components/services/CalendarContinueButton';

type CalendarScreenProps = NativeStackScreenProps<ServicesStackParamList, 'Calendar'>;

export default function CalendarScreen({ navigation, route }: CalendarScreenProps) {
  const { employee, service } = route.params;

  const serviceDuration = Math.max(1, Number(service.duration) || 0);
  const servicePrice = Number(service.price) || 0;

  const scrollRef = useRef<KeyboardAwareScrollView>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const { now, minDate } = useCalendarClock();

  const {
    workingHours,
    loading: workingHoursLoading,
    error: workingHoursError,
    refetch: refetchWorkingHours,
  } = useWorkingHours(employee.id);

  const {
    bookedSlots,
    loading: isAvailabilityLoading,
    error: bookedSlotsError,
    fetchForDate,
    readForDate,
    clear: clearBookedSlots,
  } = useBookedSlots();

  const {
    availableTimes,
    availableCount,
    isSelectedDayOver,
    isDateDisabled,
    getWindowForDate,
    buildAvailableTimesForDate,
  } = useAvailableTimeSlots({
    workingHours,
    bookedSlots,
    selectedDate,
    serviceDuration,
    now,
  });

  const fetchBookedSlots = useCallback(
    async (dateStr: string) => {
      await fetchForDate(employee.id, dateStr);
    },
    [employee.id, fetchForDate],
  );

  const hasFreeSlot = useCallback(
    async (date: Date) => {
      const window = getWindowForDate(date);
      if (!window) return false;

      const dateStr = toLocalDate(date);
      const slots = await readForDate(employee.id, dateStr);
      const available = buildAvailableTimesForDate(date, slots);

      return available.length > 0;
    },
    [buildAvailableTimesForDate, employee.id, getWindowForDate, readForDate],
  );

  const { nextAvailableDate, isSearchingNext } = useNextAvailableDate({
    selectedDate,
    isSelectedDayOver,
    availableCount,
    hasFreeSlot,
  });

  const selectDate = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      setSelectedTime(null);
      clearBookedSlots();
      void fetchBookedSlots(toLocalDate(date));
    },
    [clearBookedSlots, fetchBookedSlots],
  );

  const handleJoinWaitingList = useCallback(() => {
    if (!selectedDate) return;

    navigation.navigate('JoinWaitingListScreen', {
      employee,
      service,
      date: toLocalDate(selectedDate),
      nextAvailableDate: nextAvailableDate ? toLocalDate(nextAvailableDate) : null,
    });
  }, [employee, navigation, nextAvailableDate, selectedDate, service]);

  const handleContinue = useCallback(() => {
    if (!selectedDate || !selectedTime) return;

    navigation.navigate('Information', {
      employee,
      service,
      date: toLocalDate(selectedDate),
      time: selectedTime,
      note,
    });
  }, [employee, navigation, note, selectedDate, selectedTime, service]);

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return '';
    return formatDate(selectedDate, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [selectedDate]);

  const endTime = useMemo(() => {
    if (!selectedTime) return '';
    return calculateEndTime(selectedTime, serviceDuration);
  }, [selectedTime, serviceDuration]);

  const selectedSummaryText = useMemo(() => {
    if (!selectedTime || !formattedSelectedDate) return null;
    return `Selected: ${formattedSelectedDate} - ${selectedTime} - ${endTime}`;
  }, [endTime, formattedSelectedDate, selectedTime]);

  const continueDisabled = !selectedDate || !selectedTime;

  return (
    <View style={styles.container}>
      <CalendarHeroHeader onBack={() => navigation.goBack()} />

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
        <CalendarDatePickerSection
          loading={workingHoursLoading}
          error={workingHoursError}
          onRetry={() => {
            void refetchWorkingHours();
          }}
          value={selectedDate}
          onChange={selectDate}
          minDate={minDate}
          isDateDisabled={isDateDisabled}
        />

        {selectedDate ? (
          <CalendarTimeSlotsSection
            availableCount={availableCount}
            bookedSlotsError={bookedSlotsError}
            isAvailabilityLoading={isAvailabilityLoading}
            isSelectedDayOver={isSelectedDayOver}
            isSearchingNext={isSearchingNext}
            nextAvailableDate={nextAvailableDate}
            availableTimes={availableTimes}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
            onSelectDate={selectDate}
            onJoinWaitingList={handleJoinWaitingList}
            selectedSummaryText={selectedSummaryText}
          />
        ) : null}

        {selectedDate && selectedTime ? (
          <CalendarBookingSummaryCard
            serviceName={service.name}
            barberName={employee.name}
            formattedDate={formattedSelectedDate}
            selectedTime={selectedTime}
            endTime={endTime}
            priceText={`${servicePrice.toFixed(2)} BAM`}
            note={note}
            onChangeNote={setNote}
            onFocusNote={() => {
              setTimeout(() => {
                scrollRef.current?.scrollToEnd(true);
              }, 200);
            }}
          />
        ) : null}

        <CalendarContinueButton disabled={continueDisabled} onPress={handleContinue} />
      </KeyboardAwareScrollView>
    </View>
  );
}
