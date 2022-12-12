import React, {FC} from 'react';
import './WorkoutRoutineDetailsDrawer.scss';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import {ContentCopy, Delete, Edit, MoreVert, MoveUp} from "@mui/icons-material";
import {SwipeableDrawer} from "@mui/material";
import {WorkoutRoutine} from "../../../models/Routine";

interface WorkoutRoutineDetailsDrawerProps {
  routine: WorkoutRoutine;
  handleOpenReorderDialog: () => void;
  handleDeleteRoutine: (routine: WorkoutRoutine) => void;
}

const WorkoutRoutineDetailsDrawer = (props: WorkoutRoutineDetailsDrawerProps) => {
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
          <ListItemButton onClick={props.handleOpenReorderDialog}><MoveUp/> Reorder</ListItemButton>
          <ListItemButton onClick={() => props.handleDeleteRoutine(props.routine)}><Delete/> Delete</ListItemButton>
          <ListItemButton><ContentCopy/> Copy</ListItemButton>
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
};

export default WorkoutRoutineDetailsDrawer;
