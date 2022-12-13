import React, {FC} from 'react';
import './StatisticsComponent.scss';
import {WorkoutListDrawerComponent} from "../../WorkoutListDrawerComponent/WorkoutListDrawerComponent";
import "typeface-roboto";

interface StatisticsComponentProps {
}

const StatisticsComponent = () => {
  return (
      <div>
        <div className='statistics-header'>
          <div className='statistics-header-wrapper'>
            <div className='statistics-header-menu'><WorkoutListDrawerComponent children={undefined}></WorkoutListDrawerComponent></div>
            <div className='statistics-header-title'>Statistics</div>
          </div>
        </div>
        <div className='statistics-display'>
          <div className='statistics-display-overall'>
            <div className='statistics-display-title'>Overall Statistics</div>
            <div>
              <div>Number of Workouts</div>
              <div>2</div>
            </div>
            <div>
              <div>Workout Duration</div>
              <div>2</div>
            </div>
            <div>
              <div>Volume</div>
              <div>2</div>
            </div>
            <div>
              <div>Total Sets</div>
              <div>2</div>
            </div>
            <div>
              <div>Total Reps</div>
              <div>2</div>
            </div>
            <div>
              <div>Total Reps per Set</div>
              <div>2</div>
            </div>
            <div>
              <div>Bodyweight</div>
              <div>2</div>
            </div>
          </div>
          <div className='statistics-display-category'>
            <div className='statistics-display-title'>Category Statistics</div>
            <div>
              <div>Number of Workouts</div>
              <div>1</div>
            </div>
            <div>
              <div>Workout Duration</div>
              <div>1</div>
            </div>
            <div>
              <div>Volume</div>
              <div>2</div>
            </div>
            <div>
              <div>Total Sets</div>
              <div>2</div>
            </div>
            <div>
              <div>Total Reps</div>
              <div>2</div>
            </div>
            <div>
              <div>Total Reps per Set</div>
              <div>2</div>
            </div>
            <div>
              <div>Bodyweight</div>
              <div>2</div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default StatisticsComponent;
