import './ExerciseListComponent.scss';
import React, {useEffect} from "react";
import {getAllExercises} from "../../services/ExerciseService";
import {Exercise} from "../../models/workout";
import {ArrowBack, Add, MoreVert} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {Dialog, IconButton, Slide} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import ExerciseEditComponent from "../ExerciseEditComponent/ExerciseEditComponent";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExerciseListComponent = () => {
  const [exercises, setExercises] = React.useState([]);
  const [dialog, setDialog] = React.useState(false);

  const handleDialog = () => {
    setDialog(!dialog);
  };

  useEffect(() => {
    getAllExercises().then(result => {
      setExercises(result);
    })
  }, []);

  return (
      <div className="ExerciseListComponent">
        <div className='exercise-edit-list-header'>
          <div className='exercise-edit-list-column1'>
            <div className='exercise-edit-list-column1-field1'>
              <Link to='/'>
                <ArrowBack/>
              </Link>
            </div>
            <div className='exercise-edit-list-column1-field2'>
              Edit Exercises
            </div>
          </div>
          <IconButton className='exercise-edit-list-column2' onClick={handleDialog}>
            <Add/>
          </IconButton>
        </div>
        <div>
          {exercises &&
              exercises.map((exercise: Exercise) => (
                  <div className='exercise-edit-list-display' key={exercise.id}>
                    <div className='exercise-edit-list-display-title'>
                      {exercise.name}
                    </div>
                    <div className='exercise-edit-list-display-title1'>
                      <MoreVert/>
                    </div>
                    <Dialog
                        fullScreen
                        open={dialog}
                        onClose={handleDialog}
                        TransitionComponent={Transition}
                    >
                      <ExerciseEditComponent
                          exercise={exercise}
                          closeDialog={handleDialog}></ExerciseEditComponent>
                    </Dialog>
                  </div>
              ))}
        </div>
      </div>
  )
};

export {ExerciseListComponent};
