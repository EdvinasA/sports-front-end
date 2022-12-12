import React from 'react';
import './WorkoutRoutineExerciseDrawer.scss';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import {Edit, Delete, MoreVert, MoveUp} from "@mui/icons-material";
import {SwipeableDrawer} from "@mui/material";
import {WorkoutRoutineExercise} from "../../../models/Routine";

interface WorkoutRoutineExerciseDrawerProps {
  deleteRoutineExercise: (routineExercise: WorkoutRoutineExercise) => void;
  openReorder: () => void;
  routineExercise: WorkoutRoutineExercise;
  openEditDialog: (exercise: WorkoutRoutineExercise) => void;
}

const WorkoutRoutineExerciseDrawer = (props: WorkoutRoutineExerciseDrawerProps) => {
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
          <ListItemButton onClick={() => props.openEditDialog(props.routineExercise)}><Edit/> Edit</ListItemButton>
          <ListItemButton onClick={() => props.openReorder()}><MoveUp/> Reorder</ListItemButton>
          <ListItemButton onClick={() => props.deleteRoutineExercise(props.routineExercise)}><Delete/> Delete</ListItemButton>
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

export default WorkoutRoutineExerciseDrawer;
