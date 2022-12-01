import React, { FC } from 'react';
import './WorkoutRoutineListComponent.scss';
import {WorkoutListDrawerComponent} from "../WorkoutListDrawerComponent/WorkoutListDrawerComponent";

interface WorkoutRoutineListComponentProps {}

const WorkoutRoutineListComponent: FC<WorkoutRoutineListComponentProps> = () => (
    <div className='workout-list-header'>
      <div className='workout-list-header-wrapper'>
        <div className='workout-list-header-menu'><WorkoutListDrawerComponent children={undefined}></WorkoutListDrawerComponent></div>
        <div className='workout-list-header-month'>Routines</div>
      </div>
    </div>
);

export default WorkoutRoutineListComponent;
