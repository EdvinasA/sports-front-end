import React from 'react';
import './ExerciseListDrawerComponent.scss';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import {Edit, MoreVert, Delete} from "@mui/icons-material";
import {Divider, SwipeableDrawer} from "@mui/material";
import {Exercise} from "../../models/workout";

interface ExerciseListDrawerComponentProps {
  exercise: Exercise;
  children: React.ReactNode;
  openEditDialog: (exercise) => void;
  deleteExercise: (exerciseId: number) => void;
}

const ExerciseListDrawerComponent = (props: ExerciseListDrawerComponentProps) => {

  type Anchor = 'bottom';
  const [state, setState] = React.useState({
    bottom: false,
  });

  const list = (anchor: Anchor) => (
      <Box
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItemButton onClick={props.openEditDialog}><Edit/> Edit</ListItemButton>
          <ListItemButton onClick={() => props.deleteExercise(props.exercise.id)}><Delete/> Delete</ListItemButton>
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
          <div>{props.exercise.name}</div>
          <Divider/>
          {list('bottom')}
        </SwipeableDrawer>
      </React.Fragment>
  )
};

export default ExerciseListDrawerComponent;
