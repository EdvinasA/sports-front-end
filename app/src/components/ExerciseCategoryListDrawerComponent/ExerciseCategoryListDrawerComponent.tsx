import React from 'react';
import './ExerciseCategoryListDrawerComponent.scss';
import {ExerciseCategory} from "../../models/workout";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import {Delete, Edit, MoreVert} from "@mui/icons-material";
import {Divider, SwipeableDrawer} from "@mui/material";

interface ExerciseCategoryListDrawerComponentProps {
  exerciseCategory: ExerciseCategory;
  deleteExerciseCategory: (exerciseCategoryId: number) => void;
  updateExerciseCategory: (exerciseCategory: ExerciseCategory) => void;
  children: React.ReactNode;
}

const ExerciseCategoryListDrawerComponent= (props: ExerciseCategoryListDrawerComponentProps) => {
  type Anchor = 'bottom';
  const [state, setState] = React.useState({
    bottom: false,
  });

  const handleDeleteExerciseCategory = () => {
    props.deleteExerciseCategory(props.exerciseCategory.id);
  }

  const handleUpdateExerciseCategory = () => {
    props.updateExerciseCategory(props.exerciseCategory);
  }

  const list = (anchor: Anchor) => (
      <Box
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
      >
        <div className='category-drawer-title'>{props.exerciseCategory.name}</div>
        <Divider></Divider>
        <List>
          <ListItemButton onClick={handleUpdateExerciseCategory}><Edit/> Edit</ListItemButton>
          <ListItemButton onClick={handleDeleteExerciseCategory}><Delete/> Delete</ListItemButton>
        </List>
      </Box>
  );

  const toggleDrawer =
      (anchor: Anchor, open: boolean) =>
          (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
              return;
            }

            setState({...state, [anchor]: open});
          };

  return (
      <React.Fragment key={'bottom'}>
        <div className='menu-button' onClick={toggleDrawer('bottom', true)}><MoreVert/></div>
        <SwipeableDrawer
            anchor={'bottom'}
            open={state['bottom']}
            onClose={toggleDrawer('bottom', false)}
            onOpen={toggleDrawer('bottom', true)}
        >
          {list('bottom')}
        </SwipeableDrawer>
      </React.Fragment>
  )
}

export default ExerciseCategoryListDrawerComponent;
