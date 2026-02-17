import { useEffect, useMemo, useState } from 'react';

type UseCalendarClockResult = {
  now: Date;
  minDate: Date;
};

export const useCalendarClock = (): UseCalendarClockResult => {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const minDate = useMemo(() => new Date(now.getFullYear(), now.getMonth(), now.getDate()), [now]);

  return { now, minDate };
};
