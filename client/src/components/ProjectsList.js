import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectsList.css';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


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
      files: [],
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
      files: [],
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
      files: [],
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [showBookAppointmentButton, setShowBookAppointmentButton] = useState(false);
  const renderFilePreview = (file, index) => {
    if (file.file.type.startsWith('image/')) {
      return (
        <div key={index} className="file-preview">
          <img src={file.content} alt={file.file.name} />
          <button onClick={() => removeFile(index)}>Delete</button>
        </div>
      );
    } else if (file.file.type === 'application/pdf') {
      return (
        <div key={index} className="file-preview">
          <Document file={file.content}>
            <Page pageNumber={1} height={150} />
          </Document>
          <button onClick={() => removeFile(index)}>Delete</button>
        </div>
      );
    } else {
      return (
        <div key={index} className="file-preview">
          <p>{file.file.name}</p>
          <button onClick={() => removeFile(index)}>Delete</button>
        </div>
      );
    }
  };
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

 
  const handleBookAppointment = () => {
    navigate('/book-appointment');
    // Once the appointment is booked, you can navigate back to the ProjectsList using the navigate function
    navigate('/add-service');
  };

  const handleFileChange = (e) => {
    const newFiles = [...e.target.files];
    newFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFiles((prevFiles) => [
            ...prevFiles,
            { file, content: event.target.result },
          ]);
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        const fileUrl = URL.createObjectURL(file);
        setFiles((prevFiles) => [...prevFiles, { file, content: fileUrl }]);
      } else {
        setFiles((prevFiles) => [...prevFiles, { file }]);
      }
      if (newFiles.length > 0) {
        setShowBookAppointmentButton(true);
      }
    });

    // update project state with new files array
    const newProjects = projects.map((project) => {
      if (project.id.toString() === id) {
        return {
          ...project,
          files: [...project.files, ...newFiles],
        };
      }
      return project;
    });
    setProjects(newProjects);
  };
  const navigateToBookAppointment = () => {
    setShowBookAppointmentButton(false);
    navigate('/book-appointment');
  };

  const navigateToDashboard = () => {
    navigate('/');
  };
  const removeFile = (index) => {
    if (files[index].file.type === "application/pdf") {
      URL.revokeObjectURL(files[index].content);
    }
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
              <div>
                <label>
                  Upload documents for {selectedService.name}:
                  <input type="file" multiple onChange={handleFileChange} />
                </label>
                {showBookAppointmentButton && (
                  <button onClick={navigateToBookAppointment}>
                    Book an Appointment
                  </button>
                )}
                <div className="file-preview-container">
                {files.map((file, index) => renderFilePreview(file, index))}
                </div>
              </div>
            )}
            {selectedService && (
              <p>
                Price: ${selectedService.price}
              </p>
            )}
      

            {/* ... project display ... */}
            
          </div>
          <div>

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
