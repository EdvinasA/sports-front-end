import React from 'react';
import {WorkoutDetails, WorkoutExercise} from '../../models/workout';
import {getDayOfTheWeekForDate, getDayOfTheMonth, getMonth} from '../../services/FormatterService';
import './WorkoutListComponent.scss';
import {Link} from "react-router-dom";
import {WorkoutListDrawerComponent} from "../WorkoutListDrawerComponent/WorkoutListDrawerComponent";
import WorkoutCreateComponent from "../WorkoutCreateComponent/WorkoutCreateComponent";
import {getWorkouts} from "../../services/WorkoutService";
import {PlayArrow} from "@mui/icons-material"
import {IconButton} from "@mui/material";
import "typeface-roboto";

export interface WorkoutState {
  workout: WorkoutDetails[];
  activeWorkout: WorkoutDetails;
  loading: boolean;
  error: boolean;
  isActiveWorkout: boolean;
  isEditingDisplayed: boolean;
  useContainer: boolean;
}

class WorkoutListComponent extends React.Component<{}, WorkoutState> {
  constructor(props: any) {
    super(props)
    this.state = {
      useContainer: false,
      workout: [],
      activeWorkout: {
        id: 0,
        name: '',
        bodyWeight: 0,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        notes: '',
        exercises: [],
      },
      loading: true,
      error: false,
      isActiveWorkout: false,
      isEditingDisplayed: false,
    }
  }

  componentDidMount() {
    getWorkouts()
    .then((response) =>
        this.setState({
          workout: response,
          isActiveWorkout: this.checkIfThereIsActiveWorkout(response),
        })
    )
    .catch((error) =>
        this.setState({
          loading: false,
          error: true,
        })
    );
  }

  private checkIfThereIsActiveWorkout(response: WorkoutDetails[]) {
    response.forEach((workout) => {
      if (workout.endTime === null) {
        if (workout.id !== 0) {
          this.setState({
            activeWorkout: workout
          });
        }
        return false;
      }
      return true;
    })
    return true;
  }

  private openWorkout() {
    this.setState({
      isEditingDisplayed: !this.state.isEditingDisplayed
    });
  }

  private getWorkoutLength(workout: WorkoutDetails) {
    if (workout.startTime !== null && workout.endTime !== null) {
      var difference = Math.abs(new Date(workout.startTime).getTime() - new Date(workout.endTime).getTime());
      return `${Math.floor((difference / 1000) / 60)} min`;
    }
    return '';
  }

  render() {
    return (
        <div>
          <div className='workout-list-header'>
            <div className='workout-list-header-wrapper'>
              <div className='workout-list-header-menu'><WorkoutListDrawerComponent children={undefined}></WorkoutListDrawerComponent></div>
              <div className='workout-list-header-month'>{getMonth(new Date())}</div>
            </div>
            <div className='workout-list-header-image'>
              <img className='image-size' src={require('./logo-background.png')} alt='logo'/>
            </div>
          </div>
          <div className='application-wrapper'>
            {this.state.workout &&
                this.state.workout.map((workout: WorkoutDetails) => (
                    <div className="workout-list-wrapper" key={workout.id}>
                      <Link to={`/workout/${workout.id}`}>
                        <div className="workout-item">
                          <div className="workout-item-column1">
                            <div>{getDayOfTheWeekForDate(workout.date)}</div>
                            <div>{getDayOfTheMonth(workout.date)}</div>
                            <div>{getMonth(workout.date)}</div>
                          </div>
                          <div className="workout-item-column2">
                            <div>
                              <div className='workout-title'>
                                {workout.name || 'Workout'}
                              </div>
                              <div>
                                {workout.exercises &&
                                    workout.exercises.map((exercise: WorkoutExercise) => (
                                        <div key={exercise.id}>{exercise.exerciseSets.length}x {exercise.exercise.name}</div>
                                    ))}
                              </div>
                            </div>
                            <div className='workout-duration'>
                              <div>
                                {this.getWorkoutLength(workout)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                ))}
            <div className='open-workout-button'>
              {this.state.activeWorkout.id === 0 &&
                  <WorkoutCreateComponent></WorkoutCreateComponent>
              }
              {this.state.activeWorkout.id !== 0 &&
                  <Link to={`/workout/${this.state.activeWorkout.id}`}>
                    <IconButton
                        onClick={() => this.openWorkout()}
                    ><PlayArrow/>
                    </IconButton>
                  </Link>
              }
            </div>
          </div>
        </div>
    )
  }
}

export default WorkoutListComponent;
