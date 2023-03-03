import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from '../../features/user-profile';

const userData = {
  email: 'test@test.com',
  providerId: 'test-provider',
  photoURL: 'https://example.com/image.jpg',
  surveyData: {
    goals: 'Test goals',
    hobbies: 'Test hobbies',
    skills: 'Test skills',
    interests: 'Test interests',
    connections: 'Test connections',
  },
  docId: 'test-doc-id',
  phoneNumber: null,
  uid: 'test-uid',
  username: 'test-username',
  displayName: 'Test User',
};

describe('UserProfile', () => {
  test('renders user profile information', () => {
    render(<UserProfile userData={userData} />);
    const profileImage = screen.getByAltText(userData.displayName);
    const displayName = screen.getByText(userData.displayName);
    const surveyQuestions = screen.getByRole('list');

    expect(profileImage).toBeInTheDocument();
    expect(displayName).toBeInTheDocument();
    expect(surveyQuestions).toBeInTheDocument();
  });

  test('displays user profile image', () => {
    render(<UserProfile userData={userData} />);
    const profileImage = screen.getByAltText(userData.displayName);

    expect(profileImage).toHaveAttribute('src', userData.photoURL);
  });

  test('renders survey questions', () => {
    render(<UserProfile userData={userData} />);
    const surveyQuestions = screen.getAllByRole('listitem');
    const { goals, hobbies, skills, interests, connections } =
      userData.surveyData;

    expect(surveyQuestions).toHaveLength(5);
    expect(surveyQuestions[0]).toHaveTextContent(goals);
    expect(surveyQuestions[1]).toHaveTextContent(hobbies);
    expect(surveyQuestions[2]).toHaveTextContent(skills);
    expect(surveyQuestions[3]).toHaveTextContent(interests);
    expect(surveyQuestions[4]).toHaveTextContent(connections);
  });
});
