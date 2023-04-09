import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek, addDays } from 'date-fns';
import './AppointmentCalendar.css';

const AppointmentCalendar = ({ onTimeSlotSelected }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderDaysOfWeek = () => {
    const daysOfWeek = [];
    const start = startOfWeek(selectedDate);
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(
        <div className="day-of-week" key={i}>
          {format(addDays(start, i), 'EEE')}
        </div>
      );
    }
    return daysOfWeek;
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    for (let i = 9; i < 18; i++) {
      const time = i < 10 ? `0${i}:00` : `${i}:00`;
      timeSlots.push(
        <button
          className="time-slot"
          key={i}
          onClick={() => onTimeSlotSelected(time)}
        >
          {time}
        </button>
      );
    }
    return timeSlots;
  };

  return (
    <div className="appointment-calendar">
      <div className="days-of-week">{renderDaysOfWeek()}</div>
      <div className="time-slots">{renderTimeSlots()}</div>
    </div>
  );
};

export default AppointmentCalendar;
