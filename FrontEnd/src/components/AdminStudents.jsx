import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // Import framer-motion
import "../style/AdminStudents.css";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(
          "https://learning-hub-p2yq.onrender.com/api/students"
        );
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await axios.delete(
        `https://learning-hub-p2yq.onrender.com/api/students/${id}`
      );
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Completed":
        return "warning";
      default:
        return "";
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      return (
        s.name.toLowerCase().includes(search.toLowerCase()) &&
        (courseFilter ? s.course === courseFilter : true) &&
        (statusFilter ? s.status === statusFilter : true)
      );
    });
  }, [students, search, courseFilter, statusFilter]);

  return (
    <div className="students-container mt-4">
      <h3 className="students-title mb-4">Student Management</h3>

      <div className="students-row mb-3 g-2">
        <div className="col-md-4">
          <motion.input
            className="students-form-control"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="col-md-3">
          <motion.select
            className="students-form-select"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <option value="">Filter by Program</option>
            <option value="Human-resource">Human-resource</option>
            <option value="Marketing">Marketing</option>
            <option value="Business-Analytics">Business Analytics</option>
            <option value="Finances">Finances</option>
            <option value="Sales">Sales</option>
          </motion.select>
        </div>
        <div className="col-md-3">
          <motion.select
            className="students-form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <option value="">Filter by Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Inactive">Inactive</option>
          </motion.select>
        </div>
        <div className="col-md-2 text-end">
          <motion.button
            className="students-btn btn-primary w-100"
            onClick={() => navigate("http://localhost:3000/students/add")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            + Add Student
          </motion.button>
        </div>
      </div>

      <motion.table
        className="students-table table table-hover shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead className="students-table-light">
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((s) => (
              <motion.tr
                key={s._id}
                className="students-table-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td>
                  <img
                    src={s.photo || "https://via.placeholder.com/40"}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="students-rounded-circle object-fit-cover"
                  />
                </td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.course}</td>
                <td>
                  <span className={`badge bg-${getStatusBadgeClass(s.status)}`}>
                    {s.status}
                  </span>
                </td>
                <td>
                  <motion.button
                    className="students-btn btn-sm btn-info me-2"
                    onClick={() =>
                      navigate(`http://localhost:3000/students/${s._id}`)
                    }
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    View
                  </motion.button>
                  <motion.button
                    className="students-btn btn-sm btn-warning me-2"
                    onClick={() =>
                      navigate(`http://localhost:3000/students/edit/${s._id}`)
                    }
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    className="students-btn btn-sm btn-danger"
                    onClick={() => handleDelete(s._id)}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    Delete
                  </motion.button>
                  <motion.button
                    className="students-btn btn-sm btn-dark ms-2"
                    onClick={() =>
                      navigate(`http://localhost:3000/attendance/${s._id}`)
                    }
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    Attendance
                  </motion.button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="students-text-center students-text-muted py-4"
              >
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </div>
  );
};

export default AdminStudents;
