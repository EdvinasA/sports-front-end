import React from "react";
import {MoreVert, ContentCopy, Delete} from "@mui/icons-material";
import {SwipeableDrawer} from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import "../ExerciseSetsDrawerComponent/ExerciseSetsDrawerComponent.scss"

export type DrawerProps = {
  exerciseId: number;
  setId: number;
  deleteSet: (workoutId: number, setId: number) => void;
  children: React.ReactNode;
}

const ExerciseSetsDrawerComponent = (props: DrawerProps) => {
  type Anchor = 'bottom';
  const [state, setState] = React.useState({
    bottom: false,
  });

  const handleDeleteSet = (exerciseId: number, setId: number) => {
    props.deleteSet(exerciseId, setId);
  }

  const list = (anchor: Anchor, exerciseId: number, setId: number) => (
      <Box
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItemButton>Normal</ListItemButton>
          <ListItemButton>Warm up</ListItemButton>
          <ListItemButton>Drop set</ListItemButton>
          <ListItemButton><ContentCopy/> Copy set</ListItemButton>
          <ListItemButton onClick={() => handleDeleteSet(exerciseId, setId)}><Delete/> Delete</ListItemButton>
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
          {list('bottom', props.exerciseId, props.setId)}
        </SwipeableDrawer>
      </React.Fragment>
  )
}

export { ExerciseSetsDrawerComponent };
