import type { User } from '../types/User';
import * as React from 'react';
import { FirebaseAuthContext } from '../context/FireBaseAuthContext';

const useFirebaseAuth = (): User | undefined | null => {
  const context = React.useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      'useFirebaseAuth must be used within a FirebaseAuthProvider'
    );
  }
  return context.user;
};

export default useFirebaseAuth;
