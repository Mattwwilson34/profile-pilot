import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

interface Props {
  questionData: {
    question: string;
    answer: string;
  };
}

const SurveyQuestion: React.FC<Props> = ({ questionData }) => {
  const { question, answer } = questionData;
  return (
    <React.Fragment>
      <ListItem alignItems='flex-start'>
        <ListItemText
          primary={question}
          secondary={<React.Fragment>{answer}</React.Fragment>}
        />
      </ListItem>
    </React.Fragment>
  );
};

export default SurveyQuestion;
