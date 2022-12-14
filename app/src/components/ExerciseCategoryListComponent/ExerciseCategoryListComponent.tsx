import React, {useEffect} from 'react';
import './ExerciseCategoryListComponent.scss';
import {Link} from "react-router-dom";
import {Add, ArrowBack, MoreVert} from "@mui/icons-material";
import {Button, Divider, IconButton} from "@mui/material";
import {ExerciseCategory} from "../../models/workout";
import {createExerciseCategories, deleteExerciseCategory, getExerciseCategories, updateExerciseCategories} from "../../services/ExerciseCategoryService";
import ExerciseCategoryDialogComponent from "../shared/ExerciseCategoryDialogComponent/ExerciseCategoryDialogComponent";
import produce from "immer";
import ExerciseCategoryListDrawerComponent from "../ExerciseCategoryListDrawerComponent/ExerciseCategoryListDrawerComponent";

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

  const handleUpdateSelectedExerciseCategory = (event: { target: { name: any, value: any } }) => {
    setSelectedCategory({...selectedCategory, [event.target.name]: event.target.value});
  }

  const handleUpdateNewExerciseCategory = (event: { target: { name: any, value: any } }) => {
    setDefaultCategory({...selectedCategory, [event.target.name]: event.target.value});
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

  const handleDeleteExerciseCategory = (exerciseCategoryId: number) => {
    deleteExerciseCategory(exerciseCategoryId)
      .then(() => {
        setCategories(produce(categories, draft => {
          draft.splice(draft.findIndex(o => o.id === exerciseCategoryId), 1);
        }))
      })
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
        </div>
        <div className='exercise-categories-list-display'>
          {categories &&
              categories.map((category) => (
                  <div key={category.id}>
                    <div className='exercise-category-display-wrapper'>
                      <div className='exercise-category-display-name'
                           onClick={() => handleEditDialogOpen(category)}>{category.name}</div>
                      <div className='exercise-category-display-menu'>
                        <ExerciseCategoryListDrawerComponent
                          exerciseCategory={category}
                          updateExerciseCategory={handleEditDialogOpen}
                          deleteExerciseCategory={handleDeleteExerciseCategory}>
                      </ExerciseCategoryListDrawerComponent></div>
                    </div>
                    <Divider></Divider>
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
        <div className='add-category-button'>
          <Button variant='outlined'
              onClick={handleCreateDialogOpen}
          ><Add/> Add category
          </Button>
        </div>
      </div>
  )
};

export default ExerciseCategoryListComponent;
