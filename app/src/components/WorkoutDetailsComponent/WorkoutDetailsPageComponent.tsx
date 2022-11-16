import React, {useEffect} from 'react';
import {Exercise, ExerciseBodyPart, ExerciseSet, WorkoutDetails, WorkoutExercise} from '../../models/workout';
import {Divider, IconButton, Slide, SwipeableDrawer, TextField, Dialog, Button, Stepper, Step, MobileStepper} from '@mui/material';
import './WorkoutDetailsPageComponent.scss';
import {useParams} from "react-router-dom";
import {getMonth} from "../../services/formatter-service";
import {Search, Star, BarChart, History, Timer, ArrowBack, MoreVert, AddCircleOutline} from '@mui/icons-material';
import {LocalizationProvider, MobileDatePicker, TimePicker} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import produce from "immer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import defaultExerciseSetCreate from "../../shared/DefaultObjects";
import {TransitionProps} from "@mui/material/transitions";
import exerciseBodyPartsList from "../../shared/static/ExerciseBodyPartList";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function WorkoutDetailsPage() {
  type Anchor = 'top' | 'left' | 'bottom' | 'right';
  const [openDialog, setOpenDialog] = React.useState(false);
  const [exercisesOfBody, setExercises] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [workout, setWorkout] = React.useState<WorkoutDetails>({
    notes: "",
    bodyWeight: 0,
    date: "",
    endTime: "",
    exercises: [],
    id: 0,
    name: "",
    startTime: ""
  });
  const listOfExerciseBodyParts: ExerciseBodyPart[] = exerciseBodyPartsList();

  // @ts-ignore
  let {workoutId}: string | unknown = useParams();

  useEffect(() => {
    if (workout.id === 0) {
      getWorkout();
    }
  });

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const getWorkout = () => {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    };
    fetch(`https://localhost:7173/api/workout/1/${workoutId}`, requestOptions)
    .then((response) => response.json())
    .then((response) =>
        setWorkout(response)
    )
    .catch((error) =>
        console.log(error)
    );
  }

  const getTime = (time: string) => {
    return new Date(time);
  }

  const handleWorkoutChange = (event: { target: { name?: any, value?: any }; }) => {
    const {name, value} = event.target;
    setWorkout({...workout, [name]: value} as unknown as WorkoutDetails);
  }

  const handleExerciseSetChange = (event: { target: { name?: any, value?: any }; }, exercise: WorkoutExercise, set: ExerciseSet) => {
    const {name, value} = event.target;
    setWorkout(produce(workout, workoutDraft => {
      const exercisesIndex: number = workoutDraft.exercises.findIndex(object => object.id === exercise.id);
      const exerciseSetsIndex: number = workoutDraft.exercises[exercisesIndex].exerciseSets.findIndex(object => object.id === set.id);
      const updatedExerciseSet = {...workoutDraft.exercises[exercisesIndex].exerciseSets[exerciseSetsIndex], [name]: value}
      workoutDraft.exercises[exercisesIndex].exerciseSets[exerciseSetsIndex] =
          {
            id: set.id, weight: updatedExerciseSet.weight, reps: updatedExerciseSet.reps, exerciseType: updatedExerciseSet.exerciseType,
            notes: updatedExerciseSet.notes
          }
    }));
  }

  const handleAddSet = (workoutExerciseId: number, exerciseId: number, event) => {
    event.preventDefault();
    const exerciseSetCreate = defaultExerciseSetCreate(exerciseId, workoutExerciseId);
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(exerciseSetCreate)
    };
    fetch("https://localhost:7173/api/exercise-set/1", requestOptions)
    .then(response => response.json())
    .then((response) =>
        setWorkout(produce(workout, workoutDraft => {
          const exercisesIndex: number = workoutDraft.exercises.findIndex(object => object.id === exerciseId);
          workoutDraft.exercises[exercisesIndex].exerciseSets.push(response)
        }))
    )
    .catch((error) =>
        console.log(error)
    );
  }

  const handleDeleteSet = (exerciseId: number, setId: number) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    };
    fetch(`https://localhost:7173/api/exercise-set/1/${setId}`, requestOptions)
    .then(() =>
        setWorkout(produce(workout, workoutDraft => {
          const exercisesIndex: number = workoutDraft.exercises.findIndex(object => object.id === exerciseId);
          const exercisesSetIndex: number = workoutDraft.exercises.findIndex(object => object.id === setId);
          workoutDraft.exercises[exercisesIndex].exerciseSets.splice(exercisesSetIndex, 1)
        }))
    )
    .catch((error) =>
        console.log(error)
    );
  }

  const list = (anchor: Anchor, exerciseId: number, setId: number) => (
      <Box
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItemButton onClick={() => handleDeleteSet(exerciseId, setId)}>Delete</ListItemButton>
        </List>
      </Box>
  );

  const toggleDrawer =
      (anchor: Anchor, open: boolean) =>
          (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
              return;
            }

            setState({...state, [anchor]: open});
          };

  const handleAddExercise = () => {

  };

  const handleGetExercisesByBodyType = (event: any, input: ExerciseBodyPart) => {
    event.preventDefault();
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    fetch(`https://localhost:7173/api/exercise/1/body-part/${input.value}`, requestOptions)
    .then(response => response.json())
    .then((response) => {
          setExercises(response);
          setActiveStep(1);
        }
    )
    .catch((error) =>
        console.log(error)
    );
  };

  return (
      <div>
        <div className='workout-details-display'>
          <div className='dialog-workout-header'>
            <div className='dialog-workout-header-grid'>
              <div className='dialog-workout-back-action'>
                <IconButton>
                  <ArrowBack/>
                </IconButton>
              </div>
              <div>
                {getMonth(workout.date)}
                5
              </div>
              <div className='dialog-workout-info'>
                <div>
                  <IconButton>
                    <Timer/>
                  </IconButton>
                </div>
                <div>
                  <div className='workout-header-menu'>
                    <MoreVert/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='inputs-first-row'>
            <div className='workout-name-input'>
              <TextField
                  value={workout.name || ''}
                  name='name'
                  label='Name'
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                  onChange={handleWorkoutChange}/>
            </div>
            <div className='workout-weight-input'>
              <TextField
                  value={workout.bodyWeight || ''}
                  name='bodyWeight'
                  label='BW'
                  variant="outlined"
                  InputLabelProps={{shrink: true}}
                  onChange={handleWorkoutChange}/>
            </div>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <div className='workout-time-pickers'>
                <div className='workout-picker padding-for-picker date'>
                  <MobileDatePicker
                      label="Date"
                      inputFormat="YYYY-MM-DD"
                      value={getTime(workout.date || '')}
                      onChange={() => console.log("hello")}
                      renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className='workout-picker padding-for-picker'>
                  <TimePicker
                      ampm={false}
                      value={getTime(workout.startTime || '')}
                      label='Start Time'
                      onChange={() => console.log("hello")}
                      renderInput={(params) => <TextField {...params} />}/>
                </div>
                <div className='workout-picker furthest-padding'>
                  <TimePicker
                      ampm={false}
                      value={getTime(workout.endTime || '')}
                      label='End Time'
                      onChange={() => console.log("hello")}
                      renderInput={(params) => <TextField {...params} />}/>
                </div>
              </div>
            </LocalizationProvider>
          </div>
          <div className='workout-notes'>
            <TextField
                value={workout.notes || ''}
                name='notes'
                label='Notes'
                variant="outlined"
                InputLabelProps={{shrink: true}}
                onChange={handleWorkoutChange}/>
          </div>
          <Divider/>
          <div>
            {workout.exercises &&
                workout.exercises.map((workout: WorkoutExercise) => (
                    <div key={workout.id}>
                      <div className='exercise'>
                        <div className='exercise-title'>{workout.exercise.name || ''}</div>
                        <div className='exercise-menu'>
                          <div className="exercise-menu-options">
                            <MoreVert/>
                          </div>
                        </div>
                      </div>
                      {workout.exerciseSets &&
                          workout.exerciseSets.map((set: ExerciseSet, index: number) => (
                              <div className='sets' key={set.id}>
                                <div>
                                  <div className='set-number'>{(index + 1)}</div>
                                </div>
                                <div className='workout-weight-input'>
                                  <TextField value={set.weight} name="weight" label="Weight" variant="outlined"
                                             onChange={(event) => handleExerciseSetChange(event, workout, set)}/>
                                </div>
                                <div className='workout-weight-input'>
                                  <TextField value={set.reps} name="reps" label="Reps" variant="outlined"
                                             onChange={(event) => handleExerciseSetChange(event, workout, set)}/>
                                </div>
                                <div className='workout-weight-input'>
                                  <TextField value={set.notes} name="notes" label="Notes" variant="outlined"
                                             onChange={(event) => handleExerciseSetChange(event, workout, set)}/>
                                </div>
                                <div className='set-menu-icon'>
                                  <React.Fragment key={'bottom'}>
                                    <div className='menu-button' onClick={toggleDrawer('bottom', true)}><MoreVert/></div>
                                    <SwipeableDrawer
                                        anchor={'bottom'}
                                        open={state['bottom']}
                                        onClose={toggleDrawer('bottom', false)}
                                        onOpen={toggleDrawer('bottom', true)}
                                    >
                                      {list('bottom', workout.exercise.id, set.id)}
                                    </SwipeableDrawer>
                                  </React.Fragment>
                                </div>
                              </div>
                          ))}
                      <div className='actions'>
                        <div className='action-add-set'>
                          <button onClick={(event) => handleAddSet(workout.id, workout.exercise.id, event)}>ADD SET</button>
                        </div>
                        <div>
                          <IconButton>
                            <History/>
                          </IconButton>
                        </div>
                        <div>
                          <IconButton>
                            <BarChart/>
                          </IconButton>
                        </div>
                        <div>
                          <IconButton>
                            <Star/>
                          </IconButton>
                        </div>
                      </div>
                      <Divider/>
                    </div>
                ))}
            <div className='add-exercise-action'>
              <button onClick={handleClickOpen}>+ ADD EXERCISE</button>
            </div>
            <Dialog
                fullScreen
                open={openDialog}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
              <div className='exercise-add-wrapper'>
                <div className='exercise-add-header'>
                  <div className='exercise-back-and-title'>
                    <div>
                      <ArrowBack onClick={handleClose}/>
                    </div>
                    <div>Select Exercise</div>
                  </div>
                  <div className='exercise-search-and-add'>
                    <div><Search/></div>
                    <div><AddCircleOutline/></div>
                  </div>
                </div>
                <div>
                  <MobileStepper activeStep={activeStep} backButton={<div></div>} nextButton={<div></div>} steps={3}/>
                  {activeStep === 0 &&
                    <div>
                      {listOfExerciseBodyParts &&
                          listOfExerciseBodyParts.map((bodyPart: ExerciseBodyPart) => (
                              <div key={bodyPart.value} className='body-part'>
                                <div>
                                  <Button size="large" onClick={(event) => handleGetExercisesByBodyType(event, bodyPart)}>{bodyPart.displayValue}</Button>
                                </div>
                              </div>
                          ))}
                    </div>
                  }
                  {activeStep === 1 &&
                      <div>
                        {exercisesOfBody &&
                            exercisesOfBody.map((exercise: Exercise) => (
                              <div key={exercise.id}>{exercise.name}</div>
                            ))}
                      </div>
                  }
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
  )
}

export default WorkoutDetailsPage;
