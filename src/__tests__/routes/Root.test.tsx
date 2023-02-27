import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import Root from '../../routes/Root';
import { FirebaseAuthProvider } from '../../context/FireBaseAuthContext';
import type { User } from '../../types/User';
import { user } from '../mockData/mockUser';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';

jest.mock('../../hooks/useFirebaseAuth', () => jest.fn());

const renderRootRoute = async (
  user: User | undefined = undefined
): Promise<void> => {
  await act(async () => {
    render(
      <FirebaseAuthProvider value={user}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </FirebaseAuthProvider>
    );
  });
};

describe('<Root />', () => {
  it('renders component when user is not null or undefined', async () => {
    (useFirebaseAuth as jest.Mock).mockReturnValue(user);
    await renderRootRoute();
    const text = screen.getByText('Profile Pilot');
    expect(text).toBeInTheDocument();
  });

  it('renders loading message if user is undefined', async () => {
    (useFirebaseAuth as jest.Mock).mockReturnValue(undefined);
    await renderRootRoute();
    const text = screen.getByText('Loading user info');
    expect(text).toBeInTheDocument();
  });

  it('renders login button if user is null', async () => {
    (useFirebaseAuth as jest.Mock).mockReturnValue(null);
    await renderRootRoute();
    const text = screen.getByText('Login');
    expect(text).toBeInTheDocument();
  });
});
