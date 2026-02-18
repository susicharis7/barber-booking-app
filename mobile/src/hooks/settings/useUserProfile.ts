import { useCallback, useEffect, useMemo, useState } from 'react';
import { isApiError } from '../../services/api/client';
import { updateMe } from '../../services/users-service';
import { useAuth } from '../../context/auth-context';

type SaveResult = { ok: true } | { ok: false; message: string };

type UseUserProfileReturn = {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  phone: string;
  setPhone: (value: string) => void;
  saving: boolean;
  save: () => Promise<SaveResult>;
};

export const useUserProfile = (): UseUserProfileReturn => {
  const { dbUser, refreshDbUser } = useAuth();

  const [didInitForm, setDidInitForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void refreshDbUser();
  }, [refreshDbUser]);

  useEffect(() => {
    if (!dbUser) return;

    setEmail(dbUser.email);

    if (didInitForm) return;

    setFullName(`${dbUser.first_name} ${dbUser.last_name}`);
    setPhone(dbUser.phone || '');
    setDidInitForm(true);
  }, [dbUser, didInitForm]);

  const parsedName = useMemo(() => {
    const parts = fullName.trim().split(' ').filter(Boolean);
    const first_name = parts[0] || '';
    const last_name = parts.slice(1).join(' ');
    return { first_name, last_name };
  }, [fullName]);

  const save = useCallback(async (): Promise<SaveResult> => {
    if (!fullName.trim()) {
      return { ok: false, message: 'Full name is required' };
    }

    if (!parsedName.last_name) {
      return { ok: false, message: 'Please enter both first and last name' };
    }

    setSaving(true);

    try {
      await updateMe({
        first_name: parsedName.first_name,
        last_name: parsedName.last_name,
        phone: phone || null,
      });

      await refreshDbUser();
      setDidInitForm(false);

      return { ok: true };
    } catch (error: unknown) {
      if (isApiError(error)) {
        return { ok: false, message: error.message };
      }

      return { ok: false, message: 'Unexpected error' };
    } finally {
      setSaving(false);
    }
  }, [fullName, parsedName.first_name, parsedName.last_name, phone, refreshDbUser]);

  return {
    fullName,
    setFullName,
    email,
    phone,
    setPhone,
    saving,
    save,
  };
};
