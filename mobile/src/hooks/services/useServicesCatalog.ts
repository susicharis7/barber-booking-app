import { useCallback, useEffect, useState } from 'react';
import type { ServicesAndPriceList } from '../../types';
import { isApiError } from '../../services/api/client';
import { getServiceCatalog } from '../../services/services-service';

type UseServicesCatalogResult = {
  services: ServicesAndPriceList[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export const useServicesCatalog = (): UseServicesCatalogResult => {
  const [services, setServices] = useState<ServicesAndPriceList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getServiceCatalog();
      setServices(data.services ?? []);
    } catch (err: unknown) {
      if (isApiError(err)) {
        setError(err.message);
      } else {
        setError('Failed to load services.');
      }
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { services, loading, error, refetch };
};
