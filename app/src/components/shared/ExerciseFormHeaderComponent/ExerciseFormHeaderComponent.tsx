import React from 'react';
import './ExerciseFormHeaderComponent.scss';
import {IconButton} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

interface ExerciseFormHeaderComponentProps {
  closeDialog: () => void;
  saveExercise: () => void;
}

const ExerciseFormHeaderComponent = (props: ExerciseFormHeaderComponentProps) => {

  return (
      <div className='form-header'>
        <div className='form-header-column1'>
          <div className='form-header-column1-field1'>
            <IconButton
                onClick={props.closeDialog}
                onTouchEnd={props.closeDialog}>
              <ArrowBack/>
            </IconButton>
          </div>
          <div className='form-header-column1-field2'>
            Edit Exercises
          </div>
        </div>
        <div className='form-header-column1-field3'>
          <IconButton
              onClick={props.saveExercise}
              onTouchEnd={props.closeDialog}>
            SAVE
          </IconButton>
        </div>
      </div>
  )
};

export default ExerciseFormHeaderComponent;
