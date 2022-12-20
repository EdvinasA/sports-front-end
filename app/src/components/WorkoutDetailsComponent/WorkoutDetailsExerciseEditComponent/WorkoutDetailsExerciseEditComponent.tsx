import React from 'react';
import './WorkoutDetailsExerciseEditComponent.scss';
import ExerciseEditComponent from "../../ExerciseEditComponent/ExerciseEditComponent";
import {Exercise, ExerciseCategory} from "../../../models/workout";

interface WorkoutDetailsExerciseEditComponentProps {
  categories: ExerciseCategory[];
  closeDialog: () => void;
  exercise: Exercise;
  handleUpdateSentExercise: (exercise: Exercise) => void;
}

const WorkoutDetailsExerciseEditComponent = (props: WorkoutDetailsExerciseEditComponentProps) => {
  return (
      <ExerciseEditComponent
          categories={props.categories}
          closeDialog={props.closeDialog}
          exercise={props.exercise}
          handleUpdateSentExercise={props.handleUpdateSentExercise}/>
  );
}

export default WorkoutDetailsExerciseEditComponent;
