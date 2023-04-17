import React, { useState } from 'react';

const ProjectDetails = ({ project }) => {
  const [newService, setNewService] = useState({ name: '', price: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewService((prevService) => ({ ...prevService, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const updatedProject = {
      ...project,
      services: [...project.services, newService],
    };
    updateProject(updatedProject);

    setNewService({ name: '', price: '' });
  };

  const updateProject = (updatedProject) => {

    console.log(updatedProject);
  };

  return (
    <div className="project-details-container">
      <h2>{project.name}</h2>
      <p>Owner: {project.owner}</p>
      <p>Total budget: {project.budget}</p>
      <ul>
        {project.services.map((service, index) => (
          <li key={index}>
            {service.name} - ${service.price}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Service name:
          <input
            type="text"
            name="name"
            value={newService.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Service price:
          <input
            type="number"
            name="price"
            value={newService.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add service</button>
      </form>
    </div>
  );
};

export default ProjectDetails;
