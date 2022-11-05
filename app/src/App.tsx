import React from 'react';
import './App.css';
import { WorkoutDetails } from './models/workout';
import { getDayOfTheMonth, getDayOfTheWeekForDate, getMonth } from './services/formatter-service';

export interface WorkoutState {
  workout: WorkoutDetails[];
  loading: boolean,
  error: boolean,
}

class App extends React.Component<{}, WorkoutState>  {
  constructor(props: any) {
    super(props)
    this.state = {
      workout: [],
      loading: true,
      error: false,
    }
  }

  componentDidMount() {
    fetch("https://localhost:7173/api/workout/1")
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          workout: response,
        })
      )
      .catch((error) =>
        this.setState({
          loading: false,
          error: true,
        })
      );
  }

  render() {
    return (
      <div className="App">
        {this.state.workout &&
          this.state.workout.map((workout: WorkoutDetails) => (
            <div className="workout-list-wrapper" key={workout.id}>
              <div className="workout-item">
                <div className="workout-item-column1">
                  <div>{getDayOfTheWeekForDate(workout.date)}</div>
                  <div>{getDayOfTheMonth(workout.date)}</div>
                  <div>{getMonth(workout.date)}</div>
                </div>
                <div className="workout-item-column2">{workout.name}</div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default App;
