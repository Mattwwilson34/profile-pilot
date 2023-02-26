import * as React from 'react';
import { FirebaseAuthContext } from '../context/FireBaseAuthContext';
import type firebase from 'firebase/auth';

const useFirebaseAuth = (): firebase.User | undefined | null => {
  const context = React.useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      'useFirebaseAuth must be used within a FirebaseAuthProvider'
    );
  }
  return context.user;
};

export default useFirebaseAuth;
