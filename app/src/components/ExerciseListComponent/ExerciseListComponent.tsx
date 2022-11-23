import './ExerciseListComponent.scss';
import React, {useEffect} from "react";
import {getAllExercises} from "../../services/ExerciseService";
import {Exercise} from "../../models/workout";
import {ArrowBack, Add, MoreVert} from "@mui/icons-material";

const ExerciseListComponent = () => {
  const [exercises, setExercises] = React.useState([]);

  useEffect(() => {
    getAllExercises().then(result => {
      setExercises(result);
    })
  }, []);

  return (
      <div className="ExerciseListComponent">
        <div className='exercise-edit-list-header'>
          <div className='exercise-edit-list-column1'>
            <div>
              <ArrowBack/>
            </div>
            <div>
              Edit Exercises
            </div>
          </div>
          <div className='exercise-edit-list-column1'>
            <Add/>
          </div>
        </div>
        <div>
          {exercises &&
              exercises.map((exercise: Exercise) => (
                  <div className='exercise-edit-list-display'>
                    <div>
                      {exercise.name}
                    </div>
                    <div>
                      <MoreVert/>
                    </div>
                  </div>
              ))}
        </div>
      </div>
  )
};

export {ExerciseListComponent};
