import "../ExerciseDrawerComponent/ExerciseDrawerComponent.scss"
import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import {Edit, Delete, MoreVert, MoveUp, ChangeCircle, History, BarChart, Star, Settings} from "@mui/icons-material";
import {SwipeableDrawer} from "@mui/material";

type ExerciseDrawerProps = {
  children: React.ReactNode;
}

const ExerciseDrawerComponent = (props: ExerciseDrawerProps) => {
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
          <ListItemButton><Edit/> Edit Note</ListItemButton>
          <ListItemButton><MoveUp/> Reorder</ListItemButton>
          <ListItemButton><ChangeCircle/> Replace</ListItemButton>
          <ListItemButton><Delete/> Delete</ListItemButton>
          <ListItemButton><History/> History</ListItemButton>
          <ListItemButton><BarChart/> Charts</ListItemButton>
          <ListItemButton><Star/> Personal Records</ListItemButton>
          <ListItemButton><Settings/> Edit Exercise</ListItemButton>
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

export { ExerciseDrawerComponent };
