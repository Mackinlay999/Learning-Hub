import React, { useState } from "react";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

const AdminAddStudent = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    status: "Active",
    progress: 0,
    photo: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/students", studentData);
      navigate("/students");
    } catch (error) {
      console.error("Error adding student", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New Student</h3>
      <form onSubmit={handleSubmit}>
        {["name", "email", "phone", "photo"].map((field) => (
          <div key={field} className="mb-3">
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              className="form-control"
              name={field}
              value={studentData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="mb-3">
          <label className="form-label">Course</label>
          <select className="form-select" name="course" onChange={handleChange} required>
            <option value="">Select Course</option>
            <option value="Human-resource">Human-resource</option>
            <option value="Marketing">Marketing</option>
            <option value="Business-Analytics">Business Analytics</option>
            <option value="Finances">Finances</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <button className="btn btn-primary">Add Student</button>
      </form>
    </div>
  );
};

export default AdminAddStudent;
