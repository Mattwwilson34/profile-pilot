import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SurveyQuestions from './SurveyQuestions';
import { type User } from '../../../types/User';

interface Props {
  userData: User;
}

const UserProfile: React.FC<Props> = ({ userData }) => {
  const { photoURL, displayName, surveyData } = userData;

  return (
    <Grid container direction='column' alignItems='center'>
      <Avatar
        src={photoURL ?? undefined}
        alt={displayName ?? undefined}
        sx={{ width: 100, height: 100 }}
      />
      <Typography variant='h5'>{userData.displayName}</Typography>
      {surveyData != null && <SurveyQuestions surveyData={surveyData} />}
    </Grid>
  );
};

export default UserProfile;
