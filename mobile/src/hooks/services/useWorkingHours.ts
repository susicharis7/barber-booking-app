import { useCallback, useEffect, useState } from 'react';
import type { WorkingHours } from '../../types';
import { isApiError } from '../../services/api/client';
import { getBarberWorkingHours } from '../../services/barber-service';

type UseWorkingHoursResult = {
  workingHours: WorkingHours[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export const useWorkingHours = (barberId: number): UseWorkingHoursResult => {
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getBarberWorkingHours(barberId);
      setWorkingHours(res.workingHours ?? []);
    } catch (err: unknown) {
      if (isApiError(err)) {
        setError(err.message);
      } else {
        setError('Failed to load working hours.');
      }
      setWorkingHours([]);
    } finally {
      setLoading(false);
    }
  }, [barberId]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { workingHours, loading, error, refetch };
};
