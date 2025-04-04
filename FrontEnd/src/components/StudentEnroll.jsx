import React, { useState } from "react";
// import "../style/StudentEnrollment.css";

const studentsData = [
  { id: 1, name: "John Doe", status: "Paid" },
  { id: 2, name: "Jane Smith", status: "Pending" },
  { id: 3, name: "Mark Wilson", status: "Overdue" },
];

const StudentEnroll = () => {
  const [students, setStudents] = useState(studentsData);

  return (
    <div className="se-container">
      <h2 className="se-title">Student Enrollment & Payments</h2>
      <table className="se-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className={`se-row ${student.status.toLowerCase()}`}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentEnroll;
