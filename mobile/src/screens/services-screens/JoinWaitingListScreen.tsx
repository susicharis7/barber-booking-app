import React, { useMemo, useState } from 'react';
import { Alert, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/screens/services-screens/joinWaitingList-styles';
import { colors } from '../../styles/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ServicesStackParamList } from '../../navigation/types';
import { useJoinWaitingList } from '../../hooks/services/useJoinWaitingList';
import { WaitingListDateWindowCard } from '../../components/services/WaitingListDateWindowCard';
import { useWaitingListDateWindow } from '../../hooks/services/useWaitingListDateWindow';

type JoinWaitingListScreenProps = NativeStackScreenProps<
  ServicesStackParamList,
  'JoinWaitingListScreen'
>;

export default function JoinWaitingListScreen({ navigation, route }: JoinWaitingListScreenProps) {
  const { employee, service, date, nextAvailableDate } = route.params;

  const {
    startDateLabel,
    endDateLabel,
    startDatePayload,
    endDatePayload,
    showCalendar,
    toggleCalendar,
    currentMonthName,
    currentYear,
    canGoPrev,
    canGoNext,
    goPrevMonth,
    goNextMonth,
    weekDays,
    calendarCells,
    selectDay,
  } = useWaitingListDateWindow({
    date,
    nextAvailableDate,
  });

  const calendarDays = useMemo(
    () =>
      calendarCells.map((cell) => {
        const day = cell.day;

        if (day === null) {
          return <View key={cell.key} style={styles.calendarDay} />;
        }

        return (
          <TouchableOpacity
            key={cell.key}
            style={[
              styles.calendarDay,
              cell.disabled && styles.calendarDayDisabled,
              cell.selected && styles.calendarDaySelected,
            ]}
            onPress={() => selectDay(day)}
            disabled={cell.disabled}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.calendarDayText,
                cell.disabled && styles.calendarDayTextDisabled,
                cell.selected && styles.calendarDayTextSelected,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        );
      }),
    [calendarCells, selectDay],
  );

  const [existsModalVisible, setExistsModalVisible] = useState(false);
  const [existsModalMessage, setExistsModalMessage] = useState(
    'You already have an active waiting list request for this barber and date.',
  );

  const { joining, joinWaitingList } = useJoinWaitingList();

  const goToWaitingList = () => {
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate('Settings', { screen: 'WaitingList' });
      return;
    }
    navigation.navigate('ServiceMain');
  };

  const handleJoinWaitingList = async () => {
    const result = await joinWaitingList({
      barber_id: employee.id,
      service_id: service?.id ?? null,
      start_date: startDatePayload,
      end_date: endDatePayload,
    });

    if (result.ok) {
      goToWaitingList();
      return;
    }

    if (result.exists) {
      setExistsModalMessage(result.message);
      setExistsModalVisible(true);
      return;
    }

    Alert.alert('Error', result.message);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={colors.primary} />
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

      <WaitingListDateWindowCard
        startDateLabel={startDateLabel}
        endDateLabel={endDateLabel}
        showCalendar={showCalendar}
        onToggleCalendar={toggleCalendar}
        currentMonthName={currentMonthName}
        currentYear={currentYear}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onPrevMonth={goPrevMonth}
        onNextMonth={goNextMonth}
        weekDays={weekDays}
        calendarDays={calendarDays}
      />

      <View style={styles.tipCard}>
        <Ionicons name="information-circle-outline" size={18} color={colors.secondary} />
        <Text style={styles.tipText}>
          We will notify you when any slot becomes available between your start date and the first
          open day.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.ctaButton}
        activeOpacity={0.7}
        onPress={handleJoinWaitingList}
        disabled={joining}
      >
        <Text style={styles.ctaButtonText}>{joining ? 'Joining...' : 'Join Waiting List'}</Text>
      </TouchableOpacity>

      <Modal
        visible={existsModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setExistsModalVisible(false)}
      >
        <View style={styles.existsModalOverlay}>
          <View style={styles.existsModalCard}>
            <View style={styles.existsIconWrap}>
              <Ionicons name="alert-circle-outline" size={28} color={colors.error} />
            </View>

            <Text style={styles.existsTitle}>Already on waiting list</Text>
            <Text style={styles.existsText}>{existsModalMessage}</Text>
            <Text style={styles.existsHint}>
              Open Waiting List to review or cancel your current request.
            </Text>

            <TouchableOpacity
              style={styles.existsButton}
              activeOpacity={0.8}
              onPress={() => {
                setExistsModalVisible(false);
                goToWaitingList();
              }}
            >
              <Text style={styles.existsButtonText}>Open Waiting List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
