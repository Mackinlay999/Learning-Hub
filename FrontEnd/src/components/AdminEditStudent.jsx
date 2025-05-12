import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminEditStudent = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://learning-hub-p2yq.onrender.com/api/students/${id}`)
      .then((res) => {
        setStudentData(res.data);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://learning-hub-p2yq.onrender.com/api/students/${id}`,
        studentData
      );
      navigate(`/students/${id}`);
    } catch (err) {
      console.error("Error updating student", err);
    }
  };

  if (!studentData) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>Edit Student</h3>
      <form onSubmit={handleSubmit}>
        {["name", "email", "phone", "photo"].map((field) => (
          <div key={field} className="mb-3">
            <label className="form-label">{field}</label>
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
          <select
            name="course"
            className="form-select"
            value={studentData.course}
            onChange={handleChange}
          >
            <option value="Human-resource">Human-resource</option>
            <option value="Marketing">Marketing</option>
            <option value="Business-Analytics">Business Analytics</option>
            <option value="Finances">Finances</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <button className="btn btn-success">Update Student</button>
      </form>
    </div>
  );
};

export default AdminEditStudent;
