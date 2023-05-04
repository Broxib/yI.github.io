import React, { useState } from 'react';
import './Appointment.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppointmentView = () => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const navigate = useNavigate();

  const handleDateChange = (event) => {
    setAppointmentDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setAppointmentTime(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:1000/api/appointments', {
        date: appointmentDate,
        time: appointmentTime,
      });
      console.log(response.data);
      navigate('/AdminView', { state: { appointmentSubmitted: true } });

    } catch (error) {
      console.error(error);
    }
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
