import React, {useEffect} from 'react';
import dayjs from 'dayjs';
import {Exercise, ExerciseCategory, ExerciseSet, WorkoutDetails, WorkoutExercise} from '../../models/workout';
import {Button, Dialog, Divider, FormControl, IconButton, Slide, TextField} from '@mui/material';
import './WorkoutDetailsPageComponent.scss';
import {Link, useNavigate, useParams} from "react-router-dom";
import {getDayOfTheMonth, getMonth} from "../../services/FormatterService";
import {ArrowBack, BarChart, History, Star, Timer} from '@mui/icons-material';
import {LocalizationProvider, MobileDatePicker, TimePicker} from "@mui/x-date-pickers";
import produce from "immer";
import defaultExerciseSetCreate from "../../shared/DefaultObjects";
import {TransitionProps} from "@mui/material/transitions";
import {addExerciseSet, copyExerciseSet, deleteExerciseSet, updateExerciseSetRequest} from "../../services/ExerciseSetService";
import {addExercise, createExercise, updateExercise} from "../../services/ExerciseService";
import {ExerciseSetsDrawerComponent} from '../ExerciseSetsDrawerComponent/ExerciseSetsDrawerComponent';
import {ExerciseDrawerComponent} from "../ExerciseDrawerComponent/ExerciseDrawerComponent";
import {WorkoutDrawerComponent} from "../WorkoutDrawerComponent/WorkoutDrawerComponent";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {convertToWorkoutDetails} from "../../services/ConverterService";
import {deleteWorkoutExercise, getWorkoutById, repeatWorkout, updateExercises, updateWorkout} from "../../services/WorkoutService";
import {getExerciseCategories} from "../../services/ExerciseCategoryService";
import WorkoutExerciseReorder from "../WorkoutExerciseReorder/WorkoutExerciseReorder";
import WorkoutDetailsAddExerciseComponent from "./WorkoutDetailsAddExerciseComponent/WorkoutDetailsAddExerciseComponent";
import "typeface-roboto";
import {createRoutineFromWorkout} from "../../services/RoutineService";
import WorkoutDetailsExerciseEditComponent from "./WorkoutDetailsExerciseEditComponent/WorkoutDetailsExerciseEditComponent";
import WorkoutDetailsExerciseHistory from "./WorkoutDetailsExerciseHistory/WorkoutDetailsExerciseHistory";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogsProp {
  reorderDialog: boolean;
  editExerciseDialog: boolean;
  addExerciseDialog: boolean;
  editExerciseNoteDialog: boolean;
  exerciseHistoryDialog: boolean;
}

interface ExerciseHistoryProp {
  workoutExerciseId: number;
  exerciseId: number;
  exerciseName: string;
}

function WorkoutDetailsPage() {
  const [openDialog, setOpenDialog] = React.useState<DialogsProp>({
    reorderDialog: false,
    editExerciseDialog: false,
    addExerciseDialog: false,
    editExerciseNoteDialog: false,
    exerciseHistoryDialog: false
  });
  const [exerciseHistoryData, setExerciseHistoryData] = React.useState<ExerciseHistoryProp>({
    workoutExerciseId: 0,
    exerciseId: 0,
    exerciseName: ''
  });
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [exerciseCategories, setExerciseCategories] = React.useState<ExerciseCategory[]>([]);
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
  const [selectedUpdateExercise, setSelectedUpdateExercise] = React.useState<WorkoutExercise>({
    id: 0,
    exercise: {
      id: 0,
      name: "",
      note: "",
      exerciseCategoryId: 0,
      exerciseType: "",
      isSingleBodyPartExercise: false
    },
    exerciseSets: [],
    rowNumber: 0
  });

  let navigator = useNavigate();

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
      setOpenDialog({ ...openDialog, addExerciseDialog: true });
    });
  };

  const handleClose = () => {
    setOpenDialog({ ...openDialog, addExerciseDialog: false });
    setActiveStep(0);
  };

  const getWorkout = () => {
    getWorkoutById(workoutId)
    .then((response) => {
      response.exercises.forEach(o => o.exerciseSets.sort((a, b) => a.id > b.id ? 1 : -1));
      setWorkout(response);
      setWorkoutExercises(response.exercises.sort((a, b) => a.rowNumber > b.rowNumber ? 1 : -1));
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
            id: set.id, weight: updatedExerciseSet.weight || null, reps: updatedExerciseSet.reps || null, exerciseType: updatedExerciseSet.exerciseType,
            notes: updatedExerciseSet.notes,
            exerciseSetPreviousValues: workout.exercises[exercisesIndex].exerciseSets[exerciseSetsIndex].exerciseSetPreviousValues !== null ? {
              reps: updatedExerciseSet.exerciseSetPreviousValues === null ? null : updatedExerciseSet.exerciseSetPreviousValues.reps,
              weight: updatedExerciseSet.exerciseSetPreviousValues === null ? null : updatedExerciseSet.exerciseSetPreviousValues.weight,
              notes: updatedExerciseSet.exerciseSetPreviousValues === null ? null : updatedExerciseSet.exerciseSetPreviousValues.notes,
            } : null
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
    const exercisesIndex: number = workout.exercises.findIndex(object => object.id === workoutExerciseId);
    const lastSetIndex: number = workout.exercises[exercisesIndex].exerciseSets.length;
    const exerciseSetCreate = defaultExerciseSetCreate(exerciseId, workoutExerciseId, lastSetIndex);

    addExerciseSet(exerciseSetCreate).then((data) =>
        setWorkout(produce(workout, workoutDraft => {
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

  const handleCreateExercise = (event: any, exerciseToCreate: Exercise) => {
    createExercise(exerciseToCreate)
    .then((response) => {
      handleAddExercise(event, response);
    });
  }

  const handleAddExercise = (event: any, exerciseToAdd: Exercise) => {
    event.preventDefault();
    addExercise(exerciseToAdd, (workout.exercises.length + 1), workout.id)
    .then((response) => {
          setWorkout(produce(workout, workoutDraft => {
            workoutDraft.exercises.push(response)
          }))
          setWorkoutExercises(produce(workoutExercises, draft => {
            draft.push(response);
          }))
          setActiveStep(0);
          setOpenDialog({ ...openDialog, addExerciseDialog: false });
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

  const handleFinishWorkout = () => {
    let finishDate = new Date();
    const newWorkout = workout;
    newWorkout.endTime = finishDate;
    updateWorkout(convertToWorkoutDetails(newWorkout)).then(() => {
      setWorkout(newWorkout);
      if (newWorkout.endTime !== null) {
        navigator("/");
      }
    });
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
    setOpenDialog({...openDialog, reorderDialog: true});
  }

  const closeReorderDialog = () => {
    setOpenDialog({...openDialog, reorderDialog: false});
  }

  const openEditNoteDialog = (exercise: WorkoutExercise) => {
    setSelectedUpdateExercise(exercise);
    setOpenDialog({...openDialog, editExerciseNoteDialog: true});
  }

  const closeEditNoteDialog = () => {
    setOpenDialog({...openDialog, editExerciseNoteDialog: false});
  }

  const handleExerciseNoteUpdate = (event: { target: { value: string } }) => {
    setSelectedUpdateExercise(produce(selectedUpdateExercise, draft => {
      draft.exercise.note = event.target.value;
    }))
  }

  const handleUpdateExerciseNoteMain = () => {
    updateExercise(selectedUpdateExercise.exercise)
    .then(() => {
      setWorkout(produce(workout, draft => {
        draft.exercises[draft.exercises.findIndex(o => o.id === selectedUpdateExercise.id)].exercise.note = selectedUpdateExercise.exercise.note;
      }))
      closeEditNoteDialog();
    })
  }

  const handleUpdateExerciseOrder = (result: any) => {
    const newItems = Array.from(workoutExercises);
    const sourceRow = newItems[result.source.index].rowNumber;
    newItems[result.source.index].rowNumber = newItems[result.destination.index].rowNumber;
    newItems[result.destination.index].rowNumber = sourceRow;
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    updateExercises(newItems)
    .then(() => {
      setWorkoutExercises(newItems);
      setWorkout({...workout, exercises: newItems});
    })
  }

  const handleCopyExerciseSet = (workoutExerciseId: number, exerciseSetId: number) => {
    copyExerciseSet(exerciseSetId)
    .then((response) => {
      setWorkout(produce(workout, draft => {
        draft.exercises[draft.exercises.findIndex(o => o.id === workoutExerciseId)].exerciseSets.push(response);
      }))
    })
  }

  const handleRepeatWorkout = () => {
    repeatWorkout(workout.id)
    .then((response) => {
      navigator(`/workout/${response}`);
      window.location.reload();
    })
  }

  const handleCreateRoutineFromWorkout = () => {
    createRoutineFromWorkout(workout.id)
    .then((response) => {
      navigator(`/routines/${response}`)
      window.location.reload();
    })
  }

  const handleOpenEditExerciseDialog = (exercise: WorkoutExercise) => {
    setSelectedUpdateExercise(exercise);
    getExerciseCategories()
    .then((response) => {
      setExerciseCategories(response);
    })
    setOpenDialog({...openDialog, editExerciseDialog: true});
  }

  const handleUpdateExerciseDialog = (exercise: Exercise) => {
    setWorkout(produce(workout, draft => {
      const workoutExerciseIndex: number = draft.exercises.findIndex(o => o.id === selectedUpdateExercise.id);
      draft.exercises[workoutExerciseIndex].exercise = exercise;
      setOpenDialog({...openDialog, editExerciseDialog: false});
    }));
  }

  const handleCloseEditExerciseDialog = () => {
    setOpenDialog({...openDialog, editExerciseDialog: false});
  }

  const handleOpenExerciseHistory = (workoutExercise: WorkoutExercise) => {
    setOpenDialog({...openDialog, exerciseHistoryDialog: true})
    setExerciseHistoryData({
      workoutExerciseId: workoutExercise.id,
      exerciseId: workoutExercise.exercise.id,
      exerciseName: workoutExercise.exercise.name
    });
  }

  const handleCloseExerciseHistoryDialog = () => {
    setOpenDialog({...openDialog, exerciseHistoryDialog: false});
    setExerciseHistoryData({
      workoutExerciseId: 0,
      exerciseId: 0,
      exerciseName: ''
    });
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
                {workout.endTime === null &&
                    <div className='dialog-workout-finish-action' onClick={() => handleFinishWorkout()}>
                      FINISH
                    </div>
                }
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
                        handleRepeatWorkout={handleRepeatWorkout}
                        reorderOpen={openReorderDialog}
                        handleCreateRoutineFromWorkout={handleCreateRoutineFromWorkout}>
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
                        <div>
                          <div className='exercise-title'>{workout.exercise.name || ''}</div>
                          <div className='exercise-note'>{workout.exercise.note || ''}</div>
                        </div>
                        <div className='exercise-menu'>
                          <div className="exercise-menu-options">
                            <ExerciseDrawerComponent
                                workoutExercise={workout}
                                openEditExerciseNoteDialog={openEditNoteDialog}
                                deleteExercise={handleDeleteWorkoutExercise}
                                reorderOpen={openReorderDialog}
                                openEditExerciseDialog={handleOpenEditExerciseDialog}
                                openExerciseHistoryDialog={handleOpenExerciseHistory}
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
                                             type="number"
                                             name="weight"
                                             label="Weight"
                                             variant="outlined"
                                             InputLabelProps={{shrink: true}}
                                             placeholder={set.exerciseSetPreviousValues === null ? "" : set.exerciseSetPreviousValues.weight === null ? "0" : set.exerciseSetPreviousValues.weight.toString()}
                                             onChange={(event) => handleExerciseSetChange(event, workout, set)}
                                             onBlur={() => updateOnBlurExerciseSet(workout, set)}/>
                                </div>
                                <div className='workout-weight-input'>
                                  <TextField value={set.reps}
                                             type="number"
                                             name="reps"
                                             label="Reps"
                                             variant="outlined"
                                             InputLabelProps={{shrink: true}}
                                             placeholder={set.exerciseSetPreviousValues === null ? "" : set.exerciseSetPreviousValues.reps === null ? "0" : set.exerciseSetPreviousValues.reps.toString()}
                                             onChange={(event) => handleExerciseSetChange(event, workout, set)}
                                             onBlur={() => updateOnBlurExerciseSet(workout, set)}/>
                                </div>
                                <div className='workout-weight-input'>
                                  <TextField value={set.notes}
                                             name="notes"
                                             label="Notes"
                                             variant="outlined"
                                             InputLabelProps={{shrink: true}}
                                             placeholder={set.exerciseSetPreviousValues === null ? "" : set.exerciseSetPreviousValues.notes === null ? "Notes" : set.exerciseSetPreviousValues.notes}
                                             onChange={(event) => handleExerciseSetChange(event, workout, set)}
                                             onBlur={() => updateOnBlurExerciseSet(workout, set)}/>
                                </div>
                                <div className='set-menu-icon'>
                                  <ExerciseSetsDrawerComponent
                                      exerciseId={workout.id}
                                      setId={set.id}
                                      deleteSet={handleDeleteSet}
                                      copySet={handleCopyExerciseSet}>
                                  </ExerciseSetsDrawerComponent>
                                </div>
                              </div>
                          ))}
                      <div className='actions'>
                        <div className='action-add-set'>
                          <button onClick={(event) => handleAddSet(workout.id, workout.exercise.id, event)}>Add Set</button>
                        </div>
                        <div className='icon-color'>
                          <IconButton>
                            <History/>
                          </IconButton>
                        </div>
                        <div className='icon-color'>
                          <IconButton>
                            <BarChart/>
                          </IconButton>
                        </div>
                        <div className='icon-color'>
                          <IconButton>
                            <Star/>
                          </IconButton>
                        </div>
                      </div>
                      <Divider/>
                    </div>
                ))}
            <div className='add-exercise-action'>
              <button onClick={handleClickOpen}>+ Add Exercise</button>
            </div>
            <WorkoutDetailsAddExerciseComponent
                openDialog={openDialog.addExerciseDialog}
                handleClose={handleClose}
                exerciseCategories={exerciseCategories}
                handleAddExercise={handleAddExercise}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                handleCreateExercise={handleCreateExercise}
            ></WorkoutDetailsAddExerciseComponent>
          </div>
          <Dialog
              fullScreen
              open={openDialog.reorderDialog}
              onClose={closeReorderDialog}
              TransitionComponent={Transition}>
            <WorkoutExerciseReorder items={workoutExercises} updateItems={handleUpdateExerciseOrder} close={closeReorderDialog}/>
          </Dialog>
          <Dialog
              open={openDialog.editExerciseNoteDialog}
              onClose={closeEditNoteDialog}
              fullWidth
              maxWidth="xl">
            <div className="edit-exercise-note-wrapper">
              <div className="edit-exercise-note-dialog-title">Note</div>
              <div className="edit-exercise-note-input">
                <FormControl fullWidth variant="filled">
                  <TextField value={selectedUpdateExercise.exercise.note || ""}
                             multiline
                             name="note"
                             label={selectedUpdateExercise.exercise.name}
                             variant="outlined"
                             onChange={handleExerciseNoteUpdate}/>
                </FormControl>
              </div>
              <Button onClick={handleUpdateExerciseNoteMain}>Save</Button>
              <Button onClick={closeEditNoteDialog}>Cancel</Button>
            </div>
          </Dialog>
          <Dialog
              fullScreen
              open={openDialog.editExerciseDialog}
              onClose={handleCloseEditExerciseDialog}>
            <WorkoutDetailsExerciseEditComponent
                categories={exerciseCategories}
                closeDialog={handleCloseEditExerciseDialog}
                exercise={selectedUpdateExercise.exercise}
                handleUpdateSentExercise={handleUpdateExerciseDialog}/>
          </Dialog>
          <Dialog
              fullScreen
              open={openDialog.exerciseHistoryDialog}
              onClose={handleCloseExerciseHistoryDialog}
              >
            <WorkoutDetailsExerciseHistory
                workoutExerciseId={exerciseHistoryData.workoutExerciseId}
                exerciseId={exerciseHistoryData.exerciseId}
                exerciseName={exerciseHistoryData.exerciseName}
                close={handleCloseExerciseHistoryDialog}
            />
          </Dialog>
        </div>
      </div>
  )
}

export default WorkoutDetailsPage;
