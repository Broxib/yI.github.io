import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Projectdetails.css';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { clientName } = useParams();
  const location = useLocation();
  const initialProjects = location.state.projects;
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`https://us-central1-gatewayfunc.cloudfunctions.net/app/api/projects/${clientName}`);
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, [clientName]);


  const handleEditProject = async (projectId) => {
    const project = projects.find((project) => project.id === projectId);
    const updatedName = prompt('Enter new project name:', project.name);
  
    if (updatedName) {
      try {
        const response = await axios.put(`https://us-central1-gatewayfunc.cloudfunctions.net/app/api/projects/${projectId}`, { clientName,name: updatedName });
        setProjects(response.data);
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }
  };
  
  const handleDeleteProject = async (projectId) => {
    try {
      const response = await axios.delete(`https://us-central1-gatewayfunc.cloudfunctions.net/app/api/projects/${projectId}`, { clientName });
      setProjects(response.data);
      navigate('/AdminView');

    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="client-details">
      <h2>{clientName}</h2>
      {projects.map((project) => (
        <div key={project.id} className="project">
          <h3>
            {project.name}{' '}
            <button onClick={() => handleEditProject(project.id)}>Edit</button>{' '}
            <button onClick={() => handleDeleteProject(project.id)}>
              Delete
            </button>
          </h3>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Appointment</th>
                <th>Employee</th>
              </tr>
            </thead>
            <tbody>
              {project.services.map((service, index) => (
                <tr key={index}>
                  <td>{service.name}</td>
                  <td>{service.appointment}</td>
                  <td>{service.employee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ProjectDetails;
