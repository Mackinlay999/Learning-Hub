import React, { useState } from "react";


const initialStudents = [
  { id: 1, name: "John Doe", attendance: "Present", progress: 80 },
  { id: 2, name: "Jane Smith", attendance: "Absent", progress: 60 },
  { id: 3, name: "Mark Wilson", attendance: "Late", progress: 50 },
];

const AttendanceTracking = () => {
  const [students, setStudents] = useState(initialStudents);
  const [newStudent, setNewStudent] = useState({ name: "", attendance: "Present", progress: 0 });
  const [editStudent, setEditStudent] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  // Add Student Attendance
  const addStudent = () => {
    if (!newStudent.name.trim()) return;
    setStudents([...students, { id: students.length + 1, ...newStudent }]);
    setNewStudent({ name: "", attendance: "Present", progress: 0 });
  };

  // Delete Attendance Record
  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  // Start Edit
  const startEdit = (student) => {
    setEditStudent(student);
  };

  // Save Edit
  const saveEdit = () => {
    setStudents(students.map((s) => (s.id === editStudent.id ? editStudent : s)));
    setEditStudent(null);
  };

  return (
    <div className="att-container">
      <h2 className="att-title">Attendance & Progress Tracking</h2>

      {/* Add Attendance Form */}
      <div className="att-form">
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
          placeholder="Enter student name"
        />
        <select name="attendance" value={newStudent.attendance} onChange={handleInputChange}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
        <input
          type="number"
          name="progress"
          value={newStudent.progress}
          onChange={handleInputChange}
          placeholder="Progress %"
        />
        <button onClick={addStudent}>Add Attendance</button>
      </div>

      {/* Attendance Table */}
      <table className="att-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Attendance</th>
            <th>Progress (%)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className={`att-row ${student.attendance.toLowerCase()}`}>
              <td>{student.id}</td>
              <td>
                {editStudent && editStudent.id === student.id ? (
                  <input
                    type="text"
                    value={editStudent.name}
                    onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {editStudent && editStudent.id === student.id ? (
                  <select
                    value={editStudent.attendance}
                    onChange={(e) => setEditStudent({ ...editStudent, attendance: e.target.value })}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                ) : (
                  student.attendance
                )}
              </td>
              <td>
                {editStudent && editStudent.id === student.id ? (
                  <input
                    type="number"
                    value={editStudent.progress}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, progress: e.target.value })
                    }
                  />
                ) : (
                  student.progress
                )}
              </td>
              <td>
                {editStudent && editStudent.id === student.id ? (
                  <button onClick={saveEdit}>Save</button>
                ) : (
                  <>
                    <button onClick={() => startEdit(student)}>Edit</button>
                    <button onClick={() => deleteStudent(student.id)}>Delete</button>
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

export default AttendanceTracking;
