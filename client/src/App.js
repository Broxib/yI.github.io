import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Log from './Login/Log.js';
import Dashboard from './components/Dashboard';
import AppointmentBooking from './components/AppointmentBooking';
import ProjectDetails from './components/ProjectDetails';
import ProjectsList from './components/ProjectsList';

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
          </Routes>
        </Router>
      ) : (
        <Log onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
