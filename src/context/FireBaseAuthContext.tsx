import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase-auth';
import { addNewUserToFirestore } from '../firebase/firebase-db';
import type { User } from '../types/User';
import type { User as GoogleUser } from 'firebase/auth';

interface ContextState {
  user: User | null;
}

type FirebaseAuthProviderProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const FirebaseAuthContext = createContext<ContextState | null>(null);

const formatUserData = (googleUser: GoogleUser): User => {
  const { providerData } = googleUser;
  const [userData] = providerData;
  const user: User = {
    ...userData,
    username: userData.email,
    docId: googleUser.uid,
  };
  return user;
};

const setUserInLocalStorage = (user: User): void => {
  const userExistsInStorage = localStorage.getItem('profile-pilot');
  if (userExistsInStorage === null) {
    localStorage.setItem('profile-pilot', JSON.stringify(user));
  }
};

const FirebaseAuthProvider: React.FC<FirebaseAuthProviderProps> = ({
  children,
}: FirebaseAuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (googleUser: GoogleUser | null) => {
        if (googleUser === null) {
          setPending(false);
          return;
        }
        void (async () => {
          const formatedUser = formatUserData(googleUser);
          await addNewUserToFirestore(formatedUser);
          setUserInLocalStorage(formatedUser);
          setUser(formatedUser);
          setPending(false);
        })();
      }
    );
    return unsubscribe;
  }, []);

  if (pending) {
    return <div>Waiting for user data to load in Context.</div>;
  }

  return (
    <FirebaseAuthContext.Provider value={{ user }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthContext, FirebaseAuthProvider };
