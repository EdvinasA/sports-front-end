import React, {useEffect} from 'react';
import './StatisticsComponent.scss';
import {ArrowForward} from '@mui/icons-material';
import {WorkoutListDrawerComponent} from "../../WorkoutListDrawerComponent/WorkoutListDrawerComponent";
import "typeface-roboto";
import {IconButton} from "@mui/material";
import {ExerciseCategory} from "../../../models/workout";
import {getExerciseCategories} from "../../../services/ExerciseCategoryService";

const StatisticsComponent = () => {
  const [categories, setCategories] = React.useState<ExerciseCategory[]>([]);

  useEffect(() => {
    getExerciseCategories()
    .then((response) => {
      setCategories(response);
    })
  })

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
            <div className='statistics-display-values'>
              <div>Number of Workouts</div>
              <div>0</div>
            </div>
            <div className='statistics-display-values'>
              <div>Workout Duration</div>
              <div>0</div>
            </div>
            <div className='statistics-display-values'>
              <div>Volume</div>
              <div>0</div>
            </div>
            <div className='statistics-display-values'>
              <div>Total Sets</div>
              <div>0</div>
            </div>
            <div className='statistics-display-values'>
              <div>Total Reps</div>
              <div>0</div>
            </div>
            <div className='statistics-display-values'>
              <div>Bodyweight</div>
              <div>0</div>
            </div>
          </div>
          <div className='statistics-display-category'>
            <div className='statistics-display-title'>Category Statistics</div>
            {categories && categories.map((category: ExerciseCategory) => (
                <div className='statistics-display-values'>
                  <div>{category.name}</div>
                  <div><ArrowForward/></div>
                </div>
            ))
            }
          </div>
        </div>
      </div>
  );
}

export default StatisticsComponent;
