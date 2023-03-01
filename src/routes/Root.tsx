import React, { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import TopNav from '../features/top-nav';
import Login from '../features/login';
import { Outlet, useNavigate } from 'react-router-dom';

const Root = (): JSX.Element => {
  const user = useFirebaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      if (user.surveyData == null) {
        navigate('/survery');
      } else {
        navigate('/profile');
      }
    }
  }, [user]);

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
      <Outlet />
    </>
  );
};

export default Root;
