import Log from './Login/Log.js'
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import AppointmentBooking from './components/AppointmentBooking';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = ({ email, password }) => {
    // Implement your login logic here
    // If the login is successful, set isLoggedIn to true
    console.log('Email:', email, 'Password:', password);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/book-appointment" element={<AppointmentBooking />} />
          </Routes>
        </Router>
      ) : (
        <Log onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
