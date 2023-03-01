import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { updateUserSurveyQuestions } from '../../../firebase/firebase-db';
import { useNavigate } from 'react-router-dom';

const formContainerStyles = {
  padding: 1,
};

const SurveryForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    interests: '',
    skills: '',
    hobbies: '',
    connections: '',
    goals: '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void (async () => {
      await updateUserSurveyQuestions(formState);
      navigate('/');
    })();
  };

  const isFormValid = Object.values(formState).every((value) => Boolean(value));

  return (
    <Box sx={formContainerStyles}>
      <form onSubmit={handleSubmit} aria-label='form' role='form'>
        <TextField
          label='What interests you?'
          variant='outlined'
          required
          name='interests'
          value={formState.interests}
          onChange={handleInputChange}
        />
        <TextField
          label='What skills do you have?'
          variant='outlined'
          required
          name='skills'
          value={formState.skills}
          onChange={handleInputChange}
        />
        <TextField
          label='What are your hobbies?'
          variant='outlined'
          required
          name='hobbies'
          value={formState.hobbies}
          onChange={handleInputChange}
        />
        <TextField
          label='Who do you want to connect with?'
          variant='outlined'
          required
          name='connections'
          value={formState.connections}
          onChange={handleInputChange}
        />
        <TextField
          label='What are your goals?'
          variant='outlined'
          required
          name='goals'
          value={formState.goals}
          onChange={handleInputChange}
        />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default SurveryForm;
