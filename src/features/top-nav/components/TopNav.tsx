import * as React from 'react';
import type firebase from 'firebase/auth';
import { signOutOfFirebase } from '../../../firebase/firebase-auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface TopNavProps {
  user: firebase.User | null | undefined;
}

const TopNav = ({ user }: TopNavProps): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Profile Pilot
          </Typography>
          {user == null ? null : (
            <Button color='inherit' onClick={signOutOfFirebase}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopNav;
