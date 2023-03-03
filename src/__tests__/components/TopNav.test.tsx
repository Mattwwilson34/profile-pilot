import React from 'react';
import { render, type RenderResult, screen } from '@testing-library/react';
import TopNav from '../../features/top-nav';
import { QueryClient, QueryClientProvider } from 'react-query';

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
    const text = screen.getByText('Logout');
    expect(text).toBeInTheDocument();
  });

  it('renders without logout button when no user logged in', () => {
    renderTopNav(false);
    const logoutButton = screen.queryByText('Logout');
    expect(logoutButton).toBeNull();
  });
});
