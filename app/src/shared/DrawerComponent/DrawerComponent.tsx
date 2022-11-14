import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {IconButton, SwipeableDrawer} from "@mui/material";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function DrawerComponent() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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

            setState({ ...state, [anchor]: open });
          };

  const list = (anchor: Anchor) => (
      <Box
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {['Delete'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </Box>
  );

  return (
      <div>
            <React.Fragment key={'bottom'}>
              <IconButton onClick={toggleDrawer('bottom', true)}><MoreVertIcon /></IconButton>
              <SwipeableDrawer
                  anchor={'bottom'}
                  open={state['bottom']}
                  onClose={toggleDrawer('bottom', false)}
                  onOpen={toggleDrawer('bottom', true)}
              >
                {list('bottom')}
              </SwipeableDrawer>
            </React.Fragment>
      </div>
  );
}

