import React from 'react';
import './ExerciseCreateComponent.scss';
import {Exercise, ExerciseCategory, UpdateObject} from "../../models/workout";
import ExerciseFormComponent from "../shared/ExerciseFormComponent/ExerciseFormComponent";
import ExerciseFormHeaderComponent from "../shared/ExerciseFormHeaderComponent/ExerciseFormHeaderComponent";
import {createExercise} from "../../services/ExerciseService";
import {convertToExerciseCreateInput} from "../../services/ConverterService";

interface ExerciseCreateComponentProps {
  exercise: Exercise;
  closeDialog: () => void;
  categories: ExerciseCategory[];
  updateListOfExercises: (exercise: Exercise) => void;
}

const ExerciseCreateComponent = (props: ExerciseCreateComponentProps) => {
  const [exercise, setExercise] = React.useState<Exercise>(props.exercise);

  const handleExerciseChange = (object: UpdateObject) => {
    setExercise({...exercise, [object.name]: object.value})
  }

  const handleSaveExercise = () => {
    createExercise(convertToExerciseCreateInput(exercise)).then(result => {
      props.updateListOfExercises(result);
    })
  }

  return (
      <div className="exercise-edit-fields">
        <ExerciseFormHeaderComponent closeDialog={props.closeDialog} saveExercise={handleSaveExercise}/>
        <ExerciseFormComponent categories={props.categories} exerciseUpdate={handleExerciseChange} exercise={props.exercise} />
      </div>
  )
};

export default ExerciseCreateComponent;
