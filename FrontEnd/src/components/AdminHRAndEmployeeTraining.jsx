import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/AdminHRAndEmployeeTraining.css";

const AdminHRAndEmployeeTraining = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    skillLevel: "",
    progress: "",
    status: "Not Started",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://learning-hub-p2yq.onrender.com/api/employees"; // update with your backend URL

  // Fetch employees on load
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${editingId}`, employee);
        setIsEditing(false);
        setEditingId(null);
      } else {
        await axios.post(API_URL, employee);
      }
      setEmployee({
        name: "",
        department: "",
        skillLevel: "",
        progress: "",
        status: "Not Started",
      });
      fetchEmployees();
    } catch (err) {
      console.error("Error saving employee:", err);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const editEmployee = (emp) => {
    setEmployee({
      name: emp.name,
      department: emp.department,
      skillLevel: emp.skillLevel,
      progress: emp.progress,
      status: emp.status,
    });
    setIsEditing(true);
    setEditingId(emp._id);
  };

  return (
    <div className="HR-main">
      <h1 className="HR-title">HR & Employee Training Dashboard</h1>
      <p className="HR-subtitle">
        Monitor employee skill development. <br />
        Generate training progress reports for enterprises.
      </p>

      <form className="HR-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Employee Name"
          value={employee.name}
          onChange={handleChange}
          required
        />
        <input
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
          required
        />
        <input
          name="skillLevel"
          placeholder="Skill Level (e.g., Beginner)"
          value={employee.skillLevel}
          onChange={handleChange}
          required
        />
        <input
          name="progress"
          placeholder="Progress (%)"
          type="number"
          min="0"
          max="100"
          value={employee.progress}
          onChange={handleChange}
          required
        />
        <select name="status" value={employee.status} onChange={handleChange}>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button type="submit">
          {isEditing ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <div className="HR-list">
        <h2 className="HR-section-title">Employee Training Records</h2>
        {employees.length === 0 ? (
          <p className="HR-empty">No records yet.</p>
        ) : (
          <table className="HR-table">
            <thead>
              <tr className="hr-tr">
                <th>Name</th>
                <th>Department</th>
                <th>Skill Level</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.skillLevel}</td>
                  <td>{emp.progress}%</td>
                  <td>{emp.status}</td>
                  <td>
                    <button onClick={() => editEmployee(emp)}>Edit</button>
                    <button onClick={() => deleteEmployee(emp._id)}>
                      Delete
                    </button>
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

export default AdminHRAndEmployeeTraining;
