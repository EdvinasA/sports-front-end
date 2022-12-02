import React from 'react';
import './ExerciseFormComponent.scss';
import {Exercise, ExerciseCategory, UpdateObject} from "../../../models/workout";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

interface ExerciseFormComponentProps {
  exercise: Exercise;
  exerciseUpdate: (object: UpdateObject) => void;
  categories: ExerciseCategory[];
}

const ExerciseFormComponent = (props: ExerciseFormComponentProps) => {
  const [exercise, setExercise] = React.useState(props.exercise);

  const handleExerciseChange = (event) => {
    let updatedValue = event.target.value;

    if (updatedValue === 'true' || updatedValue === 'false') {
      updatedValue = JSON.parse(updatedValue);
    }

    let object: UpdateObject = {name: event.target.name, value: updatedValue}
    setExercise({ ...exercise, [object.name]: object.value })
    props.exerciseUpdate(object);
  }

  return (
      <div className='exercise-edit-wrapper'>
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
                value={exercise.exerciseCategoryId}
                name="exerciseCategoryId"
                label="Categor"
                variant="outlined"
                onChange={handleExerciseChange}
            >
              {props.categories &&
                props.categories.map((category: ExerciseCategory) => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className='exercise-edit-select-field'>
          <FormControl>
            <InputLabel id="exerciseType">Exercise Type</InputLabel>
            <Select
                labelId='exerciseType'
                value={exercise.exerciseType}
                name='exerciseType'
                label='Exercise Typ'
                variant='outlined'
                onChange={handleExerciseChange}
            >
              <MenuItem value={'STRENGTH_WEIGHT_REPS'}>Strength: Weight, Reps</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='exercise-edit-select-field'>
          <FormControl>
            <InputLabel id="isSingleBodyPartExercise">Single Leg/Single Arm</InputLabel>
            <Select
                labelId='isSingleBodyPartExercise'
                value={String(exercise.isSingleBodyPartExercise)}
                name='isSingleBodyPartExercise'
                label='Single Leg/Single A'
                variant='outlined'
                onChange={handleExerciseChange}
            >
              <MenuItem value={'true'}>Yes</MenuItem>
              <MenuItem value={'false'}>No</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
  )
};

export default ExerciseFormComponent;
