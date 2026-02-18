import React from 'react';
import { View } from 'react-native';
import CalendarPicker from '../customCalendar/CalendarPicker';
import { EmptyState, LoadingBlock } from '../ui';

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
    return <LoadingBlock label="" size="small" />;
  }

  if (error) {
    return (
      <View style={{ paddingVertical: 8 }}>
        <EmptyState
          icon="alert-circle-outline"
          title="Could not load calendar"
          description={error}
          actionLabel="Try again"
          onAction={onRetry}
          compact
        />
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
