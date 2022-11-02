import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  // private routes: [] = routes;
  state = {
    exercise: []
  }

  componentDidMount() {
    fetch("https://localhost:7173/api/exercise")
    .then((response) => response.json())
    .then((response) =>
        this.setState({
          exercise: response,
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

            {this.state.exercise &&
              this.state.exercise.map((exercise: any) => (
                  <div>{this.state.exercise.length}</div>
              ))}
          </div>
    );
  }
}

export default App;
