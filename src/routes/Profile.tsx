import React from 'react';
import { useLoaderData } from 'react-router-dom';
import type { User } from '../types/User';

const Profile = (): JSX.Element => {
  const data = useLoaderData() as User;
  return <div>{`Welcome ${data.username as string}`}</div>;
};

export default Profile;
