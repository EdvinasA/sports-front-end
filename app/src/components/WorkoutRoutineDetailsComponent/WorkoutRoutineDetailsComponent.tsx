import React, {useEffect} from 'react';
import './WorkoutRoutineDetailsComponent.scss';
import {ArrowBack} from "@mui/icons-material";
import {Dialog, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Slide, TextField} from "@mui/material";
import WorkoutRoutineListDrawer from "../WorkoutRoutineListComponent/WorkoutRoutineListDrawer/WorkoutRoutineListDrawer";
import {useNavigate, useParams} from "react-router-dom";
import {WorkoutRoutine, WorkoutRoutineExercise} from "../../models/Routine";
import {getRoutine, updateRoutine} from "../../services/RoutineService";
import "typeface-roboto"
import WorkoutDetailsAddExerciseComponent from "../WorkoutDetailsComponent/WorkoutDetailsAddExerciseComponent/WorkoutDetailsAddExerciseComponent";
import {Exercise, ExerciseCategory} from "../../models/workout";
import {getExerciseCategories} from "../../services/ExerciseCategoryService";
import {createExercise} from "../../services/ExerciseService";
import produce from "immer";
import {addExerciseToRoutine, deleteRoutineExercise, updateRoutineExercise, updateRoutineExercises} from "../../services/RoutineExerciseService";
import {convertToAddExerciseToRoutineInput} from "../../services/ConverterService";
import WorkoutRoutineExerciseDrawer from "./WorkoutRoutineExerciseDrawer/WorkoutRoutineExerciseDrawer";
import WorkoutRoutineExerciseReorder from "./WorkoutRoutineExerciseReorder/WorkoutRoutineExerciseReorder";
import {TransitionProps} from "@mui/material/transitions";
import WorkoutRoutineExerciseEdit from "./WorkoutRoutineExerciseEdit/WorkoutRoutineExerciseEdit";

interface WorkoutRoutineDetailsComponentProps {
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const WorkoutRoutineDetailsComponent = (props: WorkoutRoutineDetailsComponentProps) => {
  const [reorderOpenDialog, setReorderOpenDialog] = React.useState<boolean>(false);
  const [editableExercise, setEditableExercise] = React.useState<WorkoutRoutineExercise>({
    id: 0,
    numberOfSets: 0,
    notes: "",
    rowNumber: 0,
    exercise: {
      id: 0,
      name: "",
      note: "",
      exerciseCategoryId: 0,
      exerciseType: "",
      isSingleBodyPartExercise: false
    }
  });
  const [routine, setRoutine] = React.useState<WorkoutRoutine>({
    id: 0,
    name: "",
    targets: "",
    notes: "",
    workoutRoutineExercises: []
  });
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [editExerciseDialog, setEditExerciseDialog] = React.useState<boolean>(false);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [exerciseCategories, setExerciseCategories] = React.useState<ExerciseCategory[]>([]);
  let navigation = useNavigate();

  // @ts-ignore
  let {routineId}: string | unknown = useParams();

  const handleNavigation = (route: string) => {
    navigation(route);
  }

  useEffect(() => {
    if (routine.id === 0) {
      getRoutine(routineId)
      .then((response) => {
        setRoutine(response);
        setRoutine({
          ...response, workoutRoutineExercises: response.workoutRoutineExercises
          .sort((a, b) => a.rowNumber > b.rowNumber ? 1 : -1)
        })
      });
    }
  });

  const handleOpenDialog = () => {
    getExerciseCategories()
    .then((response) => {
      setExerciseCategories(response);
      setOpenDialog(true);
    });
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleChange = (event: { target: { name: any, value: any } }) => {
    setRoutine({...routine, [event.target.name]: event.target.value});
  }

  const onBlurUpdate = () => {
    updateRoutine(routine)
    .then();
  }

  const handleCreateExercise = (event: any, exerciseToCreate: Exercise) => {
    createExercise(exerciseToCreate)
    .then((response) => {
      handleAddExercise(event, response);
    });
  }

  const handleAddExercise = (event: any, exerciseToAdd: Exercise) => {
    event.preventDefault();
    addExerciseToRoutine(convertToAddExerciseToRoutineInput(exerciseToAdd, (routine.workoutRoutineExercises.length + 1), routine.id))
    .then((response) => {
          setRoutine(produce(routine, draft => {
            draft.workoutRoutineExercises.push(response)
          }))
          setActiveStep(0);
          setOpenDialog(false);
        }
    );
  }

  const handleDeleteExerciseFromRoutine = (exercise: WorkoutRoutineExercise) => {
    deleteRoutineExercise(exercise.id)
    .then(() =>
        setRoutine(produce(routine, draft => {
          const exercisesIndex: number = draft.workoutRoutineExercises.findIndex(object => object.id === exercise.id);
          draft.workoutRoutineExercises.splice(exercisesIndex, 1)
        }))
    );
  }

  const handleOpenReorderDialog = () => {
    setReorderOpenDialog(true);
    console.log("Reached");
  }

  const handleCloseReorderDialog = () => {
    setReorderOpenDialog(false);
  }

  const handleUpdateExerciseOrder = (result: any) => {
    const newItems = Array.from(routine.workoutRoutineExercises);
    const sourceRow = newItems[result.source.index].rowNumber;
    newItems[result.source.index].rowNumber = newItems[result.destination.index].rowNumber;
    newItems[result.destination.index].rowNumber = sourceRow;
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    updateRoutineExercises(newItems)
    .then(() => {
      setRoutine({...routine, workoutRoutineExercises: newItems});
    })
  }

  const handleOpenEditExerciseDialog = (exercise: WorkoutRoutineExercise) => {
    setEditableExercise(exercise);
    setEditExerciseDialog(true);
  }

  const handleCloseEditExerciseDialog = () => {
    setEditExerciseDialog(false);
  }

  const handleUpdateRoutineExercise = (event: { target: { name: any, value: any } }) => {
    setEditableExercise({...editableExercise, [event.target.name]: event.target.value});
  }

  const handleUpdateDatabaseRoutineExercise = () => {
    updateRoutineExercise(editableExercise)
    .then(() => {
      setRoutine(produce(routine, draft => {
        draft.workoutRoutineExercises[draft.workoutRoutineExercises.findIndex(o => o.id === editableExercise.id)] = editableExercise;
      }))
    })
  }

  return (
      <div>
        <div className='routine-details-header'>
          <div className='routine-details-header-column1'>
            <IconButton onClick={() => handleNavigation("/routines")}><ArrowBack/></IconButton>
            <div className='routine-details-header-column1-title'>{routine.name || ''}</div>
          </div>
          <div className='routine-details-header-column2'>
            <div className='routine-details-header-column2-start'>Start</div>
            <div><WorkoutRoutineListDrawer
                openReorder={handleOpenReorderDialog}
                routine={routine}
                isDetails={true}
                isMain={false}
                children={undefined}></WorkoutRoutineListDrawer></div>
          </div>
        </div>
        <div className='routine-details-main'>
          <div className='routine-details-input'>
            <TextField
                fullWidth
                value={routine.name || ''}
                name='name'
                label='Name'
                variant="outlined"
                onChange={handleChange}
                onBlur={onBlurUpdate}/>
          </div>
          <div className='routine-details-input'>
            <FormControl sx={{minWidth: 335}}>
              <InputLabel id="Targets">Targets</InputLabel>
              <Select
                  fullWidth
                  labelId='Targets'
                  value='Latest'
                  name='targets'
                  label='Targe'
                  variant='outlined'
              >
                <MenuItem value={'Latest'}>Latest</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='routine-details-input'>
            <TextField
                fullWidth
                value={routine.notes || ''}
                name='notes'
                label='Notes'
                variant="outlined"
                onChange={handleChange}
                onBlur={onBlurUpdate}/>
          </div>
        </div>
        <Divider></Divider>
        <div className='routine-details-exercises'>
          <div className='routine-details-exercises-title'>
            Exercises
          </div>
          {routine.workoutRoutineExercises &&
              routine.workoutRoutineExercises.map((exercise: WorkoutRoutineExercise) => (
                  <div className='routine-details-exercise-wrapper'>
                    <div className='routine-details-exercise-column1' key={exercise.id}>
                      <div onClick={() => handleOpenEditExerciseDialog(exercise)}>{exercise.exercise.name}</div>
                      <div>{exercise.numberOfSets === 0 || exercise.numberOfSets === null ? "" : `${exercise.numberOfSets} Sets`}</div>
                    </div>
                    <div className='routine-details-exercise-more'>
                      <WorkoutRoutineExerciseDrawer
                          routineExercise={exercise}
                          openEditDialog={handleOpenEditExerciseDialog}
                          openReorder={handleOpenReorderDialog}
                          deleteRoutineExercise={handleDeleteExerciseFromRoutine}/>
                    </div>
                  </div>
              ))}
        </div>
        <div className='create-routine-wrapper'>
          <div className='routine-add-exercise'>
            <button onClick={handleOpenDialog}>+ Add Exercise</button>
          </div>
        </div>
        <WorkoutDetailsAddExerciseComponent
            openDialog={openDialog}
            handleClose={handleCloseDialog}
            exerciseCategories={exerciseCategories}
            handleAddExercise={handleAddExercise}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            handleCreateExercise={handleCreateExercise}
        ></WorkoutDetailsAddExerciseComponent>
        <Dialog
            fullScreen
            open={reorderOpenDialog}
            onClose={handleCloseReorderDialog}
            TransitionComponent={Transition}
        >
          <WorkoutRoutineExerciseReorder
              reorderDialog={reorderOpenDialog}
              routineExercises={routine.workoutRoutineExercises}
              updateRoutineExercises={handleUpdateExerciseOrder}
              close={handleCloseReorderDialog}/>
        </Dialog>
        <Dialog
            fullScreen
            open={editExerciseDialog}
            onClose={handleCloseEditExerciseDialog}
            TransitionComponent={Transition}
        >
          <WorkoutRoutineExerciseEdit
              deleteExercise={handleDeleteExerciseFromRoutine}
              routineExercise={editableExercise}
              updateRoutineExercise={handleUpdateRoutineExercise}
              updateDatabase={handleUpdateDatabaseRoutineExercise}
              close={handleCloseEditExerciseDialog}/>
        </Dialog>
      </div>
  );
}

export default WorkoutRoutineDetailsComponent;
