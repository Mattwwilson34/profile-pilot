import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC9xd8ynzNsoaloJcTu0Nd4D6mNJfKu2vQ',
  authDomain: 'profile-pilot.firebaseapp.com',
  projectId: 'profile-pilot',
  storageBucket: 'profile-pilot.appspot.com',
  messagingSenderId: '333109282355',
  appId: '1:333109282355:web:a24ce2fdc8a2dff47e0546',
  measurementId: 'G-0C8QDBRE38',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
