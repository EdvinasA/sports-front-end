import React, {FC} from 'react';
import './ExerciseEditComponent.scss';
import {Exercise, UpdateObject} from "../../models/workout";
import {FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import {Add, ArrowBack} from "@mui/icons-material";
import ExerciseFormComponent from "../shared/ExerciseFormComponent/ExerciseFormComponent";

interface ExerciseEditComponentProps {
  exercise: Exercise;
  closeDialog: () => void;
}

const ExerciseEditComponent = (props: ExerciseEditComponentProps) => {
  const [exercise, setExercise] = React.useState(props.exercise);

  const handleExerciseChange = (object: UpdateObject) => {
    setExercise({...exercise, [object.name]: object.value})
  }

  return (
      <div className="exercise-edit-fields">
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
            <IconButton onClick={props.closeDialog}>SAVE</IconButton>
          </div>
        </div>
        <ExerciseFormComponent exerciseUpdate={handleExerciseChange} exercise={exercise} />
      </div>
  )
};

export default ExerciseEditComponent;
