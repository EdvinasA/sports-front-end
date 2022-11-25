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
      <div className='exercise-edit-list-header'>
        <div className='exercise-edit-list-column1'>
          <div className='exercise-edit-list-column1-field1'>
            <IconButton onClick={props.closeDialog}>
              <ArrowBack/>
            </IconButton>
          </div>
          <div className='exercise-edit-column1-field2'>
            Edit Exercises
          </div>
        </div>
        <div className='exercise-edit-column1-field3'>
          <IconButton onClick={props.saveExercise}>SAVE</IconButton>
        </div>
      </div>
  )
};

export default ExerciseFormHeaderComponent;
