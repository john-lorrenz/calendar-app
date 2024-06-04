import React from 'react';

const CalendarHeader = ({ year, month, onPreviousMonth, onNextMonth, onMonthClick, onYearClick }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="calendar-header">
      <button onClick={onPreviousMonth}>&lt;</button>
      <h2>
        <span onClick={onMonthClick}>{monthNames[month]}</span>
        {' '}
        <span onClick={onYearClick}>{year}</span>
      </h2>
      <button onClick={onNextMonth}>&gt;</button>
    </div>
  );
};

export default CalendarHeader;
