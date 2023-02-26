import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { googleAuthSignInWithRedirect } from '../firebase/firebase-auth';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import TopNav from '../features/top-nav';

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
        <Button variant='contained' onClick={googleAuthSignInWithRedirect}>
          Login Please
        </Button>
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
