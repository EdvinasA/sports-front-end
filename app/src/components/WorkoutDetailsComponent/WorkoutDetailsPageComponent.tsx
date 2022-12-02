import React, {useEffect} from 'react';
import dayjs from 'dayjs';
import {Exercise, ExerciseCategory, ExerciseSet, WorkoutDetails, WorkoutExercise} from '../../models/workout';
import {Divider, IconButton, Slide, TextField, Dialog, Button} from '@mui/material';
import './WorkoutDetailsPageComponent.scss';
import {Link, useParams} from "react-router-dom";
import {getDayOfTheMonth, getMonth} from "../../services/FormatterService";
import {Search, Star, BarChart, History, Timer, ArrowBack, AddCircleOutline} from '@mui/icons-material';
import {LocalizationProvider, MobileDatePicker, TimePicker} from "@mui/x-date-pickers";
import produce from "immer";
import defaultExerciseSetCreate from "../../shared/DefaultObjects";
import {TransitionProps} from "@mui/material/transitions";
import {addExerciseSet, deleteExerciseSet, updateExerciseSetRequest} from "../../services/ExerciseSetService";
import {addExercise, getExercisesByCategory} from "../../services/ExerciseService";
import {ExerciseSetsDrawerComponent} from '../ExerciseSetsDrawerComponent/ExerciseSetsDrawerComponent';
import {ExerciseDrawerComponent} from "../ExerciseDrawerComponent/ExerciseDrawerComponent";
import {WorkoutDrawerComponent} from "../WorkoutDrawerComponent/WorkoutDrawerComponent";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {convertToWorkoutDetails} from "../../services/ConverterService";
import {deleteWorkoutExercise, getWorkoutById, updateWorkout} from "../../services/WorkoutService";
import {getExerciseCategories} from "../../services/ExerciseCategoryService";
import WorkoutExerciseReorder from "../WorkoutExerciseReorder/WorkoutExerciseReorder";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function WorkoutDetailsPage() {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [reorderOpenDialog, setReorderOpenDialog] = React.useState<boolean>(false);
  const [exerciseCategories, setExerciseCategories] = React.useState<ExerciseCategory[]>([]);
  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [workout, setWorkout] = React.useState<WorkoutDetails>({
    notes: "",
    bodyWeight: 0,
    date: new Date(),
    endTime: new Date(),
    exercises: [],
    id: 0,
    name: "",
    startTime: new Date()
  });
  const [workoutExercises, setWorkoutExercises] = React.useState<WorkoutExercise[]>([]);

  // @ts-ignore
  let {workoutId}: string | unknown = useParams();

  useEffect(() => {
    if (workout.id === 0) {
      getWorkout();
    }
  });

  const handleClickOpen = () => {
    getExerciseCategories()
    .then((response) => {
      setExerciseCategories(response);
      setOpenDialog(true);
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const getWorkout = () => {
    getWorkoutById(workoutId)
    .then((response) => {
      setWorkout(response);
      setWorkoutExercises(response.exercises);
    })
    .catch((error) =>
        console.log(error)
    );
  }

  const getTime = (time: Date | string) => {
    if (time === null) {
      return null;
    }
    return new Date(time);
  }

  const handleWorkoutChange = (event: { target: { name?: any, value?: any }; }) => {
    const {name, value} = event.target;
    setWorkout({...workout, [name]: value} as unknown as WorkoutDetails);
  }

  const onBlurPutRequestWorkout = () => {
    updateWorkout(convertToWorkoutDetails(workout)).then(r => r);
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

  const updateOnBlurExerciseSet = (exercise: WorkoutExercise, set: ExerciseSet) => {
    const exercisesIndex: number = workout.exercises.findIndex(object => object.id === exercise.id);
    const exerciseSetsIndex: number = workout.exercises[exercisesIndex].exerciseSets.findIndex(object => object.id === set.id);
    updateExerciseSetRequest(workout.exercises[exercisesIndex].exerciseSets[exerciseSetsIndex]).then(r => r);
  }

  const handleAddSet = (workoutExerciseId: number, exerciseId: number, event) => {
    event.preventDefault();
    const exerciseSetCreate = defaultExerciseSetCreate(exerciseId, workoutExerciseId);

    addExerciseSet(exerciseSetCreate).then((data) =>
        setWorkout(produce(workout, workoutDraft => {
          const exercisesIndex: number = workoutDraft.exercises.findIndex(object => object.id === workoutExerciseId);
          workoutDraft.exercises[exercisesIndex].exerciseSets.push(data)
        }))
    );
  }

  const handleDeleteSet = (exerciseId: number, setId: number) => {
    deleteExerciseSet(setId)
    .then(() =>
        setWorkout(produce(workout, workoutDraft => {
          const exercisesIndex: number = workoutDraft.exercises.findIndex(object => object.id === exerciseId);
          const exercisesSetIndex: number = workoutDraft.exercises[exercisesIndex].exerciseSets.findIndex(object => object.id === setId);
          workoutDraft.exercises[exercisesIndex].exerciseSets.splice(exercisesSetIndex, 1)
        }))
    );
  }

  const handleAddExercise = (event: any, exerciseToAdd: Exercise) => {
    event.preventDefault();
    addExercise(exerciseToAdd, (workout.exercises.length + 1), workout.id)
    .then((response) => {
          setWorkout(produce(workout, workoutDraft => {
            workoutDraft.exercises.push(response)
          }))
          setActiveStep(0);
          setOpenDialog(false);
        }
    );
  };

  const handleGetExercisesByBodyType = (event: any, input: number) => {
    event.preventDefault();
    getExercisesByCategory(input)
    .then((response) => {
          setExercises(response);
          setActiveStep(1);
        }
    );
  };

  const handleDatesChange = (result: Date | null) => {
    if (result !== null) {
      setWorkout({...workout, date: dayjs(result).toDate()});
    }
  }

  const handleStartTimeChange = (result: Date | null) => {
    if (result !== null) {
      setWorkout({...workout, startTime: dayjs(result).toDate()});
      updateWorkout(convertToWorkoutDetails(workout)).then(r => r);
    }
  }

  const handleEndTimeChange = (result: Date | null) => {
    if (result !== null) {
      setWorkout({...workout, endTime: dayjs(result).toDate()});
      updateWorkout(convertToWorkoutDetails(workout)).then(r => r);
    }
  }

  const handleWhenChangeAccepted = () => {
    updateWorkout(convertToWorkoutDetails(workout)).then(r => r);
  }

  const handleDeleteWorkoutExercise = (workoutExerciseId: number) => {
    deleteWorkoutExercise(workoutExerciseId)
    .then(() =>
        setWorkout(produce(workout, workoutDraft => {
          const exercisesIndex: number = workoutDraft.exercises.findIndex(object => object.id === workoutExerciseId);
          workoutDraft.exercises.splice(exercisesIndex, 1)
        }))
    );
  }

  const openReorderDialog = () => {
    setReorderOpenDialog(true);
  }

  const closeReorderDialog = () => {
    setReorderOpenDialog(false);
  }

  return (
      <div>
        <div className='workout-details-display'>
          <div className='dialog-workout-header'>
            <div className='dialog-workout-header-grid'>
              <div className='dialog-workout-back-action'>
                <Link to='/'>
                  <IconButton>
                    <ArrowBack/>
                  </IconButton>
                </Link>
              </div>
              <div>
                {getMonth(workout.date)} {getDayOfTheMonth(workout.date)}
              </div>
              <div className='dialog-workout-info'>
                <div>
                  <IconButton>
                    <Timer/>
                  </IconButton>
                </div>
                <div>
                  <div className='workout-header-menu'>
                    <WorkoutDrawerComponent
                        workout={workout}
                        reorderOpen={openReorderDialog}>
                    </WorkoutDrawerComponent>
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
                  onChange={handleWorkoutChange}
                  onBlur={onBlurPutRequestWorkout}/>
            </div>
            <div className='workout-weight-input'>
              <TextField
                  value={workout.bodyWeight || ''}
                  name='bodyWeight'
                  label='BW'
                  variant="outlined"
                  onChange={handleWorkoutChange}
                  onBlur={onBlurPutRequestWorkout}/>
            </div>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='workout-time-pickers'>
                <div className='workout-picker padding-for-picker date'>
                  <MobileDatePicker
                      label="Date"
                      inputFormat="YYYY-MM-DD"
                      value={getTime(workout.date || '')}
                      onChange={(result) => handleDatesChange(result)}
                      onAccept={() => handleWhenChangeAccepted()}
                      renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className='workout-picker padding-for-picker'>
                  <TimePicker
                      ampm={false}
                      value={getTime(workout.startTime || '')}
                      label='Start Time'
                      onChange={(result) => handleStartTimeChange(result)}
                      renderInput={(params) => <TextField {...params} />}/>
                </div>
                <div className='workout-picker furthest-padding'>
                  <TimePicker
                      ampm={false}
                      value={getTime(workout.endTime || '')}
                      label='End Time'
                      onChange={(result) => handleEndTimeChange(result)}
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
                onChange={handleWorkoutChange}
                onBlur={onBlurPutRequestWorkout}/>
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
                            <ExerciseDrawerComponent
                                workoutExercise={workout}
                                deleteExercise={handleDeleteWorkoutExercise}
                            >
                            </ExerciseDrawerComponent>
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
                                  <TextField value={set.weight}
                                             name="weight"
                                             label="Weight"
                                             variant="outlined"
                                             onChange={(event) => handleExerciseSetChange(event, workout, set)}
                                             onBlur={() => updateOnBlurExerciseSet(workout, set)}/>
                                </div>
                                <div className='workout-weight-input'>
                                  <TextField value={set.reps}
                                             name="reps"
                                             label="Reps"
                                             variant="outlined"
                                             onChange={(event) => handleExerciseSetChange(event, workout, set)}
                                             onBlur={() => updateOnBlurExerciseSet(workout, set)}/>
                                </div>
                                <div className='workout-weight-input'>
                                  <TextField value={set.notes}
                                             name="notes"
                                             label="Notes"
                                             variant="outlined"
                                             onChange={(event) => handleExerciseSetChange(event, workout, set)}
                                             onBlur={() => updateOnBlurExerciseSet(workout, set)}/>
                                </div>
                                <div className='set-menu-icon'>
                                  <ExerciseSetsDrawerComponent
                                      exerciseId={workout.id}
                                      setId={set.id}
                                      deleteSet={() => handleDeleteSet(workout.id, set.id)}>
                                  </ExerciseSetsDrawerComponent>
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
                  {activeStep === 0 &&
                      <div>
                        {exerciseCategories &&
                            exerciseCategories.map((category: ExerciseCategory) => (
                                <div key={category.id} className='body-part'>
                                  <div>
                                    <Button size="large" onClick={(event) => handleGetExercisesByBodyType(event, category.id)}>{category.name}</Button>
                                  </div>
                                </div>
                            ))}
                      </div>
                  }
                  {activeStep === 1 &&
                      <div>
                        {exercises &&
                            exercises.map((exercise: Exercise) => (
                                <div className='exercise-select-wrapper' key={exercise.id}>
                                  <div><Button size='small' onClick={(event: any) => handleAddExercise(event, exercise)}>{exercise.name}</Button></div>
                                  <div><Button size='small'>Edit</Button></div>
                                </div>
                            ))}
                      </div>
                  }
                </div>
              </div>
            </Dialog>
          </div>
          <Dialog
              fullScreen
              open={reorderOpenDialog}
              onClose={() => setReorderOpenDialog(false)}
              TransitionComponent={Transition}>
            <WorkoutExerciseReorder workoutExercises={workoutExercises} updateWorkoutExercise={setWorkoutExercises} close={closeReorderDialog}/>
          </Dialog>
        </div>
      </div>
  )
}

export default WorkoutDetailsPage;
