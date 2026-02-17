import { useCallback, useState } from 'react';
import { isApiError } from '../../services/api/client';
import { getBookedSlots, type BookedSlot } from '../../services/appointments-service';

type UseBookedSlotsResult = {
  bookedSlots: BookedSlot[];
  loading: boolean;
  error: string | null;
  fetchForDate: (barberId: number, date: string) => Promise<BookedSlot[]>;
  readForDate: (barberId: number, date: string) => Promise<BookedSlot[]>;
  clear: () => void;
};

export const useBookedSlots = (): UseBookedSlotsResult => {
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readForDate = useCallback(async (barberId: number, date: string) => {
    const res = await getBookedSlots(barberId, date);
    return res.slots ?? [];
  }, []);

  const fetchForDate = useCallback(
    async (barberId: number, date: string) => {
      setLoading(true);
      setError(null);

      try {
        const slots = await readForDate(barberId, date);
        setBookedSlots(slots);
        return slots;
      } catch (err: unknown) {
        if (isApiError(err)) {
          setError(err.message);
        } else {
          setError('Failed to load booked slots.');
        }
        setBookedSlots([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [readForDate],
  );

  const clear = useCallback(() => {
    setBookedSlots([]);
    setError(null);
  }, []);

  return { bookedSlots, loading, error, fetchForDate, readForDate, clear };
};
