import React, { useState } from 'react';
import './components.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const addProject = () => {
    const newProject = {
      id: new Date().getTime(),
      name: 'New Project',
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div>
      <h2>Manage Projects</h2>
      <button onClick={addProject}>Add a project</button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
