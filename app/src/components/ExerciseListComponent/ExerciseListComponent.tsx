import './ExerciseListComponent.scss';
import React, {useEffect} from "react";
import {deleteExercise, getAllExercises} from "../../services/ExerciseService";
import {Exercise, ExerciseCategory} from "../../models/workout";
import {ArrowBack, Add} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {Button, Dialog, Divider, IconButton, Slide} from "@mui/material";
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
  const [selectedExercise, setSelectedExercise] = React.useState<Exercise>(
      {
        id: 0,
        name: "",
        note: "",
        exerciseCategoryId: 1,
        exerciseType: "STRENGTH_WEIGHT_REPS",
        isSingleBodyPartExercise: false,
      });
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

  const handleEditDialogOpen = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setEditDialog(false);
  };

  const handleCreateDialogOpen = () => {
    setCreateDialog(true);
  };

  const handleCreateDialogClose = () => {
    setCreateDialog(false);
  };

  const handleUpdateExerciseList = (exercise: Exercise) => {
    setExercises(produce(exercises, exercisesDraft => {
      handleCreateDialogClose();
      exercisesDraft.push(exercise);
    }))
  }

  const handleDeleteExercise = (exerciseId: number) => {
    deleteExercise(exerciseId).then(() => {
      setExercises(produce(exercises, exercisesDraft => {
        exercisesDraft.splice(exercisesDraft.findIndex(exercise => exercise.id === exerciseId), 1)
      }))
    })
  }

  const handleUpdateEditedExercise = (exercise: Exercise) => {
    setExercises(produce(exercises, draft => {
      handleEditDialogClose();
      draft[draft.findIndex(o => o.id === exercise.id)] = exercise;
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
        </div>
        <div className='exercise-list-wrapper'>
          {exercises &&
              exercises.map((exercise: Exercise) => (
                  <div key={exercise.id}>
                    <div className='exercise-edit-list-wrapper'>
                      <div className='exercise-edit-list-display-title' onClick={() => handleEditDialogOpen(exercise)}>
                        {exercise.name}
                      </div>
                      <div className='exercise-edit-list-display-title1'>
                        <ExerciseListDrawerComponent
                            children={undefined}
                            exercise={exercise}
                            openEditDialog={() => handleEditDialogOpen(exercise)}
                            deleteExercise={handleDeleteExercise}
                        />
                      </div>
                    </div>
                    <Divider></Divider>
                  </div>
              ))}
        </div>
        <Dialog
            fullScreen
            open={editDialog}
            onClose={handleEditDialogClose}
            TransitionComponent={Transition}
        >
          <ExerciseEditComponent
              categories={categories}
              exercise={selectedExercise}
              closeDialog={handleEditDialogClose}
              handleUpdateSentExercise={handleUpdateEditedExercise}
          ></ExerciseEditComponent>
        </Dialog>
        <Dialog
            fullScreen
            open={createDialog}
            onClose={handleCreateDialogClose}
            TransitionComponent={Transition}
        >
          <ExerciseCreateComponent
              categories={categories}
              exercise={defaultExercise}
              closeDialog={handleCreateDialogClose}
              updateListOfExercises={handleUpdateExerciseList}/>
        </Dialog>
        <div className='add-exercise-button'>
          <Button variant='outlined'
                  onClick={handleCreateDialogOpen}
          ><Add/> Add Exercise
          </Button>
        </div>
      </div>
  )
};

export default ExerciseListComponent;
