import React, {FC} from 'react';
import './WorkoutRoutineListComponent.scss';
import {WorkoutListDrawerComponent} from "../WorkoutListDrawerComponent/WorkoutListDrawerComponent";
import WorkoutRoutineListDrawer from "./WorkoutRoutineListDrawer/WorkoutRoutineListDrawer";
import "typeface-roboto";

interface WorkoutRoutineListComponentProps {
}

const WorkoutRoutineListComponent: FC<WorkoutRoutineListComponentProps> = () => (
    <div>
      <div className='routine-header'>
        <div className='routine-header-wrapper'>
          <div className='routine-header-menu'><WorkoutListDrawerComponent children={undefined}></WorkoutListDrawerComponent></div>
          <div className='routine-header-title'>Routines</div>
        </div>
        <div className='routine-drawer-menu'><WorkoutRoutineListDrawer isMain={true} children={undefined}/></div>
      </div>
      <div className='routine-list-wrapper'>
        <div className='routine'>
          <div>Full Body</div>
          <div><WorkoutRoutineListDrawer isMain={false} children={undefined}/></div>
        </div>
      </div>
    </div>

);

export default WorkoutRoutineListComponent;
