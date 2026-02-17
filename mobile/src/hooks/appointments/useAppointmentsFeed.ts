import { useCallback, useRef, useState } from 'react';
import { isApiError } from '../../services/api/client';
import { getPastAppointments, getUpcomingAppointments } from '../../services/appointments-service';
import type { AppointmentDetailed } from '../../types';

type TabType = 'upcoming' | 'past';

type LoadOptions = {
  reset?: boolean;
  silent?: boolean;
};

type UseAppointmentsFeedReturn = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  appointments: AppointmentDetailed[];
  upcomingAppointments: AppointmentDetailed[];
  pastAppointments: AppointmentDetailed[];
  loading: boolean;
  error: string | null;
  loadingUpcoming: boolean;
  loadingPast: boolean;
  hasAppointments: boolean;
  loadUpcoming: (options?: LoadOptions) => Promise<void>;
  loadPast: (options?: LoadOptions) => Promise<void>;
  loadInitial: () => Promise<void>;
};

export const useAppointmentsFeed = (pageSize = 5): UseAppointmentsFeedReturn => {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentDetailed[]>([]);
  const [pastAppointments, setPastAppointments] = useState<AppointmentDetailed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [loadingPast, setLoadingPast] = useState(false);

  const loadingUpcomingRef = useRef(false);
  const loadingPastRef = useRef(false);
  const upcomingCursorRef = useRef<string | null>(null);
  const pastCursorRef = useRef<string | null>(null);
  const upcomingHasMoreRef = useRef(true);
  const pastHasMoreRef = useRef(true);

  const setUpcomingLoadingSync = (value: boolean) => {
    loadingUpcomingRef.current = value;
    setLoadingUpcoming(value);
  };

  const setPastLoadingSync = (value: boolean) => {
    loadingPastRef.current = value;
    setLoadingPast(value);
  };

  const handleFeedError = (err: unknown, silent: boolean) => {
    if (isApiError(err)) {
      if (!silent) {
        setError(err.message);
      } else {
        console.error('Silent refresh failed: ', err.status, err.code, err.message);
      }

      return;
    }

    if (!silent) {
      setError('Failed to load appointments');
    } else {
      console.error('Silent refresh failed: ', err);
    }
  };

  const loadUpcoming = useCallback(
    async ({ reset = false, silent = false }: LoadOptions = {}) => {
      if (loadingUpcomingRef.current) return;
      if (!reset && !upcomingHasMoreRef.current) return;

      setUpcomingLoadingSync(true);

      if (reset) {
        upcomingCursorRef.current = null;
        upcomingHasMoreRef.current = true;
      }

      try {
        const cursor = reset ? null : upcomingCursorRef.current;
        const res = await getUpcomingAppointments({ limit: pageSize, cursor });
        const items = res.appointments ?? [];

        setUpcomingAppointments((prev) => (reset ? items : [...prev, ...items]));
        upcomingCursorRef.current = res.nextCursor ?? null;
        upcomingHasMoreRef.current = Boolean(res.nextCursor);
      } catch (err: unknown) {
        handleFeedError(err, silent);
      } finally {
        setUpcomingLoadingSync(false);
      }
    },
    [pageSize],
  );

  const loadPast = useCallback(
    async ({ reset = false, silent = false }: LoadOptions = {}) => {
      if (loadingPastRef.current) return;
      if (!reset && !pastHasMoreRef.current) return;

      setPastLoadingSync(true);

      if (reset) {
        pastCursorRef.current = null;
        pastHasMoreRef.current = true;
      }

      try {
        const cursor = reset ? null : pastCursorRef.current;
        const res = await getPastAppointments({ limit: pageSize, cursor });
        const items = res.appointments ?? [];

        setPastAppointments((prev) => (reset ? items : [...prev, ...items]));
        pastCursorRef.current = res.nextCursor ?? null;
        pastHasMoreRef.current = Boolean(res.nextCursor);
      } catch (err: unknown) {
        handleFeedError(err, silent);
      } finally {
        setPastLoadingSync(false);
      }
    },
    [pageSize],
  );

  const loadInitial = useCallback(async () => {
    setLoading(true);
    setError(null);

    await Promise.all([loadUpcoming({ reset: true }), loadPast({ reset: true })]);

    setLoading(false);
  }, [loadUpcoming, loadPast]);

  const appointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;
  const hasAppointments = appointments.length > 0;

  return {
    activeTab,
    setActiveTab,
    appointments,
    upcomingAppointments,
    pastAppointments,
    loading,
    error,
    loadingUpcoming,
    loadingPast,
    hasAppointments,
    loadUpcoming,
    loadPast,
    loadInitial,
  };
};
