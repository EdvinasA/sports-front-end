import React from 'react';
import './App.scss';
import WorkoutListComponent from './components/WorkoutListComponent/WorkoutListComponent';

class App extends React.Component<{}, {}>  {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <WorkoutListComponent></WorkoutListComponent>
      </div>
    );
  }
}

export default App;
