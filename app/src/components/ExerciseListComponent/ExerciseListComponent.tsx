import './ExerciseListComponent.scss';
import React, {useEffect} from "react";
import {getAllExercises} from "../../services/ExerciseService";
import {Exercise, WorkoutExercise} from "../../models/workout";

const ExerciseListComponent = () => {
  const [exercises, setExercises] = React.useState([]);

  useEffect(() => {
    getAllExercises().then(result => {
      setExercises(result);
    })
  }, []);

  return (
      <div className="ExerciseListComponent">
        <div>
          {exercises &&
              exercises.map((exercise: Exercise) => (
                  <div>{exercise.name}</div>
              ))}
        </div>
      </div>
  )
};

export { ExerciseListComponent };
