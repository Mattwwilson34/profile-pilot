import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase-auth';
import type { User } from '../types/User';

interface ContextState {
  user: User | null | undefined;
}

type FirebaseAuthProviderProps = {
  value?: User | undefined;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider: React.FC<FirebaseAuthProviderProps> = ({
  value,
  children,
}: FirebaseAuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null | undefined>(value);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((googleUser) => {
      if (googleUser === null) {
        setUser(null);
      } else {
        const { providerData } = googleUser;
        const [userData] = providerData;
        const user: User = { ...userData };
        setUser(user);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={{ user }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthContext, FirebaseAuthProvider };
