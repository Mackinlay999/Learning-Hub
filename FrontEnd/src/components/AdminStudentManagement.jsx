import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import "../style/AdminStudents.css";
import "../style/AdminStudentDetail.css";
// ----------------------
// Student Detail Component
// ----------------------
const AdminStudentDetail = () => {
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
        const res = await axios.get(
          `https://learning-hub-p2yq.onrender.com/api/students/${id}`
        );
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
        const res = await axios.get(
          `https://learning-hub-p2yq.onrender.com/api/students/${id}`
        );
        const attendanceData = res.data.attendance; // Assuming attendance is nested in the student document
        setAttendance(attendanceData);
      } catch (err) {
        console.error("Error fetching attendance data:", err);
      }
    };

    const fetchCertificates = async () => {
      try {
        const res = await axios.get(
          `https://learning-hub-p2yq.onrender.com/api/students/${id}/certificates`
        );

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
        `https://learning-hub-p2yq.onrender.com/api/students/${id}/certificates`,
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
    <div className="admin-student-detail-container mt-4">
      <motion.div
        className="shadow-lg admin-student-detail-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-header d-flex justify-content-between align-items-center admin-student-detail-card-header">
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

        <div className="card-body row admin-student-detail-card-body">
          <motion.div className="col-md-3 text-center admin-student-detail-profile">
            <img
              src={
                    student.photo
                      ? `https://learning-hub-p2yq.onrender.com${student.photo}`
                      : "https://via.placeholder.com/40" // Or your custom default image
                  }
              alt="student"
              className="img-fluid rounded-circle mb-2"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <p className="text-muted admin-student-detail-text">
              {student.email}
            </p>
            <p className="text-muted admin-student-detail-text">
              {student.mobile || "mobile not provided"}
            </p>
          </motion.div>

          <motion.div className="col-md-9 admin-student-detail-info">
            <motion.h5 className="mt-2 admin-student-detail-header">
              Progress
            </motion.h5>
            <div
              className="progress mb-3 admin-student-detail-progress"
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
            <h5 className="admin-student-detail-header">Payment Info</h5>
            {student.payments.length > 0 ? (
              <ul className="list-group mb-3 admin-student-detail-payment-list">
                {student.payments.map((p, i) => (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between align-items-center admin-student-detail-payment-item"
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
              <p className="text-muted admin-student-detail-text">
                No payment records found.
              </p>
            )}

            {/* Add Certificate Form */}
            <h5 className="admin-student-detail-header">Add Certificate</h5>
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
            <h5 className="admin-student-detail-header">Certificates</h5>
            {certificates.length > 0 ? (
              <ul className="admin-student-detail-certificate-list">
                {certificates.map((cert, i) => (
                  <li key={i}>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="admin-student-detail-certificate-link"
                    >
                      {cert.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted admin-student-detail-text">
                No certificates uploaded.
              </p>
            )}

            {/* Attendance Log */}
            <h5 className="admin-student-detail-header">Attendance Log</h5>
            {attendance.length > 0 ? (
              <ul className="list-group mb-3 admin-student-detail-attendance-list">
                {attendance.map((log, i) => (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between admin-student-detail-attendance-item"
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
              <p className="text-muted admin-student-detail-text">
                No attendance records available.
              </p>
            )}

            {/* Recruiter Notes */}
            <h5 className="admin-student-detail-header">Recruiter Notes</h5>
            <div className="border rounded p-2 bg-light admin-student-detail-note">
              {student.recruiterNote ? (
                <p className="admin-student-detail-text">
                  {student.recruiterNote}
                </p>
              ) : (
                <p className="text-muted admin-student-detail-text">
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

export default AdminStudentDetail;

// ----------------------
// Students List Component
// ----------------------
const AdminStudents = () => {
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
    mobile: "",
  });
  const [editId, setEditId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://learning-hub-p2yq.onrender.com/api/students/${id}`
      );
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleAddStudent = async () => {
  try {
    const formData = new FormData();
    formData.append("name", newStudent.name);
    formData.append("course", newStudent.course);
    formData.append("status", newStudent.status);
    formData.append("email", newStudent.email);
    formData.append("mobile", newStudent.mobile);
    if (newStudent.photo) {
      formData.append("photo", newStudent.photo);
    }

    const { data } = await axios.post(
      "https://learning-hub-p2yq.onrender.com/api/students",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setStudents([...students, data]);
    setNewStudent({
      name: "",
      course: "",
      status: "Active",
      photo: "",
      email: "",
      mobile: "",
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
        `https://learning-hub-p2yq.onrender.com/api/students/${editId}`,
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
    <div className="admin-students-container mt-4">
      <h3 className="admin-students-title mb-4">Student Management</h3>

      {/* Filters */}
      <div className="admin-students-row mb-3 g-2">
        <div className="col-md-4">
          <input
            className="admin-students-form-control"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="admin-students-form-select"
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
            className="admin-students-form-select"
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
      <div className="admin-students-card mb-4 p-3">
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
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) =>
              setNewStudent({ ...newStudent, photo: e.target.files[0] })
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
          <input
            className="form-control col"
            placeholder="Mobile Number"
            value={newStudent.mobile}
            onChange={(e) =>
              setNewStudent({ ...newStudent, mobile: e.target.value })
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
      <table className="admin-students-table table table-striped table-hover table-bordered shadow-sm">
        <thead className="admin-students-table-dark">
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Course</th>
            <th>Status</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td>
                <img
                  src={
                    student.photo
                      ? `https://learning-hub-p2yq.onrender.com${student.photo}`
                      : "https://via.placeholder.com/40" // Or your custom default image
                  }
                  alt="student"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "top",
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
                    onClick={() => navigate(`/admin/students/${student._id}`)}
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
                  <input
                    value={editedStudent.mobile}
                    onChange={(e) =>
                      setEditedStudent({
                        ...editedStudent,
                        mobile: e.target.value,
                      })
                    }
                  />
                ) : (
                  student.mobile
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

export { AdminStudents, AdminStudentDetail };
