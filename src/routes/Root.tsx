import React, { useEffect } from 'react';
import TopNav from '../features/top-nav';
import Login from '../features/login';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUserFromFirestoreById } from '../firebase/firebase-db';
import { useQuery } from 'react-query';

const Root = (): JSX.Element => {
  const navigate = useNavigate();
  const localUserJson = localStorage.getItem('profile-pilot');
  const localUser = JSON.parse(localUserJson ?? 'null');
  const homeURL = 'https://profile-pilot.web.app/';
  const localHostURL = 'http://localhost:5173/';
  const currURL = window.location.href;

  useEffect(() => {
    const surveyDataPresent = localUser?.surveyData;
    if (surveyDataPresent == null) {
      navigate('/survey');
    } else if (currURL === homeURL || currURL === localHostURL) {
      navigate(`/profile/${localUser.docId as string}`);
    }
  }, []);

  const {
    isLoading,
    data: user,
    isSuccess,
  } = useQuery({
    queryKey: 'user',
    queryFn: async () => await getUserFromFirestoreById(localUser.docId),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const isLoggedIn = user != null && isSuccess;

  if (isLoading) {
    return <div>Loading user data in the Root route</div>;
  }

  return (
    <>
      <TopNav userAuthorized={isLoggedIn} />
      {isLoggedIn ? <Outlet /> : <Login />}
    </>
  );
};

export default Root;
