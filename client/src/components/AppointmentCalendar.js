import React, { useState, useEffect } from "react";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import "./AppointmentCalendar.css";
import axios from "axios";

const AppointmentCalendar = ({ onTimeSlotSelected }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get("https://us-central1-gatewayfunc.cloudfunctions.net/app/api/timeSlots");
        setTimeSlots(response.data);
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    };

    fetchTimeSlots();
  }, []);

  const renderDaysOfWeek = () => {
    const daysOfWeek = [];
    const start = startOfWeek(selectedDate);
    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(
        <div className="day-of-week" key={i}>
          {format(addDays(start, i), "EEE")}
        </div>
      );
    }
    return daysOfWeek;
  };

  const renderTimeSlots = () => {
    return timeSlots.map((timeSlot, index) => (
      <button
        className="time-slot"
        key={index}
        onClick={() => onTimeSlotSelected(timeSlot)}
      >
        {timeSlot}
      </button>
    ));
  };

  return (
    <div className="appointment-calendar">
      {/* <div className="days-of-week">{renderDaysOfWeek()}</div> */}
      <div className="time-slots">{renderTimeSlots()}</div>
    </div>
  );
};

export default AppointmentCalendar;
