import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import {Menu} from "@mui/icons-material";
import {SwipeableDrawer} from "@mui/material";
import "../WorkoutListDrawerComponent/WorkoutListDrawerComponent.scss"
import {Link} from "react-router-dom";

type WorkoutListDrawerProps = {
  children: React.ReactNode;
}

const WorkoutListDrawerComponent = (props: WorkoutListDrawerProps) => {
  type Anchor = 'left';
  const [state, setState] = React.useState({
    left: false,
  });

  const list = (anchor: Anchor) => (
      <Box
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItemButton><Link to='/exercises'>Edit Exercises</Link></ListItemButton>
          <ListItemButton><Link to='/categories'>Edit Categories</Link></ListItemButton>
          <ListItemButton>Upgrade</ListItemButton>
          <ListItemButton>Account</ListItemButton>
          <ListItemButton>Send Feedback</ListItemButton>
          <ListItemButton>Help and Support</ListItemButton>
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
      <React.Fragment key={'left'}>
        <div className='menu-button header-color' onClick={toggleDrawer('left', true)}><Menu/></div>
        <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
        >
          {list('left')}
        </SwipeableDrawer>
      </React.Fragment>
  )
}

export { WorkoutListDrawerComponent };
