import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Log from './Login/Log.js';
import Dashboard from './components/Dashboard';
import AppointmentBooking from './components/AppointmentBooking';
import ProjectsList from './components/ProjectsList';
import AboutUs from './components/About-us.js';
import CreateAccount from './Account/CreateAccount.js';
import ManageAccount from './Account/ManageAccount.js';
import Maindashbord from './AdminVIew/Maindashbord.js'
import ProjectDetailss from './AdminVIew/Projectdetails';
import Appointment from './AdminVIew/AppointmentView.js';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserType = localStorage.getItem('userType');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserType(userData.userType);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userData.userType);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userType');
    }
  }, [isLoggedIn]);

  return (
    <div className="App">

      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/book-appointment" element={<AppointmentBooking />} />
              <Route path="/projects/:id" element={<ProjectsList />} />
              <Route path="/About-us" element={<AboutUs />} />
              <Route path="/ManageAccount" element={<ManageAccount />} />
              <Route path="/AdminView" element={<Maindashbord />} />
              <Route path="/AdminView/:clientName" element={<ProjectDetailss />} />
            <Route path="/AdminView/Appointment" element={<Appointment />} />

            </>
          ) : (
            <>
              <Route path="/login" element={<Log onLogin={handleLogin}/>} />
              <Route path="/account" element={<CreateAccount />} />
            </>
          )}
        </Routes>
      </Router>

    </div>
  );
};

export default App;