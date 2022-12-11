import React, {useEffect} from 'react';
import './WorkoutRoutineDetailsComponent.scss';
import {ArrowBack, MoreVert} from "@mui/icons-material";
import {Divider, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import WorkoutRoutineListDrawer from "../WorkoutRoutineListComponent/WorkoutRoutineListDrawer/WorkoutRoutineListDrawer";
import {useNavigate, useParams} from "react-router-dom";
import {WorkoutRoutine, WorkoutRoutineExercise} from "../../models/Routine";
import {getRoutine, updateRoutine} from "../../services/RoutineService";
import "typeface-roboto"
import WorkoutDetailsAddExerciseComponent from "../WorkoutDetailsComponent/WorkoutDetailsAddExerciseComponent/WorkoutDetailsAddExerciseComponent";
import {Exercise, ExerciseCategory} from "../../models/workout";
import {getExerciseCategories} from "../../services/ExerciseCategoryService";
import {addExercise, createExercise} from "../../services/ExerciseService";
import produce from "immer";
import {addExerciseToRoutine} from "../../services/RoutineExerciseService";
import {convertToAddExerciseToRoutineInput} from "../../services/ConverterService";

interface WorkoutRoutineDetailsComponentProps {
}

const WorkoutRoutineDetailsComponent = (props: WorkoutRoutineDetailsComponentProps) => {
  const [routine, setRoutine] = React.useState<WorkoutRoutine>({
    id: 0,
    name: "",
    targets: "",
    notes: "",
    workoutRoutineExercises: []
  });
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
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

  return (
      <div>
        <div className='routine-details-header'>
          <div className='routine-details-header-column1'>
            <IconButton onClick={() => handleNavigation("/routines")}><ArrowBack/></IconButton>
            <div className='routine-details-header-column1-title'>{routine.name || ''}</div>
          </div>
          <div className='routine-details-header-column2'>
            <div className='routine-details-header-column2-start'>Start</div>
            <div><WorkoutRoutineListDrawer routine={routine} isDetails={true} isMain={false} children={undefined}></WorkoutRoutineListDrawer></div>
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
                      <div>{exercise.exercise.name}</div>
                      <div>{exercise.numberOfSets === 0 || exercise.numberOfSets === null ? "" : `${exercise.numberOfSets} Sets`}</div>
                    </div>
                    <div className='routine-details-exercise-more'><MoreVert/></div>
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
      </div>
  );
}

export default WorkoutRoutineDetailsComponent;
