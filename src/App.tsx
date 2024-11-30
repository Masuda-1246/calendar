import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import { useCalendarData } from './hooks/useCalendarData';

function App() {
  const { days, loading, error } = useCalendarData();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (days.length > 0) {
      const today = new Date();
      const todayIndex = days.findIndex(day => 
        day.date.getDate() === today.getDate() &&
        day.date.getMonth() === today.getMonth() &&
        day.date.getFullYear() === today.getFullYear()
      );
      if (todayIndex !== -1) {
        setCurrentIndex(todayIndex);
      }
    }
  }, [days]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const handlePrevDay = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextDay = () => {
    const today = new Date();
    const currentDate = days[currentIndex]?.date;
    
    if (currentDate && 
        currentIndex < days.length - 1 && 
        days[currentIndex + 1].date <= today) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Calendar
      currentDay={days[currentIndex]}
      onPrevDay={handlePrevDay}
      onNextDay={handleNextDay}
      loading={loading}
    />
  );
}

export default App;