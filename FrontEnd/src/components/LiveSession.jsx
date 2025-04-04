import { useState } from "react";
import "../style/LiveSession.css"; // Import the CSS file

const LiveSessions = () => {
  const [sessions, setSessions] = useState([
    { id: 1, title: "React Advanced", platform: "Zoom", date: "2025-04-10", time: "10:00 AM", attendees: 50 },
    { id: 2, title: "Node.js API Design", platform: "MS Teams", date: "2025-04-12", time: "2:00 PM", attendees: 30 },
  ]);
  const [newSession, setNewSession] = useState({ title: "", platform: "Zoom", date: "", time: "", attendees: 0 });
  const [editSession, setEditSession] = useState(null);

  // Handle Input Change
  const handleInputChange = (e) => {
    setNewSession({ ...newSession, [e.target.name]: e.target.value });
  };

  // Add a New Session
  const addSession = () => {
    if (!newSession.title || !newSession.date || !newSession.time) return;
    setSessions([...sessions, { id: sessions.length + 1, ...newSession }]);
    setNewSession({ title: "", platform: "Zoom", date: "", time: "", attendees: 0 });
  };

  // Delete a Session
  const deleteSession = (id) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  // Edit a Session
  const startEdit = (session) => {
    setEditSession(session);
  };

  // Save Edited Session
  const saveEdit = () => {
    setSessions(sessions.map((s) => (s.id === editSession.id ? editSession : s)));
    setEditSession(null);
  };

  return (
    <div className="live-sessions">
      <h2 className="title">Live Sessions & Webinars</h2>

      {/* Add Session Form */}
      <div className="session-form">
        <input type="text" name="title" placeholder="Session Title" value={newSession.title} onChange={handleInputChange} />
        <select name="platform" value={newSession.platform} onChange={handleInputChange}>
          <option value="Zoom">Zoom</option>
          <option value="MS Teams">MS Teams</option>
        </select>
        <input type="date" name="date" value={newSession.date} onChange={handleInputChange} />
        <input type="time" name="time" value={newSession.time} onChange={handleInputChange} />
        <input type="number" name="attendees" placeholder="Expected Attendees" value={newSession.attendees} onChange={handleInputChange} />
        <button className="add-session" onClick={addSession}>Add Session</button>
      </div>

      {/* Sessions Table */}
      <table className="session-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Platform</th>
            <th>Date</th>
            <th>Time</th>
            <th>Attendees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td>{session.id}</td>
              <td>
                {editSession && editSession.id === session.id ? (
                  <input type="text" value={editSession.title} onChange={(e) => setEditSession({ ...editSession, title: e.target.value })} />
                ) : (
                  session.title
                )}
              </td>
              <td>
                {editSession && editSession.id === session.id ? (
                  <select value={editSession.platform} onChange={(e) => setEditSession({ ...editSession, platform: e.target.value })}>
                    <option value="Zoom">Zoom</option>
                    <option value="MS Teams">MS Teams</option>
                  </select>
                ) : (
                  session.platform
                )}
              </td>
              <td>
                {editSession && editSession.id === session.id ? (
                  <input type="date" value={editSession.date} onChange={(e) => setEditSession({ ...editSession, date: e.target.value })} />
                ) : (
                  session.date
                )}
              </td>
              <td>
                {editSession && editSession.id === session.id ? (
                  <input type="time" value={editSession.time} onChange={(e) => setEditSession({ ...editSession, time: e.target.value })} />
                ) : (
                  session.time
                )}
              </td>
              <td>
                {editSession && editSession.id === session.id ? (
                  <input type="number" value={editSession.attendees} onChange={(e) => setEditSession({ ...editSession, attendees: e.target.value })} />
                ) : (
                  session.attendees
                )}
              </td>
              <td>
                {editSession && editSession.id === session.id ? (
                  <button className="save" onClick={saveEdit}>Save</button>
                ) : (
                  <>
                    <button className="edit" onClick={() => startEdit(session)}>Edit</button>
                    <button className="delete" onClick={() => deleteSession(session.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveSessions;
