import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/calendar-styles';
import { colors } from '../../styles/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { api } from '../../services/api';


import {
  daysOfWeek,
  months,
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
  toLocalDate,
} from '../../utils/calendar';


/* --- Constants --- */

const bgImage = require('../../../assets/images/settings-bg.png');
const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];





/* --- main Component --- */
export default function CalendarScreen({ navigation, route }: any) {

  // data from previous screens
  const { employee, service } = route.params;
  
  // duration & price from chosen service 
  const serviceDuration = Number(service.duration) || 0;
  const servicePrice = Number(service.price) || 0;

  // for `Add a note` to be seen when keyboard on view
  const scrollRef = useRef<KeyboardAwareScrollView>(null);


  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [nextAvailableDate, setNextAvailableDate] = useState<Date | null>(null);
  const [isSearchingNext, setIsSearchingNext] = useState(false);



  /* --- Time Helpers (date + time Logic) --- */

 

  // the day is finished as soon as last slot exceeds 1 minute
  const getLastSlotCutoff = () => {
    const lastSlot = timeSlots[timeSlots.length - 1]; // "17:30"
    const [h, m] = lastSlot.split(':').map(Number);
    const cutoff = new Date();
    cutoff.setHours(h, m + 1, 0, 0); // 17:31
    return cutoff;
  };

  const isDayOver = (date: Date) => {
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (targetDate.getTime() !== todayDate.getTime()) return false;
    return now >= getLastSlotCutoff();
  };

  // helper for `isSlotPast` & `isDayOver` 
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const isSlotPast = (time: string, date: Date | null) => {
    if (!date) return false;
    if (!isSameDay(date, now)) return false;
    const [h, m] = time.split(':').map(Number);
    const slotTime = new Date(now);
    slotTime.setHours(h, m, 0, 0);
    return slotTime <= now;
  };
  
  
  /* --- Data Helpers --- */

  // we use this to hide booked slots in the UI
  const fetchBookedSlots = async (dateStr: string) => {
    try {
      const res = await api.get<{ slots: { start_time: string }[] }>(
        `/api/appointments/barber/${employee.id}/booked?date=${dateStr}`
      );
      const slots = res.slots.map((s) => s.start_time.slice(0, 5));
      setBookedSlots(slots);
    } catch (err) {
      console.error('Fetch booked slots error:', err);
      setBookedSlots([]);
    }
  };

  // used in `findNextAvailableDate` to find the first day that has free appointment
  const hasFreeSlot = async (date: Date) => {
    const dateStr = toLocalDate(date);
    const res = await api.get<{ slots: { start_time: string }[] }>(
      `/api/appointments/barber/${employee.id}/booked?date=${dateStr}`
    );
    const slots = res.slots.map((s) => s.start_time.slice(0, 5));
    const available = timeSlots.filter(
      (time) => !slots.includes(time) && !isSlotPast(time, date)
    );
    return available.length > 0;
  };


  /* --- Calendar Helpers --- */

 

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (date < todayStart) return true;
    if (date.getTime() === todayStart.getTime() && isDayOver(date)) return true;

    return false;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };


  /* --- Selection Helpers --- */

  const selectDate = (date: Date) => {
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
    setSelectedDate(date);
    fetchBookedSlots(toLocalDate(date));
    setSelectedTime(null);
  };

  const handleSelectDate = (day: number) => {
    if (!isDateDisabled(day)) {
      const newDate = new Date(currentYear, currentMonth, day);
      selectDate(newDate);
    }
  };


  /* --- Month Navigation --- */

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const canGoPrev = () => {
    return currentYear > now.getFullYear() ||
      (currentYear === now.getFullYear() && currentMonth > now.getMonth());
  };

  /* --- Selection / UI Actions --- */

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      navigation.navigate('Information', {
        employee,
        service,
        date: toLocalDate(selectedDate),
        time: selectedTime,
        note,
      });
    }
  };



  /* --- UI Helpers --- */
  
  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateEndTime = () => {
    if (!selectedTime) return '';
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const endMinutes = minutes + serviceDuration;
    const endHours = hours + Math.floor(endMinutes / 60);
    const finalMinutes = endMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
  };

  /* --- Derived Values --- */

  const isSelectedDayOver = selectedDate ? isDayOver(selectedDate) : false;

  const availableTimes = selectedDate
    ? timeSlots.filter((time) => {
        const isBooked = bookedSlots.includes(time);
        const isPast = isSlotPast(time, selectedDate);
        return !isBooked && !isPast;
      })
    : [];

  const availableCount = availableTimes.length;

  
  /* --- Effects --- */
  
  useEffect(() => {
    let isCancelled = false;

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
            if (!isCancelled) {
              setNextAvailableDate(candidate);
            }
            break;
          }
        } catch (err) {
          console.error('Find next available date error:', err);
          break;
        }
      }

      if (!isCancelled) {
        setIsSearchingNext(false);
      }
    };

    findNextAvailableDate();
    return () => {
      isCancelled = true;
    };
  }, [selectedDate, availableTimes.length, isSelectedDayOver, employee.id]);

  

  

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
    <View style={styles.container}>
      {/* HERO */}
      <ImageBackground source={bgImage} style={styles.hero} resizeMode="cover">
        <View style={styles.heroOverlay} />

        {/* BACK BUTTON */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* HEADER CONTENT */}
        <View style={styles.headerContent}>
          <Text style={styles.headerBadge}>SCHEDULE</Text>
          <Text style={styles.headerTitle}>Select Date & Time</Text>
          <Text style={styles.headerSubtitle}>
            Choose your preferred appointment slot.
          </Text>
        </View>
      </ImageBackground>

      {/* WHITE CONTENT */}
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
        {/* CALENDAR */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity
              onPress={handlePrevMonth}
              disabled={!canGoPrev()}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={canGoPrev() ? '#0f172a' : '#cbd5e1'}
              />
            </TouchableOpacity>
            <Text style={styles.calendarMonthYear}>
              {months[currentMonth]} {currentYear}
            </Text>
            <TouchableOpacity onPress={handleNextMonth} activeOpacity={0.7}>
              <Ionicons name="chevron-forward" size={24} color="#0f172a" />
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

        {/* TIME SLOTS */}
        {selectedDate && (
          <View style={styles.timeSlotsSection}>
            <View style={styles.timeSlotsHeader}>
              <Text style={[styles.sectionLabel, styles.sectionLabelTight]}>
                AVAILABLE TIMES
              </Text>
              <View style={styles.timeSlotsBadge}>
                <Text style={styles.timeSlotsBadgeText}>
                  {availableCount} slots
                </Text>
              </View>
            </View>

            {isSelectedDayOver ? (
              <View style={styles.noSlotsCard}>
                <Text style={styles.noSlotsTitle}>This day is finished</Text>
                <Text style={styles.noSlotsText}>
                  Please select another date.
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
                        Next available: {nextAvailableDate.toLocaleDateString('en-US', {
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
                        Next available: {nextAvailableDate.toLocaleDateString('en-US', {
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
                      if (!selectedDate) return;

                      navigation.navigate('JoinWaitingListScreen', {
                        employee, 
                        service,
                        date: toLocalDate(selectedDate),
                        nextAvailableDate: nextAvailableDate ? toLocalDate(nextAvailableDate) : null,

                      })
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
                    style={[
                      styles.timeSlot,
                      selectedTime === time && styles.timeSlotSelected,
                    ]}
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
                <Ionicons name="time-outline" size={16} color="#0f172a" />
                <Text style={styles.selectedSummaryText}>
                  Selected: {formatSelectedDate()} - {selectedTime} - {calculateEndTime()}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* BOOKING SUMMARY */}
        {selectedDate && selectedTime && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>

            <View style={styles.summaryRow}>
              <Ionicons name="cut-outline" size={18} color="#64748b" />
              <Text style={styles.summaryLabel}>Service</Text>
              <Text style={styles.summaryValue}>{service.name}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Ionicons name="person-outline" size={18} color="#64748b" />
              <Text style={styles.summaryLabel}>Barber</Text>
              <Text style={styles.summaryValue}>{employee.name}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Ionicons name="calendar-outline" size={18} color="#64748b" />
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>{formatSelectedDate()}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Ionicons name="time-outline" size={18} color="#64748b" />
              <Text style={styles.summaryLabel}>Time</Text>
              <Text style={styles.summaryValue}>
                {selectedTime} - {calculateEndTime()}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Ionicons name="cash-outline" size={18} color="#64748b" />
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

        {/* CONTINUE BUTTON */}
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
          <Ionicons name="arrow-forward" size={20} color="#ffffff" />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
