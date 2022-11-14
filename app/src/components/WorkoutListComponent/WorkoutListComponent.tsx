import React from 'react';
import {WorkoutDetails} from '../../models/workout';
import {getDayOfTheWeekForDate, getDayOfTheMonth, getMonth} from '../../services/formatter-service';
import './WorkoutListComponent.scss';
import {Link} from "react-router-dom";

export interface WorkoutState {
  workout: WorkoutDetails[],
  activeWorkout: WorkoutDetails,
  loading: boolean,
  error: boolean,
  isActiveWorkout: boolean,
  isEditingDisplayed: boolean,
}

class WorkoutListComponent extends React.Component<{}, WorkoutState> {
  constructor(props: any) {
    super(props)
    this.state = {
      workout: [],
      activeWorkout: {
        id: 0,
        name: '',
        bodyWeight: 0,
        date: '',
        startTime: '',
        endTime: '',
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
    fetch("https://localhost:7173/api/workout/1")
    .then((response) => response.json())
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

  checkIfThereIsActiveWorkout(response: WorkoutDetails[]) {
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

  createWorkout() {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({date: new Date()})
    };
    fetch("https://localhost:7173/api/workout/1", requestOptions);
  }

  openWorkout() {
    this.setState({
      isEditingDisplayed: !this.state.isEditingDisplayed
    });

  }

  render() {
    return (
        <div>
          {this.state.workout &&
              this.state.workout.map((workout: WorkoutDetails) => (
                  <div className="workout-list-wrapper" key={workout.id}>
                    <div className="workout-item">
                      <div className="workout-item-column1">
                        <div>{getDayOfTheWeekForDate(workout.date)}</div>
                        <div>{getDayOfTheMonth(workout.date)}</div>
                        <div>{getMonth(workout.date)}</div>
                      </div>
                      <div className="workout-item-column2">{workout.name || 'Workout'}</div>
                    </div>
                  </div>
              ))}
          <div>
            {!this.state.isActiveWorkout &&
                <button onClick={this.createWorkout}>Create workout</button>
            }
            {this.state.isActiveWorkout &&
                <Link to={`/workout/${this.state.activeWorkout.id}`}>
                  <button onClick={() => this.openWorkout()}>Resume workout</button>
                </Link>
            }
          </div>
        </div>
    )
  }
}

export default WorkoutListComponent;
