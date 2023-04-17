import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./AppBar.css";

const AppBar = ({ username }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search text:", searchText); // Replace with your search logic
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
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
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
      <NavLink to="/manageaccount"  activeClassName="active">
          Welcome, {username}!
      </NavLink>
      </nav>
      
      {/* </div> */}
    </header>
  );
};

export default AppBar;