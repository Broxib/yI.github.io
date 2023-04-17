import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import './AppBar.css';

const AppBar = ({ username }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <header className="app-bar">
      <div className="app-bar-title">
        <h1>Conseil Guest Plus</h1>
      </div>
      <nav className="app-bar-nav">
        <NavLink to="/" activeClassName="active" exact>
          Dashboard
        </NavLink>
        <NavLink to="/book-appointment" activeClassName="active">
          Book Appointment
        </NavLink>
        <NavLink to="/about-us" activeClassName="active">
          About Us
        </NavLink>
        <div>
          <NavLink to="/manageaccount" activeClassName="active">
            Welcome, {username}!
          </NavLink>
          <NavLink to="/" onClick={handleLogout}>
            Logout
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
