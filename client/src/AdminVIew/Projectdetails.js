import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import './Projectdetails.css';

const ProjectDetails = () => {
  const { clientName } = useParams();
  const location = useLocation();
  const initialProjects = location.state.projects;
  const [projects, setProjects] = useState(initialProjects);


  const handleEditProject = (projectId) => {
    const project = projects.find((project) => project.id === projectId);
    const updatedName = prompt('Enter new project name:', project.name);

    if (updatedName) {
      setProjects(
        projects.map((project) =>
          project.id === projectId ? { ...project, name: updatedName } : project
        )
      );
    }
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
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
