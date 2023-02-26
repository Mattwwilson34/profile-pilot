import React from 'react';
import { act, render, renderHook, screen } from '@testing-library/react';
import {
  FirebaseAuthContext,
  FirebaseAuthProvider,
} from '../../context/FireBaseAuthContext';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { BrowserRouter } from 'react-router-dom';
import { type User } from '../../types/User';
import { user } from '../mockData/mockUser';

beforeEach(() => {
  jest.spyOn(console, 'error');
  (console.error as jest.Mock).mockImplementation(() => {
    return 'error';
  });
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});

const TestComponent = (): JSX.Element => {
  const user = useFirebaseAuth();

  if (user === undefined) {
    return (
      <>
        <h1>Loading user info</h1>
      </>
    );
  }

  if (user === null) {
    return (
      <>
        <div>User is not logged in</div>
      </>
    );
  }
  return (
    <>
      <div>User is logged in</div>
    </>
  );
};

const renderTestComponent = async (
  user: User | undefined = undefined
): Promise<void> => {
  await act(async () => {
    render(
      <FirebaseAuthProvider>
        <FirebaseAuthContext.Provider value={{ user }}>
          <BrowserRouter>
            <TestComponent />
          </BrowserRouter>
        </FirebaseAuthContext.Provider>
      </FirebaseAuthProvider>
    );
  });
};

describe('useFirebaseAuth', () => {
  it('returns the user from the FirebaseAuthContext', async () => {
    await renderTestComponent(user);
    const text = screen.getByText('User is logged in');
    expect(text).toBeInTheDocument();
  });

  it('throws an error when used outside a FirebaseAuthProvider', () => {
    try {
      renderHook(() => useFirebaseAuth());
    } catch (error: unknown) {
      const errorMessage =
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message: string }).message
          : 'unknown error';

      expect(errorMessage).toMatch(
        /useFirebaseAuth must be used within a FirebaseAuthProvider/
      );
    }
  });
});
