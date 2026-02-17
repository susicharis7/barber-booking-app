import { useCallback, useEffect, useState } from 'react';
import type { Barber } from '../../types';
import { isApiError } from '../../services/api/client';
import { getBarbers } from '../../services/barber-service';

type UseBarbersResult = {
  barbers: Barber[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export const useBarbers = (): UseBarbersResult => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getBarbers();
      setBarbers(data.barbers ?? []);
    } catch (err: unknown) {
      if (isApiError(err)) {
        setError(err.message);
      } else {
        setError('Failed to load barbers.');
      }
      setBarbers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { barbers, loading, error, refetch };
};
