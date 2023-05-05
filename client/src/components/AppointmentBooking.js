import React, { useState } from 'react';
import AppointmentCalendar from './AppointmentCalendar';
import { useNavigate } from 'react-router-dom';
import './AppointmentBooking.css';
import axios from 'axios';

const AppointmentBooking = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleTimeSlotSelected = (time) => {
    setSelectedTimeSlot(time);
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  const handleSubmitAppointment = async () => {
    try {
      await axios.post('https://us-central1-gatewayfunc.cloudfunctions.net/app/api/appointments', {
        timeSlot: selectedTimeSlot,
        details: appointmentDetails,
      });
      setSubmitted(true);
      navigate('/', { state: { appointmentSubmitted: true } }); // Pass appointmentSubmitted as a state parameter
    } catch (error) {
      console.error('Error submitting appointment:', error);
    }
  };
  


  return (
    <div className="appointment-booking">
      <h2>Book Appointment</h2>
      <AppointmentCalendar onTimeSlotSelected={handleTimeSlotSelected} />
      {selectedTimeSlot && !submitted && (
        <>
          <p className="selected-time-slot">Selected Time Slot: {selectedTimeSlot}</p>
          <textarea

            className="appointment-details"
            value={appointmentDetails}
            onChange={(e) => setAppointmentDetails(e.target.value)}
            placeholder="Please specify your appointment needs"
          />
          <button className="submit-appointment" onClick={handleSubmitAppointment}>
            Submit Appointment
          </button>
        </>
      )}
      {submitted && (
        <div className="congratulations-card">
          <h3>Congratulations!</h3>
          <p>Your appointment has been successfully booked.</p>
        
        </div>
      )}
      <button className="back-to-dashboard" onClick={handleBackToDashboard}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default AppointmentBooking;
