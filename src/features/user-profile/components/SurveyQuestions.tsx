import React from 'react';
import List from '@mui/material/List';
import SurveyQuestion from './SurveyQuestion';
import type { SurveyData } from '../../../types/User';

interface Props {
  surveyData: SurveyData;
}

const SurveyQuestions: React.FC<Props> = ({ surveyData }) => {
  return (
    <React.Fragment>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {Object.keys(surveyData).map((question, i) => {
          const answer: string = surveyData[question];
          return <SurveyQuestion key={i} questionData={{ question, answer }} />;
        })}
      </List>
    </React.Fragment>
  );
};

export default SurveyQuestions;
