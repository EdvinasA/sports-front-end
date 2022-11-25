import React from 'react';
import './ExerciseFormComponent.scss';
import {Exercise, UpdateObject} from "../../../models/workout";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

interface ExerciseFormComponentProps {
  exercise: Exercise;
  exerciseUpdate: (object: UpdateObject) => void;
}

const ExerciseFormComponent = (props: ExerciseFormComponentProps) => {
  const [exercise, setExercise] = React.useState(props.exercise);

  const handleExerciseChange = (event) => {
    let object: UpdateObject = {name: event.target.name, value: event.target.value}
    setExercise({ ...exercise, [object.name]: object.value })
    props.exerciseUpdate(object);
  }

  return (
      <div>
        <div className='exercise-edit-select-field'>
          <TextField
              value={exercise.name || ''}
              name='name'
              label='Name'
              variant="outlined"
              InputLabelProps={{shrink: true}}
              onChange={handleExerciseChange}>
          </TextField>
        </div>
        <div className='exercise-edit-select-field'>
          <FormControl>
            <InputLabel id="exercise-category">Category</InputLabel>
            <Select
                labelId="exercise-category"
                value={'Chest'}
                name="exerciseCategory"
                label="Categor"
                variant="outlined"
            >
              <MenuItem value={'Chest'}>Chest</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='exercise-edit-select-field'>
          <FormControl>
            <InputLabel id="exerciseType">Exercise Type</InputLabel>
            <Select
                labelId='exerciseType'
                value={'Strength: Weight, Reps'}
                name='exerciseType'
                label='Exercise Typ'
                variant='outlined'
            >
              <MenuItem value={'Strength: Weight, Reps'}>Strength: Weight, Reps</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='exercise-edit-select-field'>
          <FormControl>
            <InputLabel id="isSinglePartExercise">Single Leg/Single Arm</InputLabel>
            <Select
                labelId='isSinglePartExercise'
                value={'No'}
                name='isSinglePartExercise'
                label='Single Leg/Single A'
                variant='outlined'
            >
              <MenuItem value={'No'}>No</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
  )
};

export default ExerciseFormComponent;
