import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, value, description }) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-content">
        <h3>{title}</h3>
        <h2>{value}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
