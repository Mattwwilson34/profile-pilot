import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material';
import './index.css';
import Root from './routes/Root';
import { FirebaseAuthProvider } from './context/FireBaseAuthContext';
import { appTheme } from './style/app-theme';
import Survery from './routes/Survey';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/survery',
        element: <Survery />,
      },
      {
        path: '/profile/:profileId',
        element: <Profile />,
        loader: async ({ params }) => {
          return await getUserFromFirestoreById(params.profileId as string);
        },
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={appTheme}>
    <QueryClientProvider client={queryClient}>
      <FirebaseAuthProvider>
        <RouterProvider router={router} />
      </FirebaseAuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
