import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from './AppBar';
import DashboardCard from './DashboardCard';
import ProjectModal from './ProjectModal';
import ProjectDetails from './ProjectDetails';
import './Dashboard.css';
import CreateProjectModal from './CreateProjectModal';

const Dashboard = () => {
  // Replace these values with the actual data for the user
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Project 1',
      owner: 'John Doe',
      budget: 5000,
      services: [
        { name: 'Service 1', price: 100 },
        { name: 'Service 2', price: 200 },
        { name: 'Service 3', price: 300 },
      ],
    },
    {
      id: 2,
      name: 'Project 2',
      owner: 'Jane Smith',
      budget: 8000,
      services: [
        { name: 'Service 4', price: 400 },
        { name: 'Service 5', price: 500 },
        { name: 'Service 6', price: 600 },
      ],
    },
    {
      id: 3,
      name: 'Project 3',
      owner: 'Bob Johnson',
      budget: 12000,
      services: [
        { name: 'Service 7', price: 700 },
        { name: 'Service 8', price: 800 },
        { name: 'Service 9', price: 900 },
      ],
    },
  ]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  const numberOfProjects = projects.length;
  const amountSpent = 1200;
  const nextAppointment = 'April 30, 2023';
  const username = 'yassine ibork';
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const handleCreateProject = (project) => {
    setProjects([...projects, { ...project, id: projects.length + 1 }]);
  };

  const handleProjectCardClick = (project) => {
    setSelectedProject(project);
    navigate(`/projects/${project.id}`);
  };

  const handleCloseModal = () => {
    setShowProjectModal(false);
    setSelectedProject(null);
  };

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
            onClick={() => setShowProjectModal(true)}
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
        {showProjectModal && (
          <div className="project-list">
            <h3>
              Projects
              <button onClick={() => setShowCreateProjectModal(true)} className="create-project-button">
                Create New Project
              </button>
            </h3>
            {showCreateProjectModal && (
  <CreateProjectModal onCreate={handleCreateProject} onClose={() => setShowCreateProjectModal(false)} />
)}

            <div className="project-cards">
              {projects.map((project) => (
                <div key={project.id} className="project-card" onClick={() => handleProjectCardClick(project)}>
                  <h4 className="project-name">{project.name}</h4>
                  <p className="project-owner">Owner: {project.owner}</p>
                  <p className="project-budget">Budget: ${project.budget}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedProject && (
          <ProjectDetails project={selectedProject} onClose={handleCloseModal} />

        )}
      </div>
    </>
  );
};

export default Dashboard;
