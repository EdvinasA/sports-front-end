import React from 'react';
import './ExerciseCreateComponent.scss';
import {Exercise, UpdateObject} from "../../models/workout";
import ExerciseFormComponent from "../shared/ExerciseFormComponent/ExerciseFormComponent";
import ExerciseFormHeaderComponent from "../shared/ExerciseFormHeaderComponent/ExerciseFormHeaderComponent";

interface ExerciseCreateComponentProps {
  exercise: Exercise;
  closeDialog: () => void;
}

const ExerciseCreateComponent = (props: ExerciseCreateComponentProps) => {
  const [exercise, setExercise] = React.useState(props.exercise);

  const handleExerciseChange = (object: UpdateObject) => {
    setExercise({...exercise, [object.name]: object.value})
  }

  return (
      <div className="exercise-edit-fields">
        <ExerciseFormHeaderComponent closeDialog={props.closeDialog} />
        <ExerciseFormComponent exerciseUpdate={handleExerciseChange} exercise={props.exercise} />
      </div>
  )
};

export default ExerciseCreateComponent;
