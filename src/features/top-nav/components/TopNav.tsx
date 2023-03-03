import * as React from 'react';
import { signOutOfFirebase } from '../../../firebase/firebase-auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useQueryClient } from 'react-query';

interface TopNavProps {
  userAuthorized: boolean | undefined | null;
}

const TopNav = ({ userAuthorized }: TopNavProps): JSX.Element => {
  const queryClient = useQueryClient();

  const handleLogout = (): void => {
    void (async () => {
      signOutOfFirebase();
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    })();
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Profile Pilot
          </Typography>
          {userAuthorized === false ? null : (
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopNav;
