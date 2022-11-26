import React, {useEffect} from 'react';
import './ExerciseCategoryListComponent.scss';
import {Link} from "react-router-dom";
import {Add, ArrowBack, MoreVert} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {ExerciseCategory} from "../../models/workout";
import {createExerciseCategories, getExerciseCategories, updateExerciseCategories} from "../../services/ExerciseCategoryService";
import ExerciseCategoryDialogComponent from "../shared/ExerciseCategoryDialogComponent/ExerciseCategoryDialogComponent";
import produce from "immer";

interface ExerciseCategoryListComponentProps {
}

const ExerciseCategoryListComponent = (props: ExerciseCategoryListComponentProps) => {
  const [categories, setCategories] = React.useState<ExerciseCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<ExerciseCategory>({name: '', id: 0, exercise: []});
  const [defaultCategory, setDefaultCategory] = React.useState<ExerciseCategory>({name: '', id: 0, exercise: []});
  const [editOpen, setEditOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);

  const handleEditDialogOpen = (category: ExerciseCategory) => {
    setSelectedCategory(category);
    setEditOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
  };

  const handleCreateDialogOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateDialogClose = () => {
    setCreateOpen(false);
  };

  const handleUpdateSelectedExerciseCategory = (event: { target: { name: any, value: any } } ) => {
    setSelectedCategory({ ...selectedCategory, [event.target.name]: event.target.value } );
  }

  const handleUpdateNewExerciseCategory = (event: { target: { name: any, value: any } } ) => {
    setDefaultCategory({ ...selectedCategory, [event.target.name]: event.target.value } );
  }

  const handleCreateExerciseCategory = () => {
    handleCreateDialogClose();
    createExerciseCategories(defaultCategory)
      .then((response: ExerciseCategory) => {
        setCategories(produce(categories, draft => {
          draft.push(response);
        }));
        setDefaultCategory({name: '', id: 0, exercise: []})
      });
  }

  const handleUpdateExerciseCategory = () => {
    handleEditDialogClose()
    updateExerciseCategories(selectedCategory)
    .then(() => {
      setCategories(produce(categories, draft => {
        draft[draft.findIndex(o => o.id === selectedCategory.id)] = selectedCategory;
      }));
    });
  }

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
          <IconButton className='exercise-edit-list-column2' onClick={handleCreateDialogOpen}>
            <Add/>
          </IconButton>
        </div>
        <div className='exercise-categories-list-display'>
          {categories &&
              categories.map((category) => (
                  <div className='exercise-category-display' key={category.id}>
                    <div className='exercise-category-display-name' onClick={() => handleEditDialogOpen(category)}>{category.name}</div>
                    <div className='exercise-category-display-menu'><MoreVert /></div>
                  </div>
              ))}
        </div>
        <ExerciseCategoryDialogComponent
            handleDialogClose={handleEditDialogClose}
            dialogOpen={editOpen}
            category={selectedCategory}
            isAdd={false}
            handleUpdateCategoryName={handleUpdateSelectedExerciseCategory}
            handleApiCall={handleUpdateExerciseCategory}/>
        <ExerciseCategoryDialogComponent
            handleDialogClose={handleCreateDialogClose}
            dialogOpen={createOpen}
            category={defaultCategory}
            isAdd={true}
            handleUpdateCategoryName={handleUpdateNewExerciseCategory}
            handleApiCall={handleCreateExerciseCategory}/>
      </div>
  )
};

export default ExerciseCategoryListComponent;
