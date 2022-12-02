import React, { FC } from 'react';
import './StatisticsComponent.scss';
import {WorkoutListDrawerComponent} from "../WorkoutListDrawerComponent/WorkoutListDrawerComponent";

interface StatisticsComponentProps {}

const StatisticsComponent: FC<StatisticsComponentProps> = () => (
    <div className='workout-list-header'>
      <div className='workout-list-header-wrapper'>
        <div className='workout-list-header-menu'><WorkoutListDrawerComponent children={undefined}></WorkoutListDrawerComponent></div>
        <div className='workout-list-header-month'>Statistics</div>
      </div>
    </div>
);

export default StatisticsComponent;
