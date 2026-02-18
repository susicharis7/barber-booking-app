import { useCallback, useState } from 'react';
import { isApiError } from '../../services/api/client';
import { logout } from '../../services/auth/auth-service';
import { deleteMe } from '../../services/users-service';

type DeleteResult = { ok: true } | { ok: false; message: string };

type UseDeleteAccountReturn = {
  deleting: boolean;
  deleteAccount: () => Promise<DeleteResult>;
};

export const useDeleteAccount = (): UseDeleteAccountReturn => {
  const [deleting, setDeleting] = useState(false);

  const deleteAccount = useCallback(async (): Promise<DeleteResult> => {
    setDeleting(true);

    try {
      await deleteMe();
      await logout();
      return { ok: true };
    } catch (error: unknown) {
      if (isApiError(error)) {
        return { ok: false, message: error.message };
      }

      return { ok: false, message: 'Unexpected error' };
    } finally {
      setDeleting(false);
    }
  }, []);

  return { deleting, deleteAccount };
};
