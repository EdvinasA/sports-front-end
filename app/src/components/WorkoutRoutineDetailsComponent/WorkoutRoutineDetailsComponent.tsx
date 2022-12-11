import React, {FC, useEffect} from 'react';
import './WorkoutRoutineDetailsComponent.scss';
import {ArrowBack} from "@mui/icons-material";
import {Divider, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import WorkoutRoutineListDrawer from "../WorkoutRoutineListComponent/WorkoutRoutineListDrawer/WorkoutRoutineListDrawer";
import {useNavigate, useParams} from "react-router-dom";
import {WorkoutRoutine} from "../../models/Routine";
import {getRoutine} from "../../services/RoutineService";
import produce from "immer";

interface WorkoutRoutineDetailsComponentProps {
}

const WorkoutRoutineDetailsComponent = (props: WorkoutRoutineDetailsComponentProps) => {
  const [routine, setRoutine] = React.useState<WorkoutRoutine>({
    id: 0,
    name: "",
    targets: "",
    notes: "",
    workoutRoutineExercises: []
  });
  let navigation = useNavigate();

  // @ts-ignore
  let {routineId}: string | unknown = useParams();

  const handleNavigation = (route: string) => {
    navigation(route);
  }

  useEffect(() => {
    if (routine.id === 0) {
      getRoutine(routineId)
      .then((response) => {
        setRoutine(response);
      });
    }
  });

  const handleChange = (event: { target: { name: any, value: any } }) => {
    setRoutine({...routine, [event.target.name]: event.target.value});
  }

  return (
      <div>
        <div className='routine-details-header'>
          <div className='routine-details-header-column1'>
            <IconButton onClick={() => handleNavigation("/routines")}><ArrowBack/></IconButton>
            <div className='routine-details-header-column1-title'>{routine.name || ''}</div>
          </div>
          <div className='routine-details-header-column2'>
            <div className='routine-details-header-column2-start'>Start</div>
            <div><WorkoutRoutineListDrawer routine={routine} isDetails={true} isMain={false} children={undefined}></WorkoutRoutineListDrawer></div>
          </div>
        </div>
        <div className='routine-details-main'>
          <div className='routine-details-input'>
            <TextField
                fullWidth
                value={routine.name || ''}
                name='name'
                label='Name'
                variant="outlined"
                onChange={handleChange}/>
          </div>
          <div className='routine-details-input'>
          <FormControl sx={{ minWidth: 335 }}>
            <InputLabel id="Targets">Targets</InputLabel>
            <Select
                fullWidth
                labelId='Targets'
                value='Latest'
                name='targets'
                label='Targe'
                variant='outlined'
            >
              <MenuItem value={'Latest'}>Latest</MenuItem>
            </Select>
          </FormControl>
          </div>
          <div className='routine-details-input'>
            <TextField
                fullWidth
                value={routine.notes || ''}
                name='notes'
                label='Notes'
                variant="outlined"
                onChange={handleChange}/>
          </div>
        </div>
        <Divider></Divider>
        <div className='routine-details-exercises'>
        </div>
      </div>
  );
}

export default WorkoutRoutineDetailsComponent;
