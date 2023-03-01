import { Box, Typography } from '@mui/material';
import React from 'react';
import SurveryForm from '../features/survey-form';

const containerStyles = {
  padding: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

const welcome = `Welcome to Profile Pilot!`;
const description = `To help you connect with like-minded individuals, please answer 5 quick questions about yourself.`;

const Survery = (): JSX.Element => {
  return (
    <>
      <Box sx={containerStyles}>
        <Typography variant='h5' component='h1'>
          {welcome}
        </Typography>
        <Typography variant='body1'>{description}</Typography>
      </Box>
      <SurveryForm />
    </>
  );
};

export default Survery;
