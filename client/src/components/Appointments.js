import React, { useState } from 'react';
import './components.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const bookAppointment = () => {
    const newAppointment = {
      id: new Date().getTime(),
      date: new Date(),
    };
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <div>
      <h2>Manage Appointments</h2>
      <button onClick={bookAppointment}>Book an appointment</button>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>{appointment.date.toString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
