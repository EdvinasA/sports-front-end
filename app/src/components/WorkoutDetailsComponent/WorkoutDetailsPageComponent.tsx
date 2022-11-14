import React, {useEffect} from 'react';
import {ExerciseSet, WorkoutDetails, WorkoutExercise} from '../../models/workout';
import {Divider, IconButton, TextField} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import './WorkoutDetailsPageComponent.scss';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarIcon from '@mui/icons-material/Star';
import DrawerComponent from "../../shared/DrawerComponent/DrawerComponent";
import {
  useParams
} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {getMonth} from "../../services/formatter-service";
import TimerIcon from "@mui/icons-material/Timer";

export interface WorkoutDetailsState {
  workout: WorkoutDetails,
  loading: boolean,
  error: boolean,
}

function WorkoutDetailsPage() {
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

  // @ts-ignore
  let { workoutId }: string | unknown = useParams();

  useEffect(() => {
    if (workout.id === 0) {
      getWorkout();
    }
  });

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

  const handleAddSet = (workoutExerciseId: number, exerciseId: number) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        weight: 0,
        reps: 0,
        notes: "",
        exerciseType: "NORMAL",
        exerciseId: exerciseId,
        workoutExerciseId: workoutExerciseId,
        userId: 1
      })
    };
    fetch("https://localhost:7173/api/exercise-set/1", requestOptions).then(r => r);
  }

  const handleDeleteSet = (setId: number) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    };
    fetch(`https://localhost:7173/api/exercise-set/1/${setId}`, requestOptions).then(r => r);
  }

  const handleEdit = () => {

  }

  return (
      <div className='workout-details-display'>
        <div className='dialog-workout-header'>
          <div className='dialog-workout-header-grid'>
            <div className='dialog-workout-back-action'>
              <IconButton>
                <ArrowBackIcon/>
              </IconButton>
            </div>
            <div>
              {getMonth(workout.date)}
              5
            </div>
            <div className='dialog-workout-info'>
              <div>
                <IconButton>
                  <TimerIcon/>
                </IconButton>
              </div>
              <div>
                <IconButton>
                  <MoreVertIcon/>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div className='inputs-first-row'>
          <div className='workout-name-input'>
            <TextField value={workout.name} label='Name' variant="outlined" InputLabelProps={{ shrink: true }}/>
          </div>
          <div className='workout-weight-input'>
            <TextField value={workout.bodyWeight || ''} label='BW' variant="outlined" InputLabelProps={{ shrink: true }}/>
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
                    value={getTime(workout.startTime || '')}
                    label='End Time'
                    onChange={() => console.log("hello")}
                    renderInput={(params) => <TextField {...params} />}/>
              </div>
            </div>
          </LocalizationProvider>
        </div>
        <div className='workout-notes'>
          <TextField value={workout.notes} label='Notes' variant="outlined" InputLabelProps={{ shrink: true }}/>
        </div>
        <Divider/>
        <div>
          {workout.exercises &&
              workout.exercises.map((workout: WorkoutExercise) => (
                  <div key={workout.id}>
                    <div className='exercise'>
                      <div className='exercise-title'>{workout.exercise.name || ''}</div>
                      <div className='exercise-menu'>
                        <IconButton>
                          <MoreVertIcon/>
                        </IconButton>
                      </div>
                    </div>
                    {workout.exerciseSets &&
                        workout.exerciseSets.map((set: ExerciseSet, index: number) => (
                            <div className='sets' key={set.id}>
                              <div>
                                <div className='set-number'>{(index + 1)}</div>
                              </div>
                              <div className='workout-weight-input'>
                                <TextField value={set.weight} label='Weight' variant="outlined"/>
                              </div>
                              <div className='workout-weight-input'>
                                <TextField value={set.reps} label='Reps' variant="outlined"/>
                              </div>
                              <div className='workout-weight-input'>
                                <TextField value={set.notes} label='Notes' variant="outlined"/>
                              </div>
                              <div className='set-menu-icon'>
                                    <DrawerComponent></DrawerComponent>
                              </div>
                            </div>
                        ))}
                    <div className='actions'>
                      <div className='action-add-set'>
                        <button onClick={() => handleAddSet(workout.id, workout.exercise.id)}>ADD SET</button>
                      </div>
                      <div>
                        <IconButton>
                          <HistoryIcon/>
                        </IconButton>
                      </div>
                      <div>
                        <IconButton>
                          <BarChartIcon/>
                        </IconButton>
                      </div>
                      <div>
                        <IconButton>
                          <StarIcon/>
                        </IconButton>
                      </div>
                    </div>
                    <Divider/>
                  </div>
              ))}
          <div className='add-exercise-action'>
            <button>+ ADD EXERCISE</button>
          </div>
        </div>
      </div>
  )
}

export default WorkoutDetailsPage;
