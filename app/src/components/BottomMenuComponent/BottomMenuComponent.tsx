import React, {FC} from 'react';
import './BottomMenuComponent.scss';
import {IconButton} from "@mui/material";
import {BarChart, Book, History} from "@mui/icons-material";
import {Outlet} from "react-router";
import {Link} from "react-router-dom";
import 'typeface-roboto';

interface BottomMenuComponentProps {
}

const BottomMenuComponent: FC<BottomMenuComponentProps> = () => (
    <div>
      <Outlet/>
      <div className='bottom-menu'>
        <Link to='/'>
          <div className='bottom-menu-button'>
            <IconButton>
              <History/>
            </IconButton>
            <div>Log</div>
          </div>
        </Link>
        <Link to='/routines'>
          <div className='bottom-menu-button'>
            <IconButton>
              <Book/>
            </IconButton>
            <div>Routines</div>
          </div>
        </Link>
        <Link to='/statistics'>
          <div className='bottom-menu-button'>
            <IconButton>
              <BarChart/>
            </IconButton>
            <div>Statistics</div>
          </div>
        </Link>
      </div>
    </div>
);

export default BottomMenuComponent;
