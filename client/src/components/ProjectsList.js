import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectsList.css'
const availableServices = [
  { name: 'Service 1', price: 100 },
  { name: 'Service 2', price: 200 },
  { name: 'Service 3', price: 300 },
  { name: 'Service 4', price: 400 },
  { name: 'Service 5', price: 500 },
  { name: 'Service 6', price: 600 },
  { name: 'Service 7', price: 700 },
  { name: 'Service 8', price: 800 },
  { name: 'Service 9', price: 900 },
];

const ProjectsList = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Project 1',
      owner: 'John Doe',
      budget: 1000,
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
      budget: 2000,
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
      budget: 3000,
      services: [
        { name: 'Service 7', price: 700 },
        { name: 'Service 8', price: 800 },
        { name: 'Service 9', price: 900 },
      ],
    },
  ]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const project = projects.find((project) => project.id.toString() === id);
    setSelectedProject(project);
  }, [id, projects]);

  const handleAddService = () => {
    if (!selectedService) {
      alert('Please select a service to add.');
      return;
    }

    setSelectedProject((prevProject) => {
      return {
        ...prevProject,
        services: [...prevProject.services, selectedService],
      };
    });

    setSelectedService(null);
  };
  const navigateToDashboard = () => {
    navigate('/');
  };

  return (
    <div>
      {selectedProject ? (
        <div className="project-card">
          <h2>{selectedProject.name}</h2>
          <p>Owner: {selectedProject.owner}</p>
          <p>Total budget: {selectedProject.budget}</p>
          <ul>
            {selectedProject.services.map((service, index) => (
              <li key={index}>
                {service.name} - ${service.price}
              </li>
            ))}
          </ul>
          <div>
            <label>
              Select a service:
              <select
                value={selectedService ? selectedService.name : ''}
                onChange={(e) => {
                  const selected = availableServices.find((service) => service.name === e.target.value);
                  setSelectedService(selected);
                }}
              >
                <option value="">--Select a service--</option>
                {availableServices.map((service, index) => (
                  <option key={index} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>
            {selectedService && (
              <p>
                Price: ${selectedService.price}
              </p>
            )}
            <button onClick={handleAddService}>Add selected service</button>
          </div>
          <button className="back-button" onClick={navigateToDashboard}>
            Back to Dashboard
          </button>

        </div>
      ) : (
        <p>No project found.</p>
      )}
    </div>
  );
};

export default ProjectsList;
