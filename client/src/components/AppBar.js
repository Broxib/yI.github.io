import React from 'react';
import { NavLink } from 'react-router-dom';
import './AppBar.css';

const AppBar = ({ username }) => {
  return (
    <header className="app-bar">
      <div className="app-bar-title">
        <h1>Conseil Gest Plus</h1>
      </div>
      <nav className="app-bar-nav">
        <NavLink to="/" activeClassName="active" exact>
          Dashboard
        </NavLink>
        <NavLink to="/book-appointment" activeClassName="active">
          Book Appointment
        </NavLink>
      </nav>
      <div className="app-bar-user">
        <p>Welcome, {username}!</p>
      </div>
    </header>
  );
};

export default AppBar;
