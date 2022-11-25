import React from 'react';
import './ExerciseEditComponent.scss';
import {Exercise, UpdateObject} from "../../models/workout";
import ExerciseFormComponent from "../shared/ExerciseFormComponent/ExerciseFormComponent";
import ExerciseFormHeaderComponent from "../shared/ExerciseFormHeaderComponent/ExerciseFormHeaderComponent";

interface ExerciseEditComponentProps {
  exercise: Exercise;
  closeDialog: () => void;
}

const ExerciseEditComponent = (props: ExerciseEditComponentProps) => {
  const [exercise, setExercise] = React.useState(props.exercise);

  const handleExerciseChange = (object: UpdateObject) => {
    setExercise({...exercise, [object.name]: object.value})
  }

  const handleSaveExercise = () => {

  }

  return (
      <div className="exercise-edit-fields">
        <ExerciseFormHeaderComponent closeDialog={props.closeDialog} saveExercise={handleSaveExercise}/>
        <ExerciseFormComponent exerciseUpdate={handleExerciseChange} exercise={exercise} />
      </div>
  )
};

export default ExerciseEditComponent;
