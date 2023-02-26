import React from 'react';
import { render, screen } from '@testing-library/react';
import TopNav from '../../features/top-nav';

describe('<TopNav />', () => {
  it('renders the component', () => {
    render(<TopNav user={{ user: 'user' }} />);
    const text = screen.getByText('Profile Pilot');
    expect(text).toBeInTheDocument();
  });

  it('renders logout button when user is logged in', () => {
    render(<TopNav user={{ user: 'user' }} />);
    const text = screen.getByText('Logout');
    expect(text).toBeInTheDocument();
  });

  it('renders without logout button when no user logged in', () => {
    render(<TopNav user={null} />);
    const logoutButton = screen.queryByText('Logout');
    expect(logoutButton).toBeNull();
  });
});
