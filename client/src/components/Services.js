import React, { useState } from 'react';
import './components.css';

const Services = () => {
  const [services, setServices] = useState([]);

  const addService = () => {
    const newService = {
      id: new Date().getTime(),
      name: 'New Service',
    };
    setServices([...services, newService]);
  };

  return (
    <div>
      <h2>Manage Services</h2>
      <button onClick={addService}>Add a service</button>
      <ul>
        {services.map((service) => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
