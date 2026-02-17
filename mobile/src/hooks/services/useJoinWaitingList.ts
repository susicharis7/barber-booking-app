import { useCallback, useState } from 'react';
import { isApiError } from '../../services/api/client';
import {
  createWaitingList,
  type CreateWaitingListPayload,
} from '../../services/waiting-list-service';

type JoinWaitingListResult =
  | { ok: true }
  | { ok: false; exists: true; message: string }
  | { ok: false; exists: false; message: string };

type UseJoinWaitingListResult = {
  joining: boolean;
  joinWaitingList: (payload: CreateWaitingListPayload) => Promise<JoinWaitingListResult>;
};

export const useJoinWaitingList = (): UseJoinWaitingListResult => {
  const [joining, setJoining] = useState(false);

  const joinWaitingList = useCallback(
    async (payload: CreateWaitingListPayload): Promise<JoinWaitingListResult> => {
      setJoining(true);

      try {
        await createWaitingList(payload);
        return { ok: true };
      } catch (err: unknown) {
        if (isApiError(err) && err.code === 'WAITING_LIST_EXISTS') {
          return { ok: false, exists: true, message: err.message };
        }

        if (isApiError(err)) {
          return { ok: false, exists: false, message: err.message };
        }

        return { ok: false, exists: false, message: 'Unexpected error' };
      } finally {
        setJoining(false);
      }
    },
    [],
  );

  return { joining, joinWaitingList };
};
