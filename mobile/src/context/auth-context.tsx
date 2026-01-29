import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebaseAuth } from '../services/firebase';


type AuthContextType = { 
    user: User | null;
    loading : boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);

            if (!firebaseUser) {
                return;
            }

            try {
                const token = await firebaseUser.getIdToken();
                console.log("Token: ", token);
                const res = await fetch('http://192.168.1.13:5000/api/users/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const contentType = res.headers.get('content-type') || '';
                const raw = await res.text();

                if (!res.ok) {
                    console.log('Backend Auth Error:', res.status, raw);
                    return;
                }

                const data = contentType.includes('application/json')
                    ? JSON.parse(raw)
                    : { raw };

                console.log("Backend User: ", data);
            } catch (error) {
                console.log("Backend Auth Error: " ,error);
            }

            
        });

        return unsubscribe;
    }, []);


    return(
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
