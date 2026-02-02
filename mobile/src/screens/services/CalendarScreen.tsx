import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/calendar-styles';

import { api } from '../../services/api';

const bgImage = require('../../../assets/images/settings-bg.png');

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export default function CalendarScreen({ navigation, route }: any) {
  const { employee, service } = route.params;

  const serviceDuration = Number(service.duration) || 0;
  const servicePrice = Number(service.price) || 0;
  
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [note, setNote] = useState('');


  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const fetchBookedSlots = async (dateStr: string) => {
  try {
    const res = await api.get<{ slots: { start_time: string }[] }>(
      `/api/appointments/barber/${employee.id}/booked?date=${dateStr}`,
      false
    );

   
    const slots = res.slots.map((s) => s.start_time.slice(0, 5));
    setBookedSlots(slots);
  } catch (err) {
    console.error('Fetch booked slots error:', err);
    setBookedSlots([]);
  }
};


  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const handleSelectDate = (day: number) => {
    if (!isDateDisabled(day)) {
      setSelectedDate(new Date(currentYear, currentMonth, day));

      const dateStr = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
      fetchBookedSlots(dateStr);

      setSelectedTime(null);
    }
  };

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
    return currentYear > today.getFullYear() || 
      (currentYear === today.getFullYear() && currentMonth > today.getMonth());
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      navigation.navigate('Information', {
        employee,
        service,
        date: selectedDate.toISOString(),
        time: selectedTime,
        note,
      });
    }
  };

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

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    // Days of the month
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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
            <Text style={styles.sectionLabel}>AVAILABLE TIMES</Text>
            <View style={styles.timeSlotsGrid}>
              {timeSlots.map((time) => {
                const isBooked = bookedSlots.includes(time);

                return (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeSlot,
                      selectedTime === time && styles.timeSlotSelected,
                      isBooked && styles.timeSlotDisabled,
                    ]}
                    onPress={() => setSelectedTime(time)}
                    disabled={isBooked}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.timeSlotText,
                        selectedTime === time && styles.timeSlotTextSelected,
                        isBooked && styles.timeSlotTextDisabled,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}

            </View>
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
      </ScrollView>
    </View>
  );
}
