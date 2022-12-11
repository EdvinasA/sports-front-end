import React, {FC} from 'react';
import './CreateComponent.scss';
import {useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import {Add} from "@mui/icons-material";
import {createRoutine} from "../../../services/RoutineService";

interface CreateComponentProps {
}

const CreateComponent = (props: CreateComponentProps) => {
  let navigation = useNavigate();

  const createNewRoutine = () => {
    createRoutine().then((response) => {
      navigation(`/routine/${response}`);
    });
  }

  return (
      <div>
        <IconButton onClick={createNewRoutine}><Add/></IconButton>
      </div>
  )
};

export default CreateComponent;
