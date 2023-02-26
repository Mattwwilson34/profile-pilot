import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import app from './firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const googleAuthSignInWithRedirect = (): void => {
  void (async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log(error);
    }
  })();
};

const signOutOfFirebase = (): void => {
  void (async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  })();
};

export { googleAuthSignInWithRedirect, auth, signOutOfFirebase };
