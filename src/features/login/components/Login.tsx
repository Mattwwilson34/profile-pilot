import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { googleAuthSignInWithRedirect } from '../../../firebase/firebase-auth';
import GoogleIcon from '@mui/icons-material/Google';
import Image from 'mui-image';
import Logo from '../../../assets/rocketship-logo.svg';

const appName = 'Profile Pilot';
const slogan = 'Connections made easy.';
const loginButtonTitle = 'Login';

const containerStyles = {
  padding: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
};

const buttonStyles = {
  marginRight: 1,
};

const Login = (): JSX.Element => {
  return (
    <Box sx={containerStyles}>
      <Typography variant='h3' component='h1'>
        {appName}
      </Typography>
      <Typography variant='h5' component='h2'>
        {slogan}
      </Typography>
      <Image src={Logo} data-testid='logo' />
      <Button variant='contained' onClick={googleAuthSignInWithRedirect}>
        <GoogleIcon sx={buttonStyles} />
        {loginButtonTitle}
      </Button>
    </Box>
  );
};

export default Login;
