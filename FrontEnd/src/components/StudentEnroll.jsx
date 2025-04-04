import React, { useState } from "react";

const initialStudents = [
  { id: 1, name: "John Doe", status: "Paid" },
  { id: 2, name: "Jane Smith", status: "Pending" },
  { id: 3, name: "Mark Wilson", status: "Overdue" },
];

const StudentEnroll = () => {
  const [students, setStudents] = useState(initialStudents);
  const [newStudent, setNewStudent] = useState({ name: "", status: "Pending" });
  const [editStudent, setEditStudent] = useState(null);

  // Handle input changes for adding/editing
  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  // Add Student
  const addStudent = () => {
    if (!newStudent.name.trim()) return;
    setStudents([...students, { id: students.length + 1, ...newStudent }]);
    setNewStudent({ name: "", status: "Pending" });
  };

  // Delete Student
  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  // Set student for editing
  const startEdit = (student) => {
    setEditStudent(student);
  };

  // Save edited student
  const saveEdit = () => {
    setStudents(
      students.map((s) => (s.id === editStudent.id ? editStudent : s))
    );
    setEditStudent(null);
  };

  return (
    <div className="se-container">
      <h2 className="se-title">Student Enrollment & Payments</h2>

      {/* Add Student Form */}
      <div className="se-form">
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
          placeholder="Enter student name"
        />
        <select name="status" value={newStudent.status} onChange={handleInputChange}>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
        <button onClick={addStudent}>Add Student</button>
      </div>

      {/* Student Table */}
      <table className="se-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className={`se-row ${student.status.toLowerCase()}`}>
              <td>{student.id}</td>
              <td>
                {editStudent && editStudent.id === student.id ? (
                  <input
                    type="text"
                    value={editStudent.name}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, name: e.target.value })
                    }
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {editStudent && editStudent.id === student.id ? (
                  <select
                    value={editStudent.status}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, status: e.target.value })
                    }
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                ) : (
                  student.status
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

export default StudentEnroll;
