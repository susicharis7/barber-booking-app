import { useCallback, useMemo, useState } from 'react';
import {
  clampDate,
  daysOfWeek,
  formatDate,
  getDaysInMonth,
  getFirstDayOfMonth,
  monthKey,
  months,
  parseDate,
  startOfDay,
  toLocalDate,
} from '../../utils/calendar';

type CalendarCell = {
  key: string;
  day: number | null;
  disabled: boolean;
  selected: boolean;
};

type UseWaitingListDateWindowParams = {
  date: string;
  nextAvailableDate?: string | null;
};

type UseWaitingListDateWindowResult = {
  startDateLabel: string;
  endDateLabel: string;
  startDatePayload: string;
  endDatePayload: string | null;
  showCalendar: boolean;
  toggleCalendar: () => void;
  currentMonthName: string;
  currentYear: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  goPrevMonth: () => void;
  goNextMonth: () => void;
  weekDays: string[];
  calendarCells: CalendarCell[];
  selectDay: (day: number) => void;
};

export const useWaitingListDateWindow = ({
  date,
  nextAvailableDate,
}: UseWaitingListDateWindowParams): UseWaitingListDateWindowResult => {
  const minDate = useMemo(() => parseDate(date) ?? new Date(), [date]);
  const maxDate = useMemo(() => {
    const maxDateRaw = parseDate(nextAvailableDate ?? date);
    return maxDateRaw && maxDateRaw >= minDate ? maxDateRaw : minDate;
  }, [date, minDate, nextAvailableDate]);

  const initialStart = useMemo(
    () => clampDate(parseDate(date) ?? minDate, minDate, maxDate),
    [date, maxDate, minDate],
  );

  const [startDate, setStartDate] = useState<Date>(initialStart);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(initialStart.getMonth());
  const [currentYear, setCurrentYear] = useState(initialStart.getFullYear());

  const startDateLabel = useMemo(() => formatDate(startDate), [startDate]);
  const endDateLabel = useMemo(() => formatDate(maxDate), [maxDate]);
  const startDatePayload = useMemo(() => toLocalDate(startDate), [startDate]);
  const endDatePayload = useMemo(
    () => (nextAvailableDate ? toLocalDate(maxDate) : null),
    [maxDate, nextAvailableDate],
  );

  const minMonthKey = useMemo(() => monthKey(minDate.getFullYear(), minDate.getMonth()), [minDate]);
  const maxMonthKey = useMemo(() => monthKey(maxDate.getFullYear(), maxDate.getMonth()), [maxDate]);
  const currentKey = useMemo(
    () => monthKey(currentYear, currentMonth),
    [currentYear, currentMonth],
  );

  const canGoPrev = currentKey > minMonthKey;
  const canGoNext = currentKey < maxMonthKey;

  const isDateDisabled = useCallback(
    (day: number) => {
      const dateToCheck = new Date(currentYear, currentMonth, day);
      const minBound = startOfDay(minDate);
      const maxBound = startOfDay(maxDate);
      return dateToCheck < minBound || dateToCheck > maxBound;
    },
    [currentMonth, currentYear, maxDate, minDate],
  );

  const isDateSelected = useCallback(
    (day: number) =>
      startDate.getDate() === day &&
      startDate.getMonth() === currentMonth &&
      startDate.getFullYear() === currentYear,
    [currentMonth, currentYear, startDate],
  );

  const selectDay = useCallback(
    (day: number) => {
      if (isDateDisabled(day)) return;
      setStartDate(new Date(currentYear, currentMonth, day));
      setShowCalendar(false);
    },
    [currentMonth, currentYear, isDateDisabled],
  );

  const goPrevMonth = useCallback(() => {
    if (!canGoPrev) return;
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, [canGoPrev]);

  const goNextMonth = useCallback(() => {
    if (!canGoNext) return;
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, [canGoNext]);

  const calendarCells = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const cells: CalendarCell[] = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push({
        key: `empty-${i}`,
        day: null,
        disabled: true,
        selected: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({
        key: `day-${day}`,
        day,
        disabled: isDateDisabled(day),
        selected: isDateSelected(day),
      });
    }

    return cells;
  }, [currentMonth, currentYear, isDateDisabled, isDateSelected]);

  const toggleCalendar = useCallback(() => {
    setShowCalendar((prev) => !prev);
  }, []);

  return {
    startDateLabel,
    endDateLabel,
    startDatePayload,
    endDatePayload,
    showCalendar,
    toggleCalendar,
    currentMonthName: months[currentMonth],
    currentYear,
    canGoPrev,
    canGoNext,
    goPrevMonth,
    goNextMonth,
    weekDays: daysOfWeek,
    calendarCells,
    selectDay,
  };
};
