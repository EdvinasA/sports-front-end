import React from 'react';
import './App.scss';
import {
  RouterProvider
} from "react-router-dom";
import {routes} from "./routes";

class App extends React.Component {
  constructor(props: any) {
    super(props)
  }
  render() {
    return (
        <div className='app-background'>
              <RouterProvider router={routes} />
        </div>
    );
  }
}

export default App;
