import React from 'react';
import '../styles.css';

const Day = ({ day, currentMonth }) => {
  const isToday = day === new Date().getDate() && currentMonth;
  return (
    <div className={`day ${isToday ? 'today' : ''} ${currentMonth ? '' : 'not-current'}`}>
      {day}
    </div>
  );
};

export default Day;
