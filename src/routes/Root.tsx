import React from 'react';
import { CircularProgress } from '@mui/material';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import TopNav from '../features/top-nav';
import Login from '../features/login';

const Root = (): JSX.Element => {
  const user = useFirebaseAuth();

  if (user === undefined) {
    return (
      <>
        <TopNav user={user} />
        <h1>Loading user info</h1>
        <CircularProgress />
      </>
    );
  }

  if (user === null) {
    return (
      <>
        <TopNav user={user} />
        <Login />
      </>
    );
  }
  return (
    <>
      <TopNav user={user} />
    </>
  );
};

export default Root;
