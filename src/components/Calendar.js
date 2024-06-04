import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import Day from './Day';
import '../styles.css';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('day'); // 'day', 'month', 'year'

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePreviousMonth = () => {
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleMonthClick = () => {
    setView('month');
  };

  const handleYearClick = () => {
    setView('year');
  };

  const handleSelectMonth = (month) => {
    setDate(new Date(date.getFullYear(), month, 1));
    setView('day');
  };

  const handleSelectYear = (year) => {
    setDate(new Date(year, date.getMonth(), 1));
    setView('day');
  };

  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInCurrentMonth = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const days = [];
  
  // Previous month's days
  const previousMonthDays = daysInMonth(year, month - 1);
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: previousMonthDays - i, currentMonth: false });
  }
  
  // Current month's days
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    days.push({ day: i, currentMonth: true });
  }
  
  // Next month's days
  const totalDays = firstDay + daysInCurrentMonth;
  const nextMonthDays = 42 - totalDays; // 42 to fill 6 rows of 7 days
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push({ day: i, currentMonth: false });
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const renderDayView = () => (
    <>
      <div className="header">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      {weeks.map((week, index) => (
        <div key={index} className="week">
          {week.map(({ day, currentMonth }, idx) => (
            <Day key={idx} day={day} currentMonth={currentMonth} />
          ))}
        </div>
      ))}
    </>
  );

  const renderMonthView = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return (
      <div className="month-view">
        {months.map((month, idx) => (
          <div key={idx} className="month" onClick={() => handleSelectMonth(idx)}>
            {month}
          </div>
        ))}
      </div>
    );
  };

  const renderYearView = () => {
    const startYear = Math.floor(year / 10) * 10;
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push(startYear + i);
    }
    return (
      <div className="year-view">
        {years.map((yr, idx) => (
          <div key={idx} className="year" onClick={() => handleSelectYear(yr)}>
            {yr}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar">
      <CalendarHeader
        year={year}
        month={month}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onMonthClick={handleMonthClick}
        onYearClick={handleYearClick}
      />
      {view === 'day' && renderDayView()}
      {view === 'month' && renderMonthView()}
      {view === 'year' && renderYearView()}
    </div>
  );
};

export default Calendar;
