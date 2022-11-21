import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import {Repeat, Delete, FitnessCenter, MoreVert, MoveUp, Adjust, Share} from "@mui/icons-material";
import {SwipeableDrawer} from "@mui/material";
import "../WorkoutDrawerComponent/WorkoutDrawerComponent.scss";

type WorkoutDrawerProps = {
  children: React.ReactNode;
}

const WorkoutDrawerComponent = (props: WorkoutDrawerProps) => {
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
          <ListItemButton><MoveUp/> Reorder</ListItemButton>
          <ListItemButton><Adjust/> Targets</ListItemButton>
          <ListItemButton><Share/> Share</ListItemButton>
          <ListItemButton><Repeat/> Repeat Workout</ListItemButton>
          <ListItemButton><FitnessCenter/> Save as Routine</ListItemButton>
          <ListItemButton><Delete/> Delete</ListItemButton>
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

export { WorkoutDrawerComponent };
