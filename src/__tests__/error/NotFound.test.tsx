import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../../error/NotFound';
import { BrowserRouter } from 'react-router-dom';

describe('NotFound', () => {
  it('should render the correct heading', () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('404 Error');
  });

  it('should render the correct subheading', () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    const subheading = screen.getByText(
      'Sorry the page you are looking for does not exist.'
    );
    expect(subheading).toHaveTextContent(
      'Sorry the page you are looking for does not exist.'
    );
  });

  it('should render the logo', () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render the link to the home page', () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Click here to return the Home Page.');
  });
});
