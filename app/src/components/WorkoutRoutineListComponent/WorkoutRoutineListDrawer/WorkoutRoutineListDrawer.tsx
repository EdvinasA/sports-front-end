import React from 'react';
import './WorkoutRoutineListDrawer.scss';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import {Delete, MoveUp, ContentCopy, MoreVert} from "@mui/icons-material";
import {SwipeableDrawer} from "@mui/material";
import { WorkoutRoutine } from '../../../models/Routine';

interface WorkoutRoutineListDrawerProps {
  isMain: boolean;
  isDetails: boolean;
  routine: WorkoutRoutine;
  openReorder: () => void;
  children: React.ReactNode;
}

const WorkoutRoutineListDrawer = (props: WorkoutRoutineListDrawerProps) => {
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
          <ListItemButton onClick={props.openReorder}><MoveUp/> Reorder</ListItemButton>
          {!props.isMain && !props.isDetails &&
              <>
                <ListItemButton><ContentCopy/>Copy</ListItemButton>
                <ListItemButton><Delete/> Delete</ListItemButton>
              </>
          }
          {props.isDetails &&
              <>
                <ListItemButton><ContentCopy/>Copy</ListItemButton>
                <ListItemButton><Delete/> Delete</ListItemButton>
              </>
          }
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
        <div className='header-color' onClick={toggleDrawer('bottom', true)}><MoreVert/></div>
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

export default WorkoutRoutineListDrawer;
