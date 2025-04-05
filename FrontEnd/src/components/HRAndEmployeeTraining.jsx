import React, { useState } from "react";
import "../style/HRAndEmployeeTraining.css";

const HRAndEmployeeTraining = () => {
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

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingId ? { ...employee, id: editingId } : emp
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newEmployee = { ...employee, id: Date.now() };
      setEmployees([...employees, newEmployee]);
    }

    setEmployee({
      name: "",
      department: "",
      skillLevel: "",
      progress: "",
      status: "Not Started",
    });
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  const editEmployee = (emp) => {
    setEmployee(emp);
    setIsEditing(true);
    setEditingId(emp.id);
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
              <tr>
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
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.skillLevel}</td>
                  <td>{emp.progress}%</td>
                  <td>{emp.status}</td>
                  <td>
                    <button onClick={() => editEmployee(emp)}>Edit</button>
                    <button onClick={() => deleteEmployee(emp.id)}>
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

export default HRAndEmployeeTraining;
