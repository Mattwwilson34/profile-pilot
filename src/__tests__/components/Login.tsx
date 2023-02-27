import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../../features/login';
import { googleAuthSignInWithRedirect } from '../../firebase/firebase-auth';

jest.mock('../../firebase/firebase-auth');

describe('<Login />', () => {
  it('renders the component with heading and sub-heading', () => {
    const h1Text = 'Profile Pilot';
    const h2Text = 'Connections made easy.';

    render(<Login />);

    const h1 = screen.getByRole('heading', { name: h1Text });
    const h2 = screen.getByRole('heading', { name: h2Text });

    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });

  it('renders the Logo svg', () => {
    render(<Login />);
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the login button', () => {
    render(<Login />);

    const loginButton = screen.getByRole('button', { name: 'Login' });

    expect(loginButton).toBeInTheDocument();
  });

  it('calls googleAuthSingInWithRedirect when login button is clicked', () => {
    render(<Login />);

    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.click(loginButton);

    expect(googleAuthSignInWithRedirect).toHaveBeenCalled();
  });
});
