import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, value, description, onClick }) => {
  return (
    <div className="dashboard-card" onClick={onClick}>
      <h3 className="card-title">{title}</h3>
      <p className="card-value">{value}</p>
      <p className="card-description">{description}</p>
      <button className="card-button" onClick={onClick}>
        Click to view details
      </button>
    </div>
  );
};

export default DashboardCard;
