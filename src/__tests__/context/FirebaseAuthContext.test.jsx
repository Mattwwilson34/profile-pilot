import React from 'react';
import { render } from '@testing-library/react';
import { auth } from '../../firebase/firebase-auth';
import {
  FirebaseAuthContext,
  FirebaseAuthProvider,
} from '../../context/FireBaseAuthContext';

jest.mock('../../firebase/firebase-auth');

describe('FirebaseAuthProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders its children', () => {
    const { getByText } = render(
      <FirebaseAuthProvider>
        <div>Test</div>
      </FirebaseAuthProvider>
    );

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('updates the user state when the authentication state changes', async () => {
    const providerData = [
      {
        providerId: 'google.com',
        uid: '12345',
        displayName: 'Test User',
        email: 'test@test.com',
        phoneNumber: null,
        photoURL: 'https://test.com/photo.png',
      },
    ];
    const googleUser = {
      providerData,
    };

    const onAuthStateChanged = jest.fn((cb) => {
      cb(googleUser);
      return jest.fn();
    });
    auth.onAuthStateChanged = onAuthStateChanged;

    const { findByText } = render(
      <FirebaseAuthProvider>
        <FirebaseAuthContext.Consumer>
          {(context) => (
            <div>{context?.user?.displayName ?? 'No user found'}</div>
          )}
        </FirebaseAuthContext.Consumer>
      </FirebaseAuthProvider>
    );

    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(await findByText('Test User')).toBeInTheDocument();
  });

  it('sets the user state to null when there is not authenticated user', async () => {
    const onAuthStateChanged = jest.fn((cb) => {
      cb(null);
      return jest.fn();
    });
    auth.onAuthStateChanged = onAuthStateChanged;

    const { findByText } = render(
      <FirebaseAuthProvider>
        <FirebaseAuthContext.Consumer>
          {(context) => (
            <div>{context?.user === null ? 'No user found' : 'User found'}</div>
          )}
        </FirebaseAuthContext.Consumer>
      </FirebaseAuthProvider>
    );

    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(await findByText('No user found')).toBeInTheDocument();
  });
});
