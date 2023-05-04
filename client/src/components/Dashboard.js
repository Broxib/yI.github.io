import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import AppBar from './AppBar';
import DashboardCard from './DashboardCard';
// import ProjectModal from './ProjectModal';
// import ProjectDetails from './ProjectDetails';
import './Dashboard.css';
import CreateProjectModal from './CreateProjectModal';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [Extrainfo, setExtrainfo] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:1000/api/projects/by-owner/${username}`);;
      setProjects(response.data);
      console.log('response', username);
      console.log('response', response);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // const fetchProjectsByUsername = async (username) => {
  //   try {
  //     const response = await axios.get(`http://localhost:1000/api/projects/by-owner/${username}`);
  //     setProjects(response.data);
  //   } catch (error) {
  //     console.error("Error fetching projects by username:", error);
  //   }
  // };

  useEffect(() => {
    fetchExtrainfo();
  }, []);

  const fetchExtrainfo = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/extrainfo');
      setExtrainfo(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleCreateProject = (project) => {
    setProjects([...projects, { ...project, id: projects.length + 1 }]);
  };

  const handleProjectCardClick = (project) => {
    setSelectedProject(project);
    navigate(`/projects/${project.id}`);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const numberOfProjects = projects.length;
  const amountSpent = Extrainfo.amountSpent;
  const nextAppointment = Extrainfo.nextAppointment;
  const username = 'Yassine Ibrok';

  const { state } = location;
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);

  useEffect(() => {
    if (state && state.appointmentSubmitted) {
      setAppointmentSubmitted(false);
      console.log('state', state);
    }
  }, [state]);

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
        {/* {selectedProject && (
          <ProjectDetails project={selectedProject} onClose={handleCloseModal} />

        )} */}
        
      </div>
      
    </>
  );
};


export default Dashboard;

