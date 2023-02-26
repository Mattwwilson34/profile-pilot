import React, { createContext, useState, useEffect } from 'react';
import type firebase from 'firebase/auth';
import { auth } from '../firebase/firebase-auth';

type User = firebase.User | null;
interface ContextState {
  user: User | undefined;
}

const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={{ user }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthContext, FirebaseAuthProvider };
