import React, { FC } from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { IAssessmentResultComponent } from './assessment-result.types';
import { SPACES, SPACESNUMBER } from '../../../theme/spaces.const';

export const AssessmentResultComponent: FC<IAssessmentResultComponent> = ({ assessment }) => {
  const testTitle = typeof assessment.test !== 'string' ? assessment.test.title : assessment.test;
  const passedBy = typeof assessment.candidate !== 'string' ? assessment.candidate.email : assessment.candidate;
  const passedAt = new Date(assessment.createdAt || '').toLocaleDateString();
  const score = assessment.score.toFixed(2);

  return (
    <Paper sx={{
      padding: SPACES.m
    }}>
      <Stack spacing={SPACESNUMBER.m}>
        <Typography variant='h4'><b>Test: </b>{testTitle}</Typography>
        <Typography variant='h4'><b>Passed by: </b>{passedBy}</Typography>
        <Typography variant='h4'><b>Score: </b>{score}%</Typography>
        <Typography variant='h4'><b>Passed at: </b>{passedAt}</Typography>
      </Stack>
    </Paper>
  );
};
