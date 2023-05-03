import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Log.css'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const Log = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userType = await onLogin({ email, password });
    if (userType === 'client') {
      navigate('/');
    } else if (userType === 'employee') {
      navigate('/AdminView');
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

// Log.propTypes = {
//   onLogin: PropTypes.func.isRequired,
//   onCreateAccount: PropTypes.func.isRequired,
// };

export default Log;
