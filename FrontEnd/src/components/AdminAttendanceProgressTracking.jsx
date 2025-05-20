// import React, { useState } from "react";
// import "../style/AttendanceProgressTracking.css";

// const AttendanceProgressTracking = () => {
//   const [records, setRecords] = useState([]);
//   const [record, setRecord] = useState({
//     studentName: "",
//     attendanceMethod: "Login",
//     progress: "",
//     certificationIssued: "No",
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const handleChange = (e) => {
//     setRecord({ ...record, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       setRecords(records.map((r) => (r.id === editingId ? { ...record, id: editingId } : r)));
//       setIsEditing(false);
//       setEditingId(null);
//     } else {
//       const newRecord = { ...record, id: Date.now() };
//       setRecords([...records, newRecord]);
//     }
//     setRecord({
//       studentName: "",
//       attendanceMethod: "Login",
//       progress: "",
//       certificationIssued: "No",
//     });
//   };

//   const deleteRecord = (id) => {
//     setRecords(records.filter((r) => r.id !== id));
//   };

//   const editRecord = (r) => {
//     setRecord(r);
//     setIsEditing(true);
//     setEditingId(r.id);
//   };

//   return (
//     <div className="APT-main">
//       <h1 className="APT-title">Attendance & Progress Tracking</h1>
//       <p className="APT-subtitle">
//         Track attendance, course progress & certifications.
//       </p>

//       <form className="APT-form" onSubmit={handleSubmit}>
//         <input
//           name="studentName"
//           placeholder="Student Name"
//           value={record.studentName}
//           onChange={handleChange}
//           required
//         />
//         <select
//           name="attendanceMethod"
//           value={record.attendanceMethod}
//           onChange={handleChange}
//         >
//           <option value="Login">Login</option>
//           <option value="Biometric">Biometric</option>
//           <option value="Manual">Manual</option>
//         </select>
//         <input
//           name="progress"
//           type="number"
//           placeholder="Progress (%)"
//           min="0"
//           max="100"
//           value={record.progress}
//           onChange={handleChange}
//           required
//         />
//         <select
//           name="certificationIssued"
//           value={record.certificationIssued}
//           onChange={handleChange}
//         >
//           <option value="NO" >Certificate</option>
//           <option value="No">No</option>
//           <option value="Yes">Yes</option>
//         </select>
//         <button type="submit">{isEditing ? "Update" : "Add Record"}</button>
//       </form>

//       <div className="APT-list">
//         <h2 className="APT-section-title">Student Records</h2>
//         {records.length === 0 ? (
//           <p className="APT-empty">No records found.</p>
//         ) : (
//           <table className="APT-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Attendance Method</th>
//                 <th>Progress</th>
//                 <th>Certification</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((r) => (
//                 <tr key={r.id}>
//                   <td>{r.studentName}</td>
//                   <td>{r.attendanceMethod}</td>
//                   <td>{r.progress}%</td>
//                   <td>{r.certificationIssued}</td>
//                   <td>
//                     <button onClick={() => editRecord(r)}>Edit</button>
//                     <button onClick={() => deleteRecord(r.id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AttendanceProgressTracking;

import axios from "./axios";
import React, { useEffect, useState } from "react";
import "../style/AdminAttendanceProgressTracking.css";

const AdminAttendanceProgressTracking = () => {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState({
    studentName: "",
    attendanceMethod: "Login",
    progress: "",
    certificationIssued: "No",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

   // Replace with your server URL

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`/getRecords`);
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // const handleChange = (e) => {
    

  //   setRecord({ ...record, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
  const { name, value } = e.target;
  setRecord((prev) => ({
    ...prev,
    [name]: name === "progress" ? Number(value) : value,
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/updateRecord/${editingId}`, record);
        setIsEditing(false);
        setEditingId(null);
      } else {
        await axios.post(`/createRecord`, record);
      }
      setRecord({
        studentName: "",
        attendanceMethod: "Login",
        progress: "",
        certificationIssued: "No",
      });
      fetchRecords();
    } catch (err) {
      console.error("Error submitting record:", err);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`/deleteRecord/${id}`);
      fetchRecords();
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  const editRecord = (r) => {
    setRecord(r);
    setIsEditing(true);
    setEditingId(r._id || r.id); // adjust depending on MongoDB vs local
  };

  return (
    <div className="APT-main">
      <h1 className="APT-title">Attendance & Progress Tracking</h1>
      <form className="APT-form" onSubmit={handleSubmit}>
        <input name="studentName" placeholder="Student Name" value={record.studentName} onChange={handleChange} required />
        <select name="attendanceMethod" value={record.attendanceMethod} onChange={handleChange}>
          <option value="Login">Login</option>
          <option value="Biometric">Biometric</option>
          <option value="Manual">Manual</option>
        </select>
        <input name="progress" type="number" placeholder="Progress (%)" min="0" max="100" value={record.progress} onChange={handleChange} required />


        {/* <select name="certificationIssued" value={record.certificationIssued} onChange={handleChange}>
       
          <option value="No">No</option>

          <option value="Yes">Yes</option>
        </select> */}


        <select name="certificationIssued" value={record.certificationIssued} onChange={handleChange} required>
          <option value="" disabled>Select Certificate Status</option>
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
                <tr key={r._id || r.id}>
                  <td>{r.studentName}</td>
                  <td>{r.attendanceMethod}</td>
                  <td>{r.progress}%</td>
                  <td>{r.certificationIssued}</td>
                  <td>
                    <button onClick={() => editRecord(r)}>Edit</button>
                    <button onClick={() => deleteRecord(r._id || r.id)}>Delete</button>
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

export default AdminAttendanceProgressTracking;

