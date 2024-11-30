import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarDay } from '../types';
import { isToday } from '../utils/dateUtils';
import CountdownTimer from './CountdownTimer';

interface CalendarProps {
  currentDay?: CalendarDay;
  onPrevDay: () => void;
  onNextDay: () => void;
  loading?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ 
  currentDay, 
  onPrevDay, 
  onNextDay,
  loading = false 
}) => {
  if (loading || !currentDay) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  const canGoNext = currentDay.date <= new Date();
  
  return (
    <div className="fixed inset-0 bg-black">
      <div className="relative h-full">
        <img
          src={currentDay.imageUrl}
          alt="Daily"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60">
          {/* Header */}
          <div className="absolute top-6 left-0 right-0 text-white text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-2">
              {currentDay.date.toLocaleDateString('ja-JP', {
                month: 'long',
                day: 'numeric'
              })}
            </h2>
            <p className="text-xl md:text-2xl">
              {currentDay.date.toLocaleDateString('ja-JP', { weekday: 'long' })}
            </p>
            {isToday(currentDay.date) && (
              <span className="inline-block mt-2 px-4 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                Today
              </span>
            )}
          </div>

          {/* Message - Moved higher up */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-white text-center px-6">
            <p className="text-xl md:text-3xl font-medium px-6 py-3 bg-black/30 rounded-lg backdrop-blur-sm inline-block">
              {currentDay.message}
            </p>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-6 left-0 right-0 px-6 flex items-center justify-between">
            <button
              onClick={onPrevDay}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            
            <button
              onClick={onNextDay}
              disabled={!canGoNext}
              className={`p-3 rounded-full backdrop-blur-sm transition-colors ${
                canGoNext 
                  ? 'bg-white/10 hover:bg-white/20' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      <CountdownTimer />
    </div>
  );
};

export default Calendar;