import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Log.css'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate
const Log = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        password,
      };
      const response = await axios.post("https://us-central1-gatewayfunc.cloudfunctions.net/app/api/login", userData);
      const { userType } = response.data;
  
      if (userType) {
        onLogin({ userType });
        
        if (userType === 'client') {
          navigate('/');
        } else if (userType === 'employee') {
          navigate('/AdminView');
        }
      }
    } catch (error) {
      console.error("Error login user:", error);
    }
  };




  const handleCreateAccount = () => { // Add this function to handle navigation
    navigate('/account');
  };
  
  return (
    <div className="login-form">
      <h2>Conseil Gest Plus Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleCreateAccount} className="create-account">Create Account</button>

    </div>
  );
};

Log.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
};

export default Log;
