import React from 'react';
import {
  fireEvent,
  render,
  type RenderResult,
  screen,
} from '@testing-library/react';
import SurveyForm from '../../features/survey-form';
import { BrowserRouter } from 'react-router-dom';
import { updateUserSurveyQuestions } from '../../firebase/firebase-db';

jest.mock('../../firebase/firebase-db', () => ({
  updateUserSurveyQuestions: jest.fn(),
}));
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const renderSurveyForm = (): RenderResult => {
  return render(
    <BrowserRouter>
      <SurveyForm />
    </BrowserRouter>
  );
};

beforeEach(() => {
  renderSurveyForm();
});

describe('<SurveryForm />', () => {
  it('renders the component with inputs', () => {
    const textInputs = screen.queryAllByRole('textbox');
    expect(textInputs.length).toBe(5);
  });

  test('should update interests value when input is changed', () => {
    const interestsInput = screen.getByRole('textbox', {
      name: 'What interests you?',
    });
    fireEvent.change(interestsInput, { target: { value: 'Test interests' } });
    expect(interestsInput).toHaveValue('Test interests');
  });

  test('should update skills value when input is changed', () => {
    const skillsInput = screen.getByRole('textbox', {
      name: 'What skills do you have?',
    });
    fireEvent.change(skillsInput, { target: { value: 'Test skills' } });
    expect(skillsInput).toHaveValue('Test skills');
  });

  test('should update hobbies value when input is changed', () => {
    const hobbiesInput = screen.getByRole('textbox', {
      name: 'What are your hobbies?',
    });
    fireEvent.change(hobbiesInput, { target: { value: 'Test hobbies' } });
    expect(hobbiesInput).toHaveValue('Test hobbies');
  });

  test('should update connections value when input is changed', () => {
    const connectionsInput = screen.getByRole('textbox', {
      name: 'Who do you want to connect with?',
    });
    fireEvent.change(connectionsInput, {
      target: { value: 'Test connections' },
    });
    expect(connectionsInput).toHaveValue('Test connections');
  });

  test('should update goals value when input is changed', () => {
    const goalsInput = screen.getByRole('textbox', {
      name: 'What are your goals?',
    });
    fireEvent.change(goalsInput, { target: { value: 'Test goals' } });
    expect(goalsInput).toHaveValue('Test goals');
  });

  test('should call handleSubmit on form submission', async () => {
    const interestsInput = screen.getByRole('textbox', {
      name: 'What interests you?',
    });
    const skillsInput = screen.getByRole('textbox', {
      name: 'What skills do you have?',
    });
    const hobbiesInput = screen.getByRole('textbox', {
      name: 'What are your hobbies?',
    });
    const connectionsInput = screen.getByRole('textbox', {
      name: 'Who do you want to connect with?',
    });
    const goalsInput = screen.getByRole('textbox', {
      name: 'What are your goals?',
    });
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(interestsInput, { target: { value: 'Programming' } });
    fireEvent.change(skillsInput, { target: { value: 'React, TypeScript' } });
    fireEvent.change(hobbiesInput, { target: { value: 'Reading, Hiking' } });
    fireEvent.change(connectionsInput, {
      target: { value: 'Developers, Entrepreneurs' },
    });
    fireEvent.change(goalsInput, { target: { value: 'Learn new skills' } });

    fireEvent.click(submitButton);

    expect(updateUserSurveyQuestions).toHaveBeenCalledWith({
      interests: 'Programming',
      skills: 'React, TypeScript',
      hobbies: 'Reading, Hiking',
      connections: 'Developers, Entrepreneurs',
      goals: 'Learn new skills',
    });
  });
});
