import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Log from './Login/Log.js';
import Dashboard from './components/Dashboard';
import AppointmentBooking from './components/AppointmentBooking';
// import ProjectDetails from './components/ProjectDetails';
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

  const defaultAccounts = [
    {
      email: 'client@example.com',
      password: 'client123',
      type: 'client',
    },
    {
      email: 'employee@example.com',
      password: 'employee123',
      type: 'employee',
    },
  ];

  const handleLogin = ({ email, password }) => {
    const account = defaultAccounts.find(
      (account) => account.email === email && account.password === password
    );
  
    if (account) {
      setIsLoggedIn(true);
      setUserType(account.type);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', account.type);
      return account.type;
    } else {
      console.log('Invalid email or password');
      return null;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
    }
  }, [isLoggedIn]);

  const handleCreateAccount = (userData) => {
    console.log('Account created:', userData);
  };

  return (
    <div className="App">

      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
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
              <Route path="/" element={<Log onLogin={handleLogin} />} />
              <Route path="/account" element={<CreateAccount />} />
            </>
          )}
        </Routes>
      </Router>

    </div>
  );
};

export default App;