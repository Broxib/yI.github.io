import React, { useState } from 'react';

const ProjectDetails = ({ project }) => {
  const [newService, setNewService] = useState({ name: '', price: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewService((prevService) => ({ ...prevService, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the new service to the project's services array
    const updatedProject = {
      ...project,
      services: [...project.services, newService],
    };
    // Replace the old project with the updated project in the projects array
    // (this assumes that the projects array is stored in a parent component's state)
    // You could also make an API request to update the project on the server
    updateProject(updatedProject);
    // Clear the form input fields
    setNewService({ name: '', price: '' });
  };

  const updateProject = (updatedProject) => {
    // This function should update the projects array in the parent component's state
    // (you could pass it down as a prop)
    // For this example, we'll just console.log the updated project
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
