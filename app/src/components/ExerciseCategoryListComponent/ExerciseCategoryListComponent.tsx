import React, {useEffect} from 'react';
import './ExerciseCategoryListComponent.scss';
import {Link} from "react-router-dom";
import {Add, ArrowBack} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {ExerciseCategory} from "../../models/workout";
import {getExerciseCategories} from "../../services/ExerciseCategoryService";

interface ExerciseCategoryListComponentProps {
}

const ExerciseCategoryListComponent = (props: ExerciseCategoryListComponentProps) => {
  const [categories, setCategories] = React.useState<ExerciseCategory[]>([]);

  useEffect(() => {
    getExerciseCategories()
      .then((response) => {
        setCategories(response);
      })
  }, [])

  return (
      <div className="ExerciseCategoryListComponent">
        <div className='exercise-edit-list-header'>
          <div className='exercise-edit-list-column1'>
            <div className='exercise-edit-list-column1-field1'>
              <Link to='/'>
                <ArrowBack/>
              </Link>
            </div>
            <div className='exercise-edit-list-column1-field2'>
              Edit Categories
            </div>
          </div>
          <IconButton className='exercise-edit-list-column2'>
            <Add/>
          </IconButton>
        </div>
        <div>
          {categories &&
            categories.map((category) => (
                <div key={category.id}>{category.name}</div>
            ))}
        </div>
      </div>
  )
};

export default ExerciseCategoryListComponent;
