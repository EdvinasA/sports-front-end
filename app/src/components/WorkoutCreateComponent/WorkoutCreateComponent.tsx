import React from 'react';
import './WorkoutCreateComponent.scss';
import {useNavigate} from "react-router-dom";
import {createWorkout} from "../../services/WorkoutService";
import {IconButton} from "@mui/material";
import {Add} from "@mui/icons-material";

interface WorkoutCreateComponentProps {
}

const WorkoutCreateComponent = (props: WorkoutCreateComponentProps) => {
  let navigation = useNavigate();

  const createNewWorkout = () => {
    createWorkout().then((response) => {
      navigation.bind(`/workout/${response}`);
    });
  }

  return (
      <div className="WorkoutCreateComponent">
        <IconButton onClick={createNewWorkout}><Add/></IconButton>
      </div>
  )
};

export default WorkoutCreateComponent;
