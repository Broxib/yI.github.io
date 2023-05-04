import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AppBar.css";



const AppBar = ({ username }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search text:", searchText);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <header className="app-bar">
      <div className="app-bar-title">
        <h1>Conseil Guest Plus</h1>
      </div>
      <nav className="app-bar-nav">
        <NavLink to="/about-us" activeClassName="active">
          About Us
        </NavLink>
        <NavLink to="/AdminView/Appointment" activeClassName="active">
          Appointments
        </NavLink>
      </nav>
      <div className="app-bar-dropdown-search">
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="app-bar-dropdown"
        >
          <option value="option1">Clinet Name</option>
          <option value="option2">Service Name</option>
          <option value="option3">Project Name</option>
        </select>
        <form onSubmit={handleSearchSubmit} className="app-bar-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {/* <div className="app-bar-user"> */}
      <nav className="app-bar-nav">
        <NavLink to="/manageaccount" activeClassName="active">
          Welcome, {username}!
        </NavLink>
        <button
          onClick={() => {
            // Clear user data here...
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userType");

            // Then navigate to login page
            navigate("/login");
          }}
        >
          Logout
        </button>
      </nav>

      {/* </div> */}
    </header>
  );
};

export default AppBar;
