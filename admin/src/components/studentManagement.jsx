import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import "../style/Students.css";
import "../style/StudentDetail.css";
// ----------------------
// Student Detail Component
// ----------------------
const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state
  const [newCertificate, setNewCertificate] = useState({ name: "", link: "" }); // Form state for new certificate
  const navigate = useNavigate();

  // Fetch student details, attendance, and certificates
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/students/${id}`);
        const studentData = res.data;
        setStudent(studentData);
        setAttendance(studentData.attendance || []);
        setLoading(false);
      } catch (err) {
        setError("Error fetching student details.");
        setLoading(false);
      }
    };
    
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/students/${id}`);
        const attendanceData = res.data.attendance; // Assuming attendance is nested in the student document
        setAttendance(attendanceData);
      } catch (err) {
        console.error("Error fetching attendance data:", err);
      }
    };

    const fetchCertificates = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/students/${id}/certificates`);

        setCertificates(res.data);
      } catch (err) {
        console.error("Error fetching certificates:", err);
      }
    };

    fetchStudentDetails();
    fetchAttendance();
    fetchCertificates();
  }, [id]);

  // Handle form input change for new certificate
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCertificate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler for adding a new certificate
  const handleSubmitCertificate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/students/${id}/certificates`,
        newCertificate
      );
      setCertificates(res.data.certificates);
      setNewCertificate({ name: "", link: "" }); // Clear form after submission
    } catch (err) {
      setError("Error adding certificate.");
    }
  };

  // Loading Spinner
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // Error Handling
  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  if (!student)
    return <div className="text-center mt-5">No student data available</div>;

  return (
    <div className="container mt-4">
      <motion.div
        className="card shadow-lg studentDetailCard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-header d-flex justify-content-between align-items-center studentDetailCardHeader">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
          <h4>
            {student.name} - {student.course}
          </h4>
          <span
            className={`badge bg-${
              student.status === "Active"
                ? "success"
                : student.status === "Inactive"
                ? "secondary"
                : "warning"
            }`}
          >
            {student.status}
          </span>
        </div>

        <div className="card-body row studentDetailCardBody">
          <motion.div className="col-md-3 text-center studentDetailProfile">
            <img
              src={student.photo}
              alt="student"
              className="img-fluid rounded-circle mb-2"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <p className="text-muted studentDetailText">{student.email}</p>
            <p className="text-muted studentDetailText">
              {student.phone || "Phone not provided"}
            </p>
          </motion.div>

          <motion.div className="col-md-9 studentDetailInfo">
            <motion.h5 className="mt-2 studentDetailHeader">Progress</motion.h5>
            <div
              className="progress mb-3 studentDetailProgress"
              style={{ height: "20px" }}
            >
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                style={{ width: `${student.progress || 0}%` }}
              >
                {student.progress || 0}%
              </div>
            </div>

            {/* Payment Info */}
            <h5 className="studentDetailHeader">Payment Info</h5>
            {student.payments.length > 0 ? (
              <ul className="list-group mb-3 studentDetailPaymentList">
                {student.payments.map((p, i) => (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between align-items-center studentDetailPaymentItem"
                  >
                    ₹{p.amount}
                    <span
                      className={`badge bg-${
                        p.status === "Paid" ? "success" : "danger"
                      }`}
                    >
                      {p.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted studentDetailText">
                No payment records found.
              </p>
            )}

            {/* Add Certificate Form */}
            <h5 className="studentDetailHeader">Add Certificate</h5>
            <form onSubmit={handleSubmitCertificate}>
              <div>
                <label>Certificate Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newCertificate.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div>
                <label>Certificate Link:</label>
                <input
                  type="text"
                  name="link"
                  value={newCertificate.link}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Add Certificate
              </button>
            </form>

            {/* Display Certificates */}
            <h5 className="studentDetailHeader">Certificates</h5>
            {certificates.length > 0 ? (
              <ul className="studentDetailCertificateList">
                {certificates.map((cert, i) => (
                  <li key={i}>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="studentDetailCertificateLink"
                    >
                      {cert.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted studentDetailText">
                No certificates uploaded.
              </p>
            )}

            {/* Attendance Log */}
            <h5 className="studentDetailHeader">Attendance Log</h5>
            {attendance.length > 0 ? (
              <ul className="list-group mb-3 studentDetailAttendanceList">
                {attendance.map((log, i) => (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between studentDetailAttendanceItem"
                  >
                    {log.date}
                    <span
                      className={`badge bg-${
                        log.status === "Present" ? "success" : "danger"
                      }`}
                    >
                      {log.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted studentDetailText">
                No attendance records available.
              </p>
            )}

            {/* Recruiter Notes */}
            <h5 className="studentDetailHeader">Recruiter Notes</h5>
            <div className="border rounded p-2 bg-light studentDetailNote">
              {student.recruiterNote ? (
                <p className="studentDetailText">{student.recruiterNote}</p>
              ) : (
                <p className="text-muted studentDetailText">
                  No notes added yet.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDetail;

// ----------------------
// Students List Component
// ----------------------
const Students = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [newStudent, setNewStudent] = useState({
    name: "",
    course: "",
    status: "Active",
    photo: "",
    email: "",
  });
  const [editId, setEditId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/students");
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/students/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleAddStudent = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/students",
        newStudent
      );
      setStudents([...students, data]);
      setNewStudent({
        name: "",
        course: "",
        status: "Active",
        photo: "",
        email: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditId(student._id);
    setEditedStudent({ ...student });
  };

  const handleSaveEdit = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/students/${editId}`,
        editedStudent
      );
      setStudents((prev) =>
        prev.map((student) => (student._id === editId ? data : student))
      );
      setEditId(null);
      setEditedStudent({});
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Completed":
        return "warning";
      default:
        return "light";
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) &&
        (courseFilter ? s.course === courseFilter : true) &&
        (statusFilter ? s.status === statusFilter : true)
    );
  }, [students, search, courseFilter, statusFilter]);

  return (
    <div className="students-container mt-4">
      <h3 className="students-title mb-4">Student Management</h3>

      {/* Filters */}
      <div className="students-row mb-3 g-2">
        <div className="col-md-4">
          <input
            className="students-form-control"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="students-form-select"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="">Filter by Program</option>
            <option value="Human-resource">Human-resource</option>
            <option value="Marketing">Marketing</option>
            <option value="Business-Analytics">Business Analytics</option>
            <option value="Finances">Finances</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="students-form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Filter by Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Add Student */}
      <div className="card mb-4 p-3">
        <h5>Add New Student</h5>
        <div className="row g-2">
          <input
            className="form-control col"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
          />
          <input
            className="form-control col"
            placeholder="Course"
            value={newStudent.course}
            onChange={(e) =>
              setNewStudent({ ...newStudent, course: e.target.value })
            }
          />
          <input
            className="form-control col"
            placeholder="Photo URL"
            value={newStudent.photo}
            onChange={(e) =>
              setNewStudent({ ...newStudent, photo: e.target.value })
            }
          />
          <input
            className="form-control col"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({ ...newStudent, email: e.target.value })
            }
          />
          <select
            className="form-control col"
            value={newStudent.status}
            onChange={(e) =>
              setNewStudent({ ...newStudent, status: e.target.value })
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="btn btn-primary col" onClick={handleAddStudent}>
            Add
          </button>
        </div>
      </div>

      {/* Table View */}
      <table className="table table-striped table-hover table-bordered shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Course</th>
            <th>Status</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td>
                <img
                  src={student.photo}
                  alt="student"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </td>
              <td>
                {editId === student._id ? (
                  <input
                    value={editedStudent.name}
                    onChange={(e) =>
                      setEditedStudent({
                        ...editedStudent,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span
                    onClick={() => navigate(`/students/${student._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {student.name}
                  </span>
                )}
              </td>
              <td>
                {editId === student._id ? (
                  <input
                    value={editedStudent.course}
                    onChange={(e) =>
                      setEditedStudent({
                        ...editedStudent,
                        course: e.target.value,
                      })
                    }
                  />
                ) : (
                  student.course
                )}
              </td>
              <td>
                {editId === student._id ? (
                  <select
                    value={editedStudent.status}
                    onChange={(e) =>
                      setEditedStudent({
                        ...editedStudent,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <span
                    className={`badge bg-${getStatusBadgeClass(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>
                )}
              </td>
              <td>
                {editId === student._id ? (
                  <input
                    value={editedStudent.email}
                    onChange={(e) =>
                      setEditedStudent({
                        ...editedStudent,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  student.email
                )}
              </td>
              <td>
                {editId === student._id ? (
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Students, StudentDetail };
