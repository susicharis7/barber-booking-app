import { isSameDay } from './calendar';
import type { WorkingHours } from '../types';

export const SLOT_STEP_MINUTES = 30;

export type BusySlot = {
  start_time: string;
  end_time: string;
};

export type TimeWindow = {
  start: number;
  end: number;
};

export const timeToMinutes = (value: string): number => {
  const [h, m] = value.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

export const minutesToTime = (value: number): string => {
  const h = Math.floor(value / 60);
  const m = value % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

export const overlaps = (aStart: number, aEnd: number, bStart: number, bEnd: number): boolean =>
  !(aEnd <= bStart || aStart >= bEnd);

export const getWindowForDate = (workingHours: WorkingHours[], date: Date): TimeWindow | null => {
  const day = date.getDay();
  const dayHours = workingHours.find((w) => w.day_of_week === day && w.is_working);
  if (!dayHours) return null;

  const start = timeToMinutes(dayHours.start_time);
  const end = timeToMinutes(dayHours.end_time);

  if (end <= start) return null;

  return { start, end };
};

type BuildAvailableTimesParams = {
  date: Date;
  busySlots: BusySlot[];
  workingHours: WorkingHours[];
  serviceDuration: number;
  now: Date;
  slotStepMinutes?: number;
};

export const buildAvailableTimesForDate = ({
  date,
  busySlots,
  workingHours,
  serviceDuration,
  now,
  slotStepMinutes = SLOT_STEP_MINUTES,
}: BuildAvailableTimesParams): string[] => {
  const window = getWindowForDate(workingHours, date);
  if (!window) return [];

  const safeDuration = Math.max(1, Number(serviceDuration) || 0);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const available: string[] = [];

  for (
    let slotStart = window.start;
    slotStart + safeDuration <= window.end;
    slotStart += slotStepMinutes
  ) {
    if (isSameDay(date, now) && slotStart <= nowMinutes) continue;

    const slotEnd = slotStart + safeDuration;

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
};

type IsDateDisabledParams = {
  date: Date;
  workingHours: WorkingHours[];
  now: Date;
};

export const isDateDisabledForBooking = ({
  date,
  workingHours,
  now,
}: IsDateDisabledParams): boolean => {
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (targetDate < todayStart) return true;

  const window = getWindowForDate(workingHours, targetDate);
  if (!window) return true;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  if (isSameDay(targetDate, now) && nowMinutes >= window.end) return true;

  return false;
};

type IsDayOverParams = {
  date: Date;
  workingHours: WorkingHours[];
  now: Date;
};

export const isDayOverForBooking = ({ date, workingHours, now }: IsDayOverParams): boolean => {
  const window = getWindowForDate(workingHours, date);
  if (!window) return true;

  if (!isSameDay(date, now)) return false;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return nowMinutes >= window.end;
};
