import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../../styles/colors';
import CalendarPicker from '../customCalendar/CalendarPicker';

type CalendarDatePickerSectionProps = {
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  value: Date | null;
  onChange: (date: Date) => void;
  minDate: Date;
  isDateDisabled: (date: Date) => boolean;
};

export const CalendarDatePickerSection = ({
  loading,
  error,
  onRetry,
  value,
  onChange,
  minDate,
  isDateDisabled,
}: CalendarDatePickerSectionProps) => {
  if (loading) {
    return (
      <View style={{ paddingVertical: 24, alignItems: 'center' }}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ paddingVertical: 24, alignItems: 'center' }}>
        <Text style={{ color: colors.error, marginBottom: 8, textAlign: 'center' }}>{error}</Text>
        <TouchableOpacity onPress={onRetry} activeOpacity={0.7}>
          <Text style={{ color: colors.primary }}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <CalendarPicker
      value={value}
      onChange={onChange}
      minDate={minDate}
      isDateDisabled={isDateDisabled}
    />
  );
};
