import React from 'react';
import './WorkoutRoutineExerciseEdit.scss';
import {IconButton, TextField} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {WorkoutRoutineExercise} from "../../../models/Routine";

interface WorkoutRoutineExerciseEditProps {
  routineExercise: WorkoutRoutineExercise;
  updateRoutineExercise: (event: { target: { name: any, value: any } }) => void;
  updateDatabase: () => void;
  close: () => void;
  deleteExercise: (exercise: WorkoutRoutineExercise) => void;
}

const WorkoutRoutineExerciseEdit = (props: WorkoutRoutineExerciseEditProps) => {

  const handleCloseAndSave = () => {
    props.close();
    props.updateDatabase();
  }

  const handleCloseAndDelete = () => {
    props.close();
    props.deleteExercise(props.routineExercise)
  }

  return (
      <div>
        <div className='routine-exercise-details-header'>
          <div className='routine-exercise-details-header-column1'>
            <IconButton onClick={handleCloseAndSave}><ArrowBack/></IconButton>
            <div className='routine-exercise-details-header-column1-title'>{props.routineExercise.exercise.name || ''}</div>
          </div>
        </div>
        <div className='routine-exercise-details-wrapper'>
          <div className='routine-exercise-details-input'>
            <TextField
                fullWidth
                value={props.routineExercise.numberOfSets || ''}
                name='numberOfSets'
                label='Sets'
                variant="outlined"
                onChange={props.updateRoutineExercise}
                onBlur={props.updateDatabase}/>
          </div>
          <div className='routine-exercise-details-input'>
            <TextField
                fullWidth
                value={props.routineExercise.notes || ''}
                name='notes'
                label='Notes'
                variant="outlined"
                onChange={props.updateRoutineExercise}
                onBlur={props.updateDatabase}/>
          </div>
          <div className='routine-exercise-details-input delete-button'>
            <button onClick={handleCloseAndDelete}>Delete</button>
          </div>
        </div>
      </div>
  );
}

export default WorkoutRoutineExerciseEdit;
