import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, type RenderResult, screen } from '@testing-library/react';
import Survey from '../../routes/Survey';

const renderSurvey = (): RenderResult => {
  return render(
    <BrowserRouter>
      <Survey />
    </BrowserRouter>
  );
};

const welcome = `Welcome to Profile Pilot!`;
const description = `To help you connect with like-minded individuals, please answer 5 quick questions about yourself.`;

describe('<Survey />', () => {
  it('renders the component', () => {
    renderSurvey();
    const welcomeText = screen.getByText(welcome);
    const descriptionText = screen.getByText(description);
    const surveyForm = screen.getByRole('form');

    expect(welcomeText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
    expect(surveyForm).toBeInTheDocument();
  });
});
