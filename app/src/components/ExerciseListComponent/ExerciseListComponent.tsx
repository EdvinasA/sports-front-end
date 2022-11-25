import './ExerciseListComponent.scss';
import React, {useEffect} from "react";
import {getAllExercises} from "../../services/ExerciseService";
import {Exercise, ExerciseCategory} from "../../models/workout";
import {ArrowBack, Add} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {Dialog, IconButton, Slide} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import ExerciseEditComponent from "../ExerciseEditComponent/ExerciseEditComponent";
import ExerciseCreateComponent from "../ExerciseCreateComponent/ExerciseCreateComponent";
import {getExerciseCategories} from "../../services/ExerciseCategoryService";
import produce from "immer";
import ExerciseListDrawerComponent from "../ExerciseListDrawerComponent/ExerciseListDrawerComponent";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExerciseListComponent = () => {
  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  const [categories, setCategories] = React.useState<ExerciseCategory[]>([]);
  const [defaultExercise] = React.useState(
      {
        id: 0,
        name: "",
        note: "",
        exerciseCategoryId: 1,
        exerciseType: "STRENGTH_WEIGHT_REPS",
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

  const handleUpdateExerciseList = (exercise: Exercise) => {
    setExercises(produce(exercises, exercisesDraft => {
      handleCreateDialog();
      exercisesDraft.push(exercise);
    }))
  }

  useEffect(() => {
    getAllExercises().then(result => {
      setExercises(result);
    })
    getExerciseCategories().then(result => {
      setCategories(result);
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
                    <div className='exercise-edit-list-display-title' onClick={handleEditDialog}>
                      {exercise.name}
                    </div>
                    <div className='exercise-edit-list-display-title1'>
                      <ExerciseListDrawerComponent
                          children={undefined}
                          exercise={exercise}
                      />
                    </div>
                    <Dialog
                        fullScreen
                        open={editDialog}
                        onClose={handleEditDialog}
                        TransitionComponent={Transition}
                    >
                      <ExerciseEditComponent
                          categories={categories}
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
              categories={categories}
              exercise={defaultExercise}
              closeDialog={handleCreateDialog}
              updateListOfExercises={handleUpdateExerciseList}/>
        </Dialog>
      </div>
  )
};

export {ExerciseListComponent};
