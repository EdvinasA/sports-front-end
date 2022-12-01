import React, {FC} from 'react';
import './BottomMenuComponent.scss';
import {IconButton} from "@mui/material";
import {BarChart, Book, History} from "@mui/icons-material";
import {Outlet} from "react-router";

interface BottomMenuComponentProps {
}

const BottomMenuComponent: FC<BottomMenuComponentProps> = () => (
    <div>
      <Outlet />
      <div className='bottom-menu'>
        <div className='bottom-menu-button'>
          <IconButton>
            <History/>
          </IconButton>
          <div>Log</div>
        </div>
        <div className='bottom-menu-button'>
          <IconButton>
            <Book/>
          </IconButton>
          <div>Routines</div>
        </div>
        <div className='bottom-menu-button'>
          <IconButton>
            <BarChart/>
          </IconButton>
          <div>Statistics</div>
        </div>
      </div>
    </div>
);

export default BottomMenuComponent;
