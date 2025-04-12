// src/components/SchedulerCalendar.jsx
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable, drag & drop

const SchedulerCalendar = () => {
  const [events, setEvents] = useState([
    { title: 'Team Meeting', date: '2025-04-15' },
    { title: 'Assignment Submission', date: '2025-04-17' },
  ]);

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Enter event title:');
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      calendarApi.addEvent(newEvent);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Delete event "${clickInfo.event.title}"?`)) {
      clickInfo.event.remove();
    }
  };

  return (
    <div className="calendar-container shadow-sm p-3 bg-white rounded">
      <h5 className="mb-3">📅 Your Scheduler</h5>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        selectable={true}
        editable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default SchedulerCalendar;
