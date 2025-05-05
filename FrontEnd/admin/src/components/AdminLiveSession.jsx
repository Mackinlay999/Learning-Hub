import { useEffect, useState } from "react";
import axios from "./axios";
import "../style/AdminLiveSession.css";
const AdminLiveSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ title: "", platform: "Zoom", date: "", time: "", attendees: 0 });
  const [editSession, setEditSession] = useState(null);

  // 🔁 Fetch all sessions on mount
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get(`/getAllSessions`);
      setSessions(res.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  // ✅ Add a new session
  const addSession = async () => {
    if (!newSession.title || !newSession.date || !newSession.time) return;
    try {
      await axios.post(`/createSession`, newSession);
      fetchSessions();
      setNewSession({ title: "", platform: "Zoom", date: "", time: "", attendees: 0 });
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  // ❌ Delete session
  const deleteSession = async (id) => {
    try {
      await axios.delete(`/deleteSession/${id}`);
      fetchSessions();
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  // ✏️ Start editing
  const startEdit = (session) => {
    setEditSession({ ...session });
  };

  // 💾 Save edited session
  const saveEdit = async () => {
    try {
      await axios.put(`/updateSession/${editSession._id}`, editSession);
      fetchSessions();
      setEditSession(null);
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  // 🧠 Input handlers
  const handleInputChange = (e) => {
    setNewSession({ ...newSession, [e.target.name]: e.target.value });
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
            <tr key={session._id}>
              <td>
                {editSession && editSession._id === session._id ? (
                  <input type="text" value={editSession.title} onChange={(e) => setEditSession({ ...editSession, title: e.target.value })} />
                ) : (
                  session.title
                )}
              </td>
              <td>
                {editSession && editSession._id === session._id ? (
                  <select value={editSession.platform} onChange={(e) => setEditSession({ ...editSession, platform: e.target.value })}>
                    <option value="Zoom">Zoom</option>
                    <option value="MS Teams">MS Teams</option>
                  </select>
                ) : (
                  session.platform
                )}
              </td>
              <td>
                {editSession && editSession._id === session._id ? (
                  <input type="date" value={editSession.date} onChange={(e) => setEditSession({ ...editSession, date: e.target.value })} />
                ) : (
                  session.date
                )}
              </td>
              <td>
                {editSession && editSession._id === session._id ? (
                  <input type="time" value={editSession.time} onChange={(e) => setEditSession({ ...editSession, time: e.target.value })} />
                ) : (
                  session.time
                )}
              </td>
              <td>
                {editSession && editSession._id === session._id ? (
                  <input type="number" value={editSession.attendees} onChange={(e) => setEditSession({ ...editSession, attendees: e.target.value })} />
                ) : (
                  session.attendees
                )}
              </td>
              <td>
                {editSession && editSession._id === session._id ? (
                  <button className="save" onClick={saveEdit}>Save</button>
                ) : (
                  <>
                    <button className="edit" onClick={() => startEdit(session)}>Edit</button>
                    <button className="delete" onClick={() => deleteSession(session._id)}>Delete</button>
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

export default AdminLiveSessions;
