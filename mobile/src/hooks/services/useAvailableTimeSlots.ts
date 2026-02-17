import { useCallback, useMemo } from 'react';
import type { WorkingHours } from '../../types';
import type { BookedSlot } from '../../services/appointments-service';
import {
  buildAvailableTimesForDate as buildTimesForDateUtil,
  getWindowForDate as getWindowForDateUtil,
  isDateDisabledForBooking,
  isDayOverForBooking,
  type TimeWindow,
} from '../../utils/time-slots';

type UseAvailableTimeSlotsParams = {
  workingHours: WorkingHours[];
  bookedSlots: BookedSlot[];
  selectedDate: Date | null;
  serviceDuration: number;
  now: Date;
};

type UseAvailableTimeSlotsResult = {
  availableTimes: string[];
  availableCount: number;
  isSelectedDayOver: boolean;
  isDateDisabled: (date: Date) => boolean;
  getWindowForDate: (date: Date) => TimeWindow | null;
  buildAvailableTimesForDate: (date: Date, busySlots: BookedSlot[]) => string[];
};

export const useAvailableTimeSlots = ({
  workingHours,
  bookedSlots,
  selectedDate,
  serviceDuration,
  now,
}: UseAvailableTimeSlotsParams): UseAvailableTimeSlotsResult => {
  const getWindowForDate = useCallback(
    (date: Date) => getWindowForDateUtil(workingHours, date),
    [workingHours],
  );

  const buildAvailableTimesForDate = useCallback(
    (date: Date, busySlots: BookedSlot[]) =>
      buildTimesForDateUtil({
        date,
        busySlots,
        workingHours,
        serviceDuration,
        now,
      }),
    [workingHours, serviceDuration, now],
  );

  const isDateDisabled = useCallback(
    (date: Date) =>
      isDateDisabledForBooking({
        date,
        workingHours,
        now,
      }),
    [workingHours, now],
  );

  const availableTimes = useMemo(() => {
    if (!selectedDate) return [];
    return buildAvailableTimesForDate(selectedDate, bookedSlots);
  }, [selectedDate, buildAvailableTimesForDate, bookedSlots]);

  const isSelectedDayOver = useMemo(() => {
    if (!selectedDate) return false;
    return isDayOverForBooking({
      date: selectedDate,
      workingHours,
      now,
    });
  }, [selectedDate, workingHours, now]);

  return {
    availableTimes,
    availableCount: availableTimes.length,
    isSelectedDayOver,
    isDateDisabled,
    getWindowForDate,
    buildAvailableTimesForDate,
  };
};
