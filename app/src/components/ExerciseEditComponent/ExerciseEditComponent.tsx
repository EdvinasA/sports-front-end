import React, {FC} from 'react';
import './ExerciseEditComponent.scss';
import {Exercise} from "../../models/workout";

interface ExerciseEditComponentProps {
  exercise: Exercise;
}

const ExerciseEditComponent = (props: ExerciseEditComponentProps) => {

  return (
      <div className="ExerciseEditComponent">
        ExerciseEditComponent Component
      </div>
  )
};

export default ExerciseEditComponent;
