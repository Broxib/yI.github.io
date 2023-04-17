import React, { useState } from 'react';
import './Appointment.css';
const AppointmentView = () => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleDateChange = (event) => {
    setAppointmentDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setAppointmentTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Appointment date:', appointmentDate);
    console.log('Appointment time:', appointmentTime);
  
  };

  return (
    <div>
      <h2>Set an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="appointment-date">Date:</label>
        <input
          type="date"
          id="appointment-date"
          value={appointmentDate}
          onChange={handleDateChange}
        />
        <br />
        <label htmlFor="appointment-time">Time:</label>
        <input
          type="time"
          id="appointment-time"
          value={appointmentTime}
          onChange={handleTimeChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AppointmentView;
