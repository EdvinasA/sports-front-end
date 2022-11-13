import React from 'react';
import './App.scss';
import WorkoutListComponent from './components/WorkoutListComponent/WorkoutListComponent';
import WorkoutDetailsPageComponent from "./components/WorkoutDetailsComponent/WorkoutDetailsPageComponent";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component<{}, {}>  {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/workout">
            <WorkoutDetailsPageComponent />
          </Route>
          <Route path="/">
            <WorkoutListComponent />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
