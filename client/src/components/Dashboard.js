import React from 'react';
import AppBar from './AppBar';
import DashboardCard from './DashboardCard';
import './Dashboard.css';

const Dashboard = () => {
  // Replace these values with the actual data for the user
  const numberOfProjects = 5;
  const amountSpent = 2000;
  const nextAppointment = 'April 30, 2023';
  const username = 'John Doe';

  return (
    <>
      <AppBar username={username} />
      <div className="container">
        <h2>Dashboard</h2>
        <div className="dashboard-cards">
          <DashboardCard
            title="Number of Projects"
            value={numberOfProjects}
            description="Projects you are currently managing"
          />
          <DashboardCard
            title="Amount Spent"
            value={`$${amountSpent}`}
            description="Total amount spent on services"
          />
          <DashboardCard
            title="Next Appointment"
            value={nextAppointment}
            description="Your upcoming appointment"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
