// import React, { useState, useEffect } from "react";
// import axios from "./axios";
// import "../style/StudentEnroll.css";

// const StudentEnroll = () => {
//   const [students, setStudents] = useState([]);
//   const [newStudent, setNewStudent] = useState({ name: "", status: "Pending",program :"" });
//   const [editStudent, setEditStudent] = useState(null);


//   // Fetch all students on component mount
//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get(`/getStudents`);
//       setStudents(res.data);
//     } catch (error) {
//       console.error("Failed to fetch students", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
//   };

//   const addStudent = async () => {
//     if (!newStudent.name.trim()) return;
//     try {
//       const res = await axios.post(`/createStudents`, newStudent);
//       setStudents([...students, res.data]);
//       setNewStudent({ name: "", status: "Pending",program:"" });
//     } catch (err) {
//       console.error("Error adding student", err);
//     }
//   };

//   const deleteStudent = async (id) => {
//     try {
//       await axios.delete(`/deleteStudent/${id}`);
//       setStudents(students.filter((student) => student._id !== id));
//     } catch (err) {
//       console.error("Error deleting student", err);
//     }
//   };

//   const startEdit = (student) => {
//     setEditStudent({ ...student }); // clone for editing
//   };

//   const saveEdit = async () => {
//     try {
//       const res = await axios.put(`/updateStudent/${editStudent._id}`, editStudent);
//       setStudents(students.map((s) => (s._id === editStudent._id ? res.data : s)));
//       setEditStudent(null);
//     } catch (err) {
//       console.error("Error updating student", err);
//     }
//   };

//   return (
//     <div className="se-container">
//       <h2 className="se-title">Student Enrollment & Payments</h2>

//       <div className="se-form">
//         <input
//           type="text"
//           name="name"
//           value={newStudent.name}
//           onChange={handleInputChange}
//           placeholder="Enter student name"
//         />
//         <select name="status" value={newStudent.status} onChange={handleInputChange}>
//           <option value="Paid">Paid</option>
//           <option value="Pending">Pending</option>
//           <option value="EMI">EMI</option>
//         </select>

//         <select name="program" value={newStudent.program} onChange={handleInputChange}  required>
//   <option value="">What Training Program Do You Need?</option>
//   <option value="HR">HR</option>
//   <option value="Marketing">Marketing</option>
//   <option value="Sales">Sales</option>
//   <option value="Business Analyst">Business Analyst</option>
//   <option value="Finance">Finance</option>
// </select>
//         <button onClick={addStudent}>Add Student</button>
//       </div>

//       <table className="se-table">
//         <thead>
//           <tr className="ST-tr">
//             <th>ID</th>
//             <th>Name</th>
//             <th>Payment Status</th>
//             <th>Traning program</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.length === 0 ? (
//             <tr>
//               <td colSpan="4" style={{ textAlign: "center", color: "#777" }}>
//                 No students found.
//               </td>
//             </tr>
//           ) : (
//             students.map((student, index) => (
//               <tr key={student._id} className={`se-row ${student.status.toLowerCase()}`}>
//                 <td>{index + 1}</td>
//                 <td>
//                   {editStudent && editStudent._id === student._id ? (
//                     <input
//                       type="text"
//                       value={editStudent.name}
//                       onChange={(e) =>
//                         setEditStudent({ ...editStudent, name: e.target.value })
//                       }
//                     />
//                   ) : (
//                     student.name
//                   )}
//                 </td>
//                 <td>
//                   {editStudent && editStudent._id === student._id ? (
//                     <select
//                       value={editStudent.status}
//                       onChange={(e) =>
//                         setEditStudent({ ...editStudent, status: e.target.value })
//                       }
//                     >
//                       <option value="Paid">Paid</option>
//                       <option value="Pending">Pending</option>
//                       <option value="Overdue">Overdue</option>
//                     </select>
//                   ) : (
//                     student.status
//                   )}
//                 </td>
//                 <td>
//                   {editStudent && editStudent._id === student._id ? (
//                     <button onClick={saveEdit}>Save</button>
//                   ) : (
//                     <>
//                       <button onClick={() => startEdit(student)}>Edit</button>
//                       <button onClick={() => deleteStudent(student._id)}>Delete</button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentEnroll;


import React, { useState, useEffect } from "react";
import axios from "./axios";
import "../style/AdminStudentEnroll.css";

const AdminStudentEnroll = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", status: "Pending", program: "" });
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`/getStudents`);
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const addStudent = async () => {
    if (!newStudent.name.trim()) return;
    try {
      const res = await axios.post(`/createStudents`, newStudent);
      setStudents([...students, res.data]);
      setNewStudent({ name: "", status: "Pending", program: "" });
    } catch (err) {
      console.error("Error adding student", err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`/deleteStudent/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (err) {
      console.error("Error deleting student", err);
    }
  };

  const startEdit = (student) => {
    setEditStudent({ ...student });
  };

  const saveEdit = async () => {
    try {
      const res = await axios.put(`/updateStudent/${editStudent._id}`, editStudent);
      setStudents(students.map((s) => (s._id === editStudent._id ? res.data : s)));
      setEditStudent(null);
    } catch (err) {
      console.error("Error updating student", err);
    }
  };

  return (
    <div className="se-container">
      <h2 className="se-title">Student Enrollment & Payments</h2>

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
          <option value="EMI">EMI</option>
        </select>
        <select name="program" value={newStudent.program} onChange={handleInputChange} required>
          <option value="">What Training Program Do You Need?</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Business Analyst">Business Analyst</option>
          <option value="Finance">Finance</option>
        </select>
        <button onClick={addStudent}>Add Student</button>
      </div>

      <table className="se-table">
        <thead>
          <tr className="ST-tr">
            <th>ID</th>
            <th>Name</th>
            <th>Payment Status</th>
            <th>Training Program</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#777" }}>
                No students found.
              </td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr key={student._id} className={`se-row ${student.status.toLowerCase()}`}>
                <td>{index + 1}</td>
                <td>
                  {editStudent && editStudent._id === student._id ? (
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
                  {editStudent && editStudent._id === student._id ? (
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
                  {editStudent && editStudent._id === student._id ? (
                    <select
                      value={editStudent.program}
                      onChange={(e) =>
                        setEditStudent({ ...editStudent, program: e.target.value })
                      }
                    >
                      <option value="">What Training Program Do You Need?</option>
                      <option value="HR">HR</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Business Analyst">Business Analyst</option>
                      <option value="Finance">Finance</option>
                    </select>
                  ) : (
                    student.program
                  )}
                </td>
                <td>
                  {editStudent && editStudent._id === student._id ? (
                    <button onClick={saveEdit}>Save</button>
                  ) : (
                    <>
                      <button onClick={() => startEdit(student)}>Edit</button>
                      <button onClick={() => deleteStudent(student._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudentEnroll;

