import React from 'react';
import Image from 'mui-image';
import Logo from '../assets/rocketship-logo.svg';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const containerStyles = {
  padding: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
};

const NotFound = (): JSX.Element => {
  return (
    <Box sx={containerStyles}>
      <Typography variant='h3' component='h1'>
        404 Error
      </Typography>
      <Typography variant='h5' component='h2'>
        Sorry the page you are looking for does not exist.
      </Typography>
      <Image src={Logo} width={200} data-testid='logo' />
      <Link to='/'>
        <Typography variant='h5' component='h2'>
          Click here to return the Home Page.
        </Typography>
      </Link>
    </Box>
  );
};

export default NotFound;
