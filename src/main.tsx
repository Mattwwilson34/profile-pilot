import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material';
import './index.css';
import Root from './routes/Root';
import { FirebaseAuthProvider } from './context/FireBaseAuthContext';
import { appTheme } from './style/app-theme';
import Survery from './routes/Survey';
import Profile from './routes/Profile';
import { getUserFromFirestoreById } from './firebase/firebase-db';
import NotFound from './error/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/survey',
        element: <Survery />,
      },
      {
        path: '/profile/:profileId',
        element: <Profile />,
        loader: async ({ params }) => {
          const userData = await getUserFromFirestoreById(
            params.profileId as string
          );
          if (userData === null) {
            return redirect('*');
          }
          return userData;
        },
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <FirebaseAuthProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </FirebaseAuthProvider>
);
