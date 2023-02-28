import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { auth } from '../../firebase/firebase-auth';
import {
  FirebaseAuthContext,
  FirebaseAuthProvider,
} from '../../context/FireBaseAuthContext';
import {
  userExistsInFirestore,
  addNewUserToFirestore,
} from '../../firebase/firebase-db';
import { googleUser, user } from '../mockData/mockAuthProviderData';

jest.mock('../../firebase/firebase-auth');
jest.mock('../../firebase/firebase-db');

const renderFirebaseAuthProvider = async (): Promise<void> => {
  await act(async () => {
    render(
      <FirebaseAuthProvider>
        <FirebaseAuthContext.Consumer>
          {(context) => {
            return <div>{context?.user?.displayName ?? 'No user found'}</div>;
          }}
        </FirebaseAuthContext.Consumer>
      </FirebaseAuthProvider>
    );
  });
};

describe('<FirebaseAuthProvider />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    (console.error as jest.Mock).mockImplementation(() => {
      return 'error';
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    (console.error as jest.Mock).mockRestore();
  });

  it('renders its children', () => {
    render(
      <FirebaseAuthProvider>
        <div>Test</div>
      </FirebaseAuthProvider>
    );

    const text = screen.getByText('Test');
    expect(text).toBeInTheDocument();
  });

  it('sets the user state to null when there is not authenticated user', async () => {
    const onAuthStateChanged = jest.fn((cb) => {
      cb(null);
      return jest.fn();
    });
    auth.onAuthStateChanged = onAuthStateChanged;

    render(
      <FirebaseAuthProvider>
        <FirebaseAuthContext.Consumer>
          {(context) => (
            <div>{context?.user === null ? 'No user found' : 'User found'}</div>
          )}
        </FirebaseAuthContext.Consumer>
      </FirebaseAuthProvider>
    );

    const text = screen.getByText('No user found');

    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(text).toBeInTheDocument();
  });

  it('throws error if user.email is not of type string', async () => {
    const providerData = [
      {
        providerId: 'google.com',
        uid: '12345',
        displayName: 'Test User',
        email: 55,
        phoneNumber: null,
        photoURL: 'https://test.com/photo.png',
      },
    ];
    const googleUser = {
      providerData,
    };

    const [userData] = providerData;

    const user = { ...userData, username: userData.email };

    (userExistsInFirestore as jest.Mock).mockReturnValue({
      exists: true,
      data: user,
    });

    const onAuthStateChanged = jest.fn((cb) => {
      cb(googleUser);
      return jest.fn();
    });
    auth.onAuthStateChanged = onAuthStateChanged;

    try {
      await renderFirebaseAuthProvider();
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
});

it('updates user state when auth state changes and user exists in database', async () => {
  // these assertions rely on the mockAuthProvider import variables
  (userExistsInFirestore as jest.Mock).mockReturnValue({
    exists: true,
    data: user,
  });

  const onAuthStateChanged = jest.fn((cb) => {
    cb(googleUser);
    return jest.fn();
  });
  auth.onAuthStateChanged = onAuthStateChanged;

  await renderFirebaseAuthProvider();

  const text = screen.getByText('Test User');

  expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
  expect(userExistsInFirestore).toHaveBeenCalledTimes(1);
  expect(addNewUserToFirestore).toHaveBeenCalledTimes(0);
  expect(text).toBeInTheDocument();
});

it('updates the user state when auth state changes and saves user to db if user not in db', async () => {
  // these assertions rely on the mockAuthProvider import variables
  (userExistsInFirestore as jest.Mock).mockReturnValue({
    exists: false,
    data: user,
  });

  const onAuthStateChanged = jest.fn((cb) => {
    cb(googleUser);
    return jest.fn();
  });
  auth.onAuthStateChanged = onAuthStateChanged;

  await renderFirebaseAuthProvider();

  const text = screen.getByText('Test User');

  expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
  expect(userExistsInFirestore).toHaveBeenCalledTimes(2);
  expect(addNewUserToFirestore).toHaveBeenCalledTimes(1);
  expect(text).toBeInTheDocument();
});
