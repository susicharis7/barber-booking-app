import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebaseAuth } from '../services/firebase';
import { api, isApiError } from '../services/api';
import { DatabaseUser } from '../types';

type AuthContextType = {
  user: User | null;
  dbUser: DatabaseUser | null;
  loading: boolean;
  refreshDbUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  dbUser: null,
  loading: true,
  refreshDbUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DatabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDbUser = async () => {
    try {
      const data = await api.get<{ user: DatabaseUser }>('/api/users/me');
      setDbUser(data.user);
    } catch (error: unknown) {
      if (isApiError(error)) {
        console.log('Backend Auth Error:', error.status, error.code, error.message);
      } else {
        console.log('Backend Auth Error:', error);
      }
      setDbUser(null);
    }
  };


  const refreshDbUser = async () => {
    if (user) {
      await fetchDbUser();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        await firebaseUser.getIdToken();
        await fetchDbUser();
      } else {
        setDbUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, refreshDbUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);