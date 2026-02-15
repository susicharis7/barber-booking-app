export type DateParam = Date | string | null | undefined;

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

export const isSameDay = (a: Date, b: Date) => {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
};

// from date object to string format (backend expects string)
export const toLocalDate = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const startOfDay = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const clampDate = (value: Date, min: Date, max: Date) => {
  const time = Math.min(Math.max(value.getTime(), min.getTime()), max.getTime());
  return new Date(time);
};

export const monthKey = (year: number, month: number) => year * 12 + month;

const coerceDate = (value: DateParam) => {
  if (!value) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === 'string') {
    const date = value.includes('T') ? new Date(value) : new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
};

export const formatDate = (
  value: DateParam,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  },
) => {
  const date = coerceDate(value);
  if (!date) return '-';
  return date.toLocaleDateString('en-US', options);
};

export const formatDateShort = (value: DateParam) =>
  formatDate(value, { weekday: 'short', month: 'short', day: 'numeric' });

export const parseDate = (value: DateParam) => {
  return coerceDate(value);
};

export const formatTime = (timeString: string) => timeString.slice(0, 5);
