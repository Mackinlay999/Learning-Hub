import React, { useState } from "react";
import "../style/AttendanceProgressTracking.css";

const AttendanceProgressTracking = () => {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState({
    studentName: "",
    attendanceMethod: "Login",
    progress: "",
    certificationIssued: "No",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setRecords(records.map((r) => (r.id === editingId ? { ...record, id: editingId } : r)));
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newRecord = { ...record, id: Date.now() };
      setRecords([...records, newRecord]);
    }
    setRecord({
      studentName: "",
      attendanceMethod: "Login",
      progress: "",
      certificationIssued: "No",
    });
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const editRecord = (r) => {
    setRecord(r);
    setIsEditing(true);
    setEditingId(r.id);
  };

  return (
    <div className="APT-main">
      <h1 className="APT-title">Attendance & Progress Tracking</h1>
      <p className="APT-subtitle">
        Track attendance, course progress & certifications.
      </p>

      <form className="APT-form" onSubmit={handleSubmit}>
        <input
          name="studentName"
          placeholder="Student Name"
          value={record.studentName}
          onChange={handleChange}
          required
        />
        <select
          name="attendanceMethod"
          value={record.attendanceMethod}
          onChange={handleChange}
        >
          <option value="Login">Login</option>
          <option value="Biometric">Biometric</option>
          <option value="Manual">Manual</option>
        </select>
        <input
          name="progress"
          type="number"
          placeholder="Progress (%)"
          min="0"
          max="100"
          value={record.progress}
          onChange={handleChange}
          required
        />
        <select
          name="certificationIssued"
          value={record.certificationIssued}
          onChange={handleChange}
        >
          <option value="NO" >Certificate</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        <button type="submit">{isEditing ? "Update" : "Add Record"}</button>
      </form>

      <div className="APT-list">
        <h2 className="APT-section-title">Student Records</h2>
        {records.length === 0 ? (
          <p className="APT-empty">No records found.</p>
        ) : (
          <table className="APT-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Attendance Method</th>
                <th>Progress</th>
                <th>Certification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{r.studentName}</td>
                  <td>{r.attendanceMethod}</td>
                  <td>{r.progress}%</td>
                  <td>{r.certificationIssued}</td>
                  <td>
                    <button onClick={() => editRecord(r)}>Edit</button>
                    <button onClick={() => deleteRecord(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AttendanceProgressTracking;
