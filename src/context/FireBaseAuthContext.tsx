import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase-auth';
import {
  addNewUserToFirestore,
  userExistsInFirestore,
} from '../firebase/firebase-db';
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
      // user not logged in
      if (googleUser === null) {
        setUser(null);
      }
      // google login success
      else {
        void (async () => {
          const { providerData } = googleUser;
          const [userData] = providerData;
          const user: User = { ...userData, username: userData.email };

          // check if user exists in database
          if (typeof user?.email !== 'string') {
            console.error('user.email must be of type string');
            return false;
          }
          // user exists set user state with firestore user data
          const { exists, data } = await userExistsInFirestore(user.email);
          if (exists) {
            setUser(data);
          }
          // user doesn't exist add user to firestore and set user state
          else {
            await addNewUserToFirestore(user);
            setUser(user);
          }
        })();
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
