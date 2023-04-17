import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Log from './Login/Log.js';
import Dashboard from './components/Dashboard';
import AppointmentBooking from './components/AppointmentBooking';
import ProjectDetails from './components/ProjectDetails';
import ProjectsList from './components/ProjectsList';
import AboutUs from './components/About-us.js'
import AppBar from './components/AppBar.js'
import Maindashbord from './AdminVIew/Maindashbord.js'
import ProjectDetailss from './AdminVIew/Projectdetails';
import Appointment from './AdminVIew/AppointmentView.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = ({ email, password }) => {
    // Implement your login logic here
    // If the login is successful, set isLoggedIn to true
    console.log('Email:', email, 'Password:', password);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
            <Route path="/book-appointment" element={<AppointmentBooking />} />
            <Route path="/projects/:id" element={<ProjectsList />} />
            <Route path="/About-us" element={<AboutUs />} />
            {/* <Route path="/AdminView" element={<AppBar2 />} /> */}
            <Route path="/AdminView" element={<Maindashbord />} />
      
            <Route path="/AdminView/:clientName" element={<ProjectDetailss />} />
            <Route path="/AdminView/Appointment" element={<Appointment />} />
          </Routes>
        </Router>
      ) : (
        <Log onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
