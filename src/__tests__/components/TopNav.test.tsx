import React from 'react';
import {
  render,
  type RenderResult,
  screen,
  fireEvent,
} from '@testing-library/react';
import TopNav from '../../features/top-nav';
import { QueryClient, QueryClientProvider } from 'react-query';
import { signOutOfFirebase } from '../../firebase/firebase-auth';

jest.mock('../../firebase/firebase-auth', () => ({
  signOutOfFirebase: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const renderTopNav = (isLoggedIn: boolean | undefined): RenderResult => {
  return render(
    <QueryClientProvider client={queryClient}>
      <TopNav userAuthorized={isLoggedIn} />
    </QueryClientProvider>
  );
};

describe('<TopNav />', () => {
  it('renders the component', () => {
    renderTopNav(true);
    const text = screen.getByText('Profile Pilot');
    expect(text).toBeInTheDocument();
  });

  it('renders logout button when user is logged in', () => {
    renderTopNav(true);
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();

    const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

    fireEvent.click(logoutButton);
    expect(signOutOfFirebase).toHaveBeenCalledTimes(1);
    expect(queryClient.invalidateQueries).toHaveBeenCalledTimes(1);
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['user'],
    });

    invalidateQueriesSpy.mockRestore();
  });

  it('renders without logout button when no user logged in', () => {
    renderTopNav(false);
    const logoutButton = screen.queryByText('Logout');
    expect(logoutButton).toBeNull();
  });
});
