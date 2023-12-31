import React, { FC, useMemo, useState } from 'react';
import { Box, Paper, RadioGroup, Stack, Typography } from '@mui/material';
import { SPACES, SPACESNUMBER } from '../../../theme/spaces.const';
import { ITestQuestionComponent } from './test-question.types';
import { WEIGHTS } from '../../../theme/fonts.const';
import { TestOptionComponent } from '../test-option/test-option.component';
import { getFullImgPathOnBackend, getQuestionTypeByText } from '../../functions/question.functions';
import { StoreDataAction } from '../../../passing-test/passing-test.functions';
import { ImageComponent } from '../image/image.component';

export const TestQuestionComponent: FC<ITestQuestionComponent> = ({ question, callback: outCallback }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const callback = (optionId: string, value: boolean) => {
    outCallback(question._id, optionId, value ? StoreDataAction.TO_ADD : StoreDataAction.TO_REMOVE);
  };
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    const optionId = event.target.value;
    outCallback(question._id, optionId, StoreDataAction.SET);
  };
  const questionType = useMemo(
    () => getQuestionTypeByText(question.questionType.text), 
    [question.questionType.text]
  );
  const imageSrc = useMemo(() => {
    if (question.image) return getFullImgPathOnBackend(question.image);
    return null;
  }, [question.image]);
  return (
    <Paper sx={{
      padding: SPACES.m
    }}>
      <Stack spacing={SPACESNUMBER.m}>
        <Typography variant='h4' fontWeight={WEIGHTS.bold}>
          {question.title}
        </Typography>
        {imageSrc && (
          <Box display='flex' justifyContent='center'>
            <ImageComponent src={imageSrc} />
          </Box>
        )}
        <RadioGroup
          name={question._id}
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <Stack spacing={SPACESNUMBER.s}>
            {question.options.length > 0 
              ? question.options.map((option) => (
                <TestOptionComponent 
                  key={option._id} 
                  option={option} 
                  questionType={questionType}
                  callback={callback} 
                />
              ))
              : <Typography variant='h5'>No options</Typography>}
          </Stack>
        </RadioGroup>
        
      </Stack>
    </Paper>
  );
};
