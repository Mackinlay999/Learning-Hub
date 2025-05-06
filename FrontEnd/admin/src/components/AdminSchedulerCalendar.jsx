import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable, drag & drop
import '../style/Adminscheduler.css'; // Custom styles for the calendar

const AdminSchedulerCalendar = () => {
  const [events, setEvents] = useState([]);
  
  // Fetch events from local storage on initial load
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
  }, []);
  
  // Persist events to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Handle event creation
  const handleDateSelect = (selectInfo) => {
    const title = prompt('Enter event title:');
    const description = prompt('Enter event description (optional):');
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        title,
        description,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } else {
      alert("Event title is required!");
    }
  };

  // Handle event click (deleting or editing)
  const handleEventClick = (clickInfo) => {
    const action = prompt(
      `Event "${clickInfo.event.title}"\n1. Delete\n2. Edit\n3. Cancel`
    );

    if (action === "1") {
      if (window.confirm(`Delete event "${clickInfo.event.title}"?`)) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.start !== clickInfo.event.start)
        );
        clickInfo.event.remove();
      }
    } else if (action === "2") {
      const newTitle = prompt('Enter new title:', clickInfo.event.title);
      const newDescription = prompt('Enter new description:', clickInfo.event.extendedProps.description);

      if (newTitle) {
        clickInfo.event.setProp('title', newTitle);
        clickInfo.event.setExtendedProps({ description: newDescription });
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.start === clickInfo.event.start
              ? { ...event, title: newTitle, description: newDescription }
              : event
          )
        );
      } else {
        alert("Event title is required for editing!");
      }
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

export default AdminSchedulerCalendar;
