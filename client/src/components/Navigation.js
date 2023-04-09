import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/book-appointment">Book Appointment</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
