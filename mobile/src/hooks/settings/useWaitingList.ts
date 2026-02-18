import { useCallback, useMemo, useState } from 'react';
import { isApiError } from '../../services/api/client';
import { cancelWaitingList, getWaitingList } from '../../services/waiting-list-service';
import type { WaitingListItem } from '../../types';

type CancelResult = { ok: true } | { ok: false; message: string };

type UseWaitingListReturn = {
  waitingList: WaitingListItem[];
  activeList: WaitingListItem[];
  loading: boolean;
  error: string | null;
  load: () => Promise<void>;
  cancelById: (id: number) => Promise<CancelResult>;
};

export const useWaitingList = (): UseWaitingListReturn => {
  const [waitingList, setWaitingList] = useState<WaitingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getWaitingList();
      setWaitingList(res.waitingList || []);
    } catch (err: unknown) {
      if (isApiError(err)) {
        setError(err.message);
      } else {
        setError('Failed to load waiting list');
      }
      setWaitingList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelById = useCallback(
    async (id: number): Promise<CancelResult> => {
      try {
        await cancelWaitingList(id);
        await load();
        return { ok: true };
      } catch (err: unknown) {
        if (isApiError(err) && err.code === 'WAITING_LIST_NOT_FOUND') {
          await load();
          return { ok: false, message: 'Waiting list item no longer exists.' };
        }

        if (isApiError(err)) {
          return { ok: false, message: err.message };
        }

        return { ok: false, message: 'Unexpected error' };
      }
    },
    [load],
  );

  const activeList = useMemo(
    () => waitingList.filter((item) => item.status === 'active'),
    [waitingList],
  );

  return {
    waitingList,
    activeList,
    loading,
    error,
    load,
    cancelById,
  };
};
