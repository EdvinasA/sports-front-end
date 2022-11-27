import React from 'react';
import './WorkoutCreateComponent.scss';
import {useHistory} from "react-router-dom";
import {createWorkout} from "../../services/WorkoutService";

interface WorkoutCreateComponentProps {
}

const WorkoutCreateComponent = (props: WorkoutCreateComponentProps) => {
  let navigation = useHistory();

  const createNewWorkout = () => {
    createWorkout().then((response) => {
      navigation.push(`/workout/${response}`)
    });
  }

  return (
      <div className="WorkoutCreateComponent">
        <button onClick={createNewWorkout}>Create workout</button>
      </div>
  )
};

export default WorkoutCreateComponent;
