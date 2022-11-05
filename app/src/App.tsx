import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WorkoutDetails } from './models/workout';

class App extends React.Component {
  // private routes: [] = routes;
  state = {
    workout: [{
      id: 1,
      name: '',
      bodyWeight: 1,
      date: '',
      startTime: '',
      endTime: '',
      notes: '',
      exercises: [{
        name: ''
      }]
    }]
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

  getMonth(date: string) {
    let fixed = new Date(date);
    return this.getMonthName(fixed.getMonth()).slice(0, 5) + '.';
  }

  getDayOfTheWeekForDate(date: string) {
    let fixed = new Date(date);
    return this.getDayOfTheWeek(fixed.getDay()).slice(0, 3) + '.';
  }

  getDayOfTheMonth(date: string) {
    let fixed = new Date(date);
    return fixed.getDate() < 10 ? `0${fixed.getDate().toString()}` : fixed.getDate().toString();
  }

  getDayOfTheWeek(dayOfTheWeek: number) {
    switch (dayOfTheWeek) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      case 7:
        return 'Sunday';
      default:
        return "";
    }
  }

  getMonthName(monthNumber: number) {
    switch (monthNumber) {
      case 1:
        return "January";
      case 2:
        return "Feabruary";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "";
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.workout &&
          this.state.workout.map((workout: WorkoutDetails) => (
            <div className="workout-list-wrapper" key={workout.id}>
              <div className="workout-item">
                <div className="workout-item-column1">
                  <div>{this.getDayOfTheWeekForDate(workout.date)}</div>
                  <div>{this.getDayOfTheMonth(workout.date)}</div>
                  <div>{this.getMonth(workout.date)}</div>
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
