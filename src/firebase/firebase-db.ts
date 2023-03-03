import app from './firebase';
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  query,
  getDocs,
  where,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { auth } from './firebase-auth';
import type { User, SurveryData } from '../types/User';
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
    const { exists, data } = await userExistsInFirestore(user?.username);
    if (exists) {
      console.log('user already exists in database');
      localStorage.setItem('profile-pilot', JSON.stringify(data));
      return false;
    } else {
      const userUid = auth?.currentUser?.uid;
      if (typeof userUid !== 'string') {
        throw Error('user.uid must be of type string');
      }
      await setDoc(doc(db, 'users', userUid), user);
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
): Promise<DocumentData | null> => {
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
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateUserSurveyQuestions = async (
  surveyData: SurveryData
): Promise<void> => {
  const docId = auth?.currentUser?.uid;
  if (typeof docId !== 'string') {
    throw Error('docId must be of type string');
  }
  try {
    const userRef = doc(db, 'users', docId);
    await updateDoc(userRef, { surveyData });
    const userJson = localStorage.getItem('profile-pilot');
    if (typeof userJson !== 'string') {
      throw Error('userJson must be of type string');
    }
    const user = JSON.parse(userJson);
    user.surveyData = surveyData;
    localStorage.setItem('profile-pilot', JSON.stringify(user));
    console.log('Successfully added survey data to:', docId);
  } catch (error) {
    console.log('Error adding survery data', error);
  }
};

export {
  userExistsInFirestore,
  addNewUserToFirestore,
  getUserFromFirestoreById,
  updateUserSurveyQuestions,
};
