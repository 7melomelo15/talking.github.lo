'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const events = [
  { title: '予約済み: 面談A', location: 'Zoom', start: '08:00', end: '09:00', date: '2025-06-01', type: 'reserved' },
  { title: '対応可能', location: '', start: '09:00', end: '10:30', date: '2025-06-01', type: 'available' },
  { title: '予約済み: 企業説明会', location: 'Room 204', start: '11:00', end: '12:00', date: '2025-06-02', type: 'reserved' },
  { title: '対応可能', location: '', start: '13:00', end: '14:30', date: '2025-06-02', type: 'available' },
  { title: '予約済み: ミーティング', location: 'Meeting Room A', start: '10:00', end: '11:30', date: '2025-06-03', type: 'reserved' },
  { title: '対応可能', location: '', start: '14:00', end: '15:00', date: '2025-06-03', type: 'available' },
  { title: '予約済み: 講演会', location: 'Hall B', start: '09:30', end: '10:30', date: '2025-06-04', type: 'reserved' },
  { title: '対応可能', location: '', start: '11:00', end: '12:30', date: '2025-06-04', type: 'available' },
  { title: '予約済み: プレゼン指導', location: 'Online', start: '15:00', end: '16:00', date: '2025-06-05', type: 'reserved' },
  { title: '対応可能', location: '', start: '16:30', end: '18:00', date: '2025-06-05', type: 'available' },
  { title: '予約済み: 研修', location: 'Main Room', start: '08:00', end: '09:30', date: '2025-06-06', type: 'reserved' },
  { title: '対応可能', location: '', start: '10:00', end: '11:00', date: '2025-06-06', type: 'available' },
  { title: '対応可能', location: '', start: '09:00', end: '10:00', date: '2025-06-07', type: 'available' }
];

export default function ReservationPage() {
  const [view, setView] = useState<'day' | 'week'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 5, 1));
  const [isOnline, setIsOnline] = useState(true);

  const now = new Date();
  const isSameDay = selectedDate.toDateString() === now.toDateString();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowTop = (nowMinutes / 60) * 80;

  const getPositionStyle = (start: string, end: string) => {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    const startTime = startH + startM / 60;
    const endTime = endH + endM / 60;
    const top = (startTime - 0) * 80;
    const height = (endTime - startTime) * 80;
    return { top: `${top}px`, height: `${height}px`, left: '0%', width: '100%' };
  };

  const getColorStyle = (type: string) => {
    if (type === 'reserved') return 'bg-red-100/70 border-l-[5px] border-red-400';
    if (type === 'available') return 'bg-blue-100/70 border-l-[5px] border-blue-400';
    return 'bg-white/70 border-l-[5px] border-gray-400';
  };

  const renderWeekView = () => {
    const hours = Array.from({ length: 25 }, (_, i) => i);
    const weekDates = Array.from({ length: 7 }, (_, i) => new Date(2025, 5, 1 + i));
    return (
      <div className="overflow-hidden h-[calc(100vh-160px)] bg-[#1e293b] px-4 py-4">
        <div className="relative ml-[64px]">
          {isSameDay && (
            <div className="absolute left-0 w-full h-[2px] bg-green-400 z-50" style={{ top: `${nowTop}px` }} />
          )}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 border-r border-white/20"
              style={{ left: `${(100 / 7) * (i + 1)}%` }}
            />
          ))}
          {hours.map((hour) => (
            <div key={hour} className="relative h-[80px] border-t border-white/10">
              <div className="absolute right-full pr-2 text-white/60 text-sm font-medium w-16 text-right">{hour}:00</div>
              <div className="absolute top-1/2 left-0 w-full border-t border-white/5" />
            </div>
          ))}
          {weekDates.map((date, colIdx) => (
            <div key={colIdx} className="absolute top-0" style={{ left: `${(100 / 7) * colIdx}%`, width: '14.285%' }}>
              {events.filter(e => e.date === format(date, 'yyyy-MM-dd')).map((event, i) => (
                <div
                  key={i}
                  className={`absolute mx-1 px-3 py-2 rounded-xl text-sm text-black font-semibold shadow-md ${getColorStyle(event.type)}`}
                  style={getPositionStyle(event.start, event.end)}
                >
                  {event.title}
                  {event.location && <div className="text-xs text-gray-700">{event.location}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] min-h-screen text-white font-sans">
      <div className="flex justify-between items-center px-6 py-5">
        <div className="flex items-center gap-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={isOnline} onChange={() => setIsOnline(!isOnline)} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
          <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
        <div className="text-xl font-semibold opacity-90">{format(selectedDate, 'M月')}</div>
        <div className="text-3xl font-bold">＋</div>
      </div>
      <div className="grid grid-cols-7 text-center mb-4 ml-[64px] w-[calc(100%-64px)]">
        {daysOfWeek.map((day, i) => {
          const date = 1 + i;
          const currentDate = new Date(2025, 5, date);
          const selected = selectedDate.getDate() === date;
          return (
            <div key={day} onClick={() => setSelectedDate(currentDate)} className="cursor-pointer">
              <div className="text-base font-semibold opacity-90">{day}</div>
              <div
                className={`w-11 h-11 mx-auto mt-1 rounded-full text-lg font-bold flex items-center justify-center transition-all duration-200 ${
                  selected ? 'bg-green-500 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {date}
              </div>
            </div>
          );
        })}
      </div>
      {view === 'week' && renderWeekView()}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f172a]/70 to-transparent backdrop-blur-md flex justify-around py-5 text-xl font-semibold text-white">
        <button onClick={() => setView('day')} className={view === 'day' ? 'text-blue-300 underline underline-offset-4' : 'opacity-70'}>Day</button>
        <button onClick={() => setView('week')} className={view === 'week' ? 'text-blue-300 underline underline-offset-4' : 'opacity-70'}>Week</button>
      </div>
    </div>
  );
}
