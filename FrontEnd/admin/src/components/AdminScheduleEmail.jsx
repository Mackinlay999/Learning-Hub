import React, { useState } from 'react';
import  "../style/AdminScheduleEmail.css"

const AdminScheduleEmail = () => {
  const [schedule, setSchedule] = useState([]);
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!email || !time) {
      alert('Please fill in both fields');
      return;
    }

    const newItem = { email, time };

    if (editIndex !== null) {
      const updated = [...schedule];
      updated[editIndex] = newItem;
      setSchedule(updated);
      setEditIndex(null);
    } else {
      setSchedule([...schedule, newItem]);
    }

    setEmail('');
    setTime('');
  };

  const handleEdit = (index) => {
    setEmail(schedule[index].email);
    setTime(schedule[index].time);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = schedule.filter((_, i) => i !== index);
    setSchedule(updated);
    if (editIndex === index) {
      setEmail('');
      setTime('');
      setEditIndex(null);
    }
  };

  return (
    <div className="schedule-card">
      <h2 className="schedule-title">📅 Schedule Email</h2>
      <div className="schedule-form-group">
        <input
          className="schedule-input"
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="schedule-input"
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button className="schedule-button" onClick={handleAddOrUpdate}>
          {editIndex !== null ? 'Update' : 'Schedule'}
        </button>
      </div>

      <ul className="schedule-list">
        {schedule.map((item, idx) => (
          <li className="schedule-item" key={idx}>
            <span className="schedule-info">{item.email} @ {item.time}</span>
            <button className="schedule-edit" onClick={() => handleEdit(idx)}>✏️</button>
            <button className="schedule-delete" onClick={() => handleDelete(idx)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminScheduleEmail;
