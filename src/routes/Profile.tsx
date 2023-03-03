import React from 'react';
import { useLoaderData } from 'react-router-dom';
import UserProfile from '../features/user-profile';
import type { User } from '../types/User';

const Profile = (): JSX.Element => {
  const userData = useLoaderData() as User;
  return <UserProfile userData={userData} />;
};

export default Profile;
