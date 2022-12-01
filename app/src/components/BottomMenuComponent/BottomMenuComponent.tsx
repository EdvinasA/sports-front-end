import React from 'react';
import './BottomMenuComponent.scss';
import {IconButton} from "@mui/material";
import {BarChart, Book, History} from "@mui/icons-material";
import {Outlet} from "react-router";
import {Link, NavLink} from "react-router-dom";
import 'typeface-roboto';
import {useCurrentPath} from "../../services/FormatterService";

interface BottomMenuComponentProps {
}

const BottomMenuComponent = (props: BottomMenuComponentProps) => {
  const useActive = (): boolean => {
    switch (useCurrentPath()) {
      case '/':
      case '/routines':
      case '/statistics':
        return true;
      default:
        return false
    }
  }
  const [mainPage, setMainPage] = React.useState<boolean>(useActive());
  const [routinesPage, setRoutinesPage] = React.useState<boolean>(useActive());
  const [statisticsPage, setStatisticsPage] = React.useState<boolean>(useActive());

  const active: string = 'active-selection';

  const handleActiveMainPageChange = () => {
    setMainPage(true);
    setRoutinesPage(false);
    setStatisticsPage(false);
  }

  const handleActiveRoutinesPageChange = () => {
    setMainPage(false);
    setRoutinesPage(true);
    setStatisticsPage(false);
  }

  const handleActiveStatisticsPageChange = () => {
    setMainPage(false);
    setRoutinesPage(false);
    setStatisticsPage(true);
  }

  return (
      <div>
        <Outlet/>
        <div className='bottom-menu'>
          <NavLink to='/'>
            <div className={mainPage ? `bottom-menu-button ${active}` : 'bottom-menu-button'} onClick={handleActiveMainPageChange}>
              <IconButton>
                <History/>
              </IconButton>
              <div>Log</div>
            </div>
          </NavLink>
          <Link to='/routines'>
            <div className={routinesPage ? `bottom-menu-button ${active}` : 'bottom-menu-button'} onClick={handleActiveRoutinesPageChange}>
              <IconButton>
                <Book/>
              </IconButton>
              <div>Routines</div>
            </div>
          </Link>
          <Link to='/statistics'>
            <div className={statisticsPage ? `bottom-menu-button ${active}` : 'bottom-menu-button'} onClick={handleActiveStatisticsPageChange}>
              <IconButton>
                <BarChart/>
              </IconButton>
              <div>Statistics</div>
            </div>
          </Link>
        </div>
      </div>
  )
}

export default BottomMenuComponent;
