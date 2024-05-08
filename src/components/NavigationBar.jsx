import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from './nav_home_icon.svg';
import { ReactComponent as CourseIcon } from './nav_course_icon.svg';
import { ReactComponent as MapIcon } from './nav_map_icon.svg';
import { ReactComponent as MyIcon } from './nav_my_icon.svg';
import './NavigationBar.css';

function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <NavLink to="/" exact className="nav-item" activeClassName="active">
        <HomeIcon className="nav-icon" alt="Home" />
        <div className="nav-dot"></div>
      </NavLink>
      <NavLink to="/community" className="nav-item" activeClassName="active">
        <CourseIcon className="nav-icon" alt="Community" />
        <div className="nav-dot"></div>
      </NavLink>
      <NavLink to="/map" className="nav-item" activeClassName="active">
        <MapIcon className="nav-icon" alt="Map" />
        <div className="nav-dot"></div>
      </NavLink>
      <NavLink to="/mypage" className="nav-item" activeClassName="active">
        <MyIcon className="nav-icon" alt="My Page" />
        <div className="nav-dot"></div>
      </NavLink>
    </nav>
  );
}

export default NavigationBar;
