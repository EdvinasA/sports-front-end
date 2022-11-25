import './ExerciseListComponent.scss';
import React, {useEffect} from "react";
import {getAllExercises} from "../../services/ExerciseService";
import {Exercise} from "../../models/workout";
import {ArrowBack, Add, MoreVert} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {Dialog, IconButton, Slide} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import ExerciseEditComponent from "../ExerciseEditComponent/ExerciseEditComponent";
import ExerciseCreateComponent from "../ExerciseCreateComponent/ExerciseCreateComponent";

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
  const [defaultExercise] = React.useState(
      {
        id: 0,
        name: "",
        note: "",
        exerciseCategory: 1,
        exerciseType: "Strength: Weight, Reps",
        isSingleBodyPartExercise: false,

      }
  );
  const [editDialog, setEditDialog] = React.useState(false);
  const [createDialog, setCreateDialog] = React.useState(false);

  const handleEditDialog = () => {
    setEditDialog(!editDialog);
  };

  const handleCreateDialog = () => {
    setCreateDialog(!createDialog);
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
          <IconButton className='exercise-edit-list-column2' onClick={handleCreateDialog}>
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
                        open={editDialog}
                        onClose={handleEditDialog}
                        TransitionComponent={Transition}
                    >
                      <ExerciseEditComponent
                          exercise={exercise}
                          closeDialog={handleEditDialog}></ExerciseEditComponent>
                    </Dialog>
                  </div>
              ))}
        </div>
        <Dialog
            fullScreen
            open={createDialog}
            onClose={handleCreateDialog}
            TransitionComponent={Transition}
        >
          <ExerciseCreateComponent
              exercise={defaultExercise}
              closeDialog={handleCreateDialog}></ExerciseCreateComponent>
        </Dialog>
      </div>
  )
};

export {ExerciseListComponent};
