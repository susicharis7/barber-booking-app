export const calculateEndTime = (startTime: string, durationMinutes: number): string => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const safeDuration = Math.max(1, Number(durationMinutes) || 0);

  const startTotalMinutes = (hours || 0) * 60 + (minutes || 0);
  const endTotalMinutes = startTotalMinutes + safeDuration;

  const endHours = Math.floor(endTotalMinutes / 60);
  const endMinutes = endTotalMinutes % 60;

  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
};
