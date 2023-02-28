import app from './firebase';
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  addDoc,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import type { User } from '../types/User';
import type { DocumentData } from 'firebase/firestore';

const db = getFirestore(app);

const userExistsInFirestore = async (
  email: string
): Promise<{ exists: boolean; data: User | null }> => {
  try {
    const usersRef = collection(db, 'users');
    const usersQuery = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(usersQuery);
    const matchingDocs = querySnapshot.docs;

    if (matchingDocs.length > 0) {
      const data = matchingDocs[0].data() as User;
      return { exists: true, data };
    }

    return { exists: false, data: null };
  } catch (error) {
    console.log(error);
    return { exists: false, data: null };
  }
};

const addNewUserToFirestore = async (user: User): Promise<boolean> => {
  try {
    if (typeof user?.username !== 'string') {
      throw Error('user.username must be of type string');
    }
    const { exists } = await userExistsInFirestore(user?.username);
    if (exists) {
      console.log('user already exists in database');
      return false;
    } else {
      const collectionRef = collection(db, 'users');
      await addDoc(collectionRef, user);
      console.log('Document added: ', user);
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getUserFromFirestoreById = async (
  userId: string
): Promise<DocumentData | boolean> => {
  try {
    const documentRef = doc(collection(db, 'users'), userId);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      // Document exists
      const data = documentSnapshot.data();
      return data;
    } else {
      // Document does not exist
      console.log('Document not found.');
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export {
  userExistsInFirestore,
  addNewUserToFirestore,
  getUserFromFirestoreById,
};
