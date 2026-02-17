import { useEffect, useState } from 'react';

type UseNextAvailableDateParams = {
  selectedDate: Date | null;
  isSelectedDayOver: boolean;
  availableCount: number;
  hasFreeSlot: (date: Date) => Promise<boolean>;
  lookaheadDays?: number;
};

type UseNextAvailableDateResult = {
  nextAvailableDate: Date | null;
  isSearchingNext: boolean;
};

export const useNextAvailableDate = ({
  selectedDate,
  isSelectedDayOver,
  availableCount,
  hasFreeSlot,
  lookaheadDays = 30,
}: UseNextAvailableDateParams): UseNextAvailableDateResult => {
  const [nextAvailableDate, setNextAvailableDate] = useState<Date | null>(null);
  const [isSearchingNext, setIsSearchingNext] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!selectedDate) {
        setNextAvailableDate(null);
        setIsSearchingNext(false);
        return;
      }

      if (!isSelectedDayOver && availableCount > 0) {
        setNextAvailableDate(null);
        setIsSearchingNext(false);
        return;
      }

      setIsSearchingNext(true);
      setNextAvailableDate(null);

      const start = new Date(selectedDate);

      for (let i = 1; i <= lookaheadDays; i++) {
        const candidate = new Date(start);
        candidate.setDate(start.getDate() + i);

        try {
          const free = await hasFreeSlot(candidate);
          if (cancelled) return;

          if (free) {
            setNextAvailableDate(candidate);
            break;
          }
        } catch (err) {
          console.error('Find next available date error:', err);
          break;
        }
      }

      if (!cancelled) {
        setIsSearchingNext(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [selectedDate, isSelectedDayOver, availableCount, hasFreeSlot, lookaheadDays]);

  return {
    nextAvailableDate,
    isSearchingNext,
  };
};
