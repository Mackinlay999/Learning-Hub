import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "../style/Students.css";
import "../style/StudentDetail.css";

// --------------------------------------
// Student Detail Component
// --------------------------------------
const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/students/${id}`)
      .then((res) => setStudent(res.data))
      .catch((err) => console.error("Error fetching student details", err));
  }, [id]);

  if (!student) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <motion.div
        className="card shadow-lg studentDetailCard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-header d-flex justify-content-between align-items-center studentDetailCardHeader">
          <h4>{student.name} - {student.course}</h4>
          <span className={`badge bg-${student.status === "Active" ? "success" : student.status === "Inactive" ? "secondary" : "warning"}`}>
            {student.status}
          </span>
        </div>

        <div className="card-body row studentDetailCardBody">
          {/* Profile Section */}
          <motion.div className="col-md-3 text-center studentDetailProfile">
            <img
              src={student.photo}
              alt="student"
              className="img-fluid rounded-circle mb-2"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <p className="text-muted studentDetailText">{student.email}</p>
            <p className="text-muted studentDetailText">{student.phone || "Phone not provided"}</p>
          </motion.div>

          {/* Details Section */}
          <motion.div className="col-md-9 studentDetailInfo">
            {/* Progress */}
            <motion.h5 className="mt-2 studentDetailHeader">Progress</motion.h5>
            <div className="progress mb-3 studentDetailProgress" style={{ height: "20px" }}>
              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${student.progress || 0}%` }}>
                {student.progress || 0}%
              </div>
            </div>

            {/* Payments */}
            <h5 className="studentDetailHeader">Payment Info</h5>
            {student.payments.length > 0 ? (
              <ul className="list-group mb-3 studentDetailPaymentList">
                {student.payments.map((p, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between align-items-center studentDetailPaymentItem">
                    ₹{p.amount}
                    <span className={`badge bg-${p.status === "Paid" ? "success" : "danger"}`}>{p.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted studentDetailText">No payment records found.</p>
            )}

            {/* Certificates */}
            <h5 className="studentDetailHeader">Certificates</h5>
            {student.certificates.length > 0 ? (
              <ul className="studentDetailCertificateList">
                {student.certificates.map((cert, i) => (
                  <li key={i}>
                    <a href={cert.link} target="_blank" rel="noreferrer" className="studentDetailCertificateLink">{cert.name}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted studentDetailText">No certificates uploaded.</p>
            )}

            {/* Attendance */}
            <h5 className="studentDetailHeader">Attendance Log</h5>
            {student.attendance.length > 0 ? (
              <ul className="list-group mb-3 studentDetailAttendanceList">
                {student.attendance.map((log, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between studentDetailAttendanceItem">
                    {log.date}
                    <span className={`badge bg-${log.status === "Present" ? "success" : "danger"}`}>{log.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted studentDetailText">No attendance records available.</p>
            )}

            {/* Recruiter Notes */}
            <h5 className="studentDetailHeader">Recruiter Notes</h5>
            <div className="border rounded p-2 bg-light studentDetailNote">
              {student.recruiterNote ? (
                <p className="studentDetailText">{student.recruiterNote}</p>
              ) : (
                <p className="text-muted studentDetailText">No notes added yet.</p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// --------------------------------------
// Students List Component
// --------------------------------------
const Students = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/students");
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/students/${id}`);
      setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
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
          />
        </div>
        <div className="col-md-3">
          <motion.select
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
          </motion.select>
        </div>
        <div className="col-md-3">
          <motion.select
            className="students-form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Filter by Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Completed">Completed</option>
          </motion.select>
        </div>
      </div>

      <div className="row g-3">
        {filteredStudents.map((student) => (
          <div key={student._id} className="col-md-4">
            <motion.div
              className="card student-card shadow-sm"
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate(`/students/${student._id}`)}
            >
              <img src={student.photo} alt={student.name} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body">
                <h5 className="card-title">{student.name}</h5>
                <p className="card-text">{student.course}</p>
                <span className={`badge bg-${getStatusBadgeClass(student.status)}`}>{student.status}</span>
                <button className="btn btn-sm btn-danger float-end mt-2" onClick={(e) => { e.stopPropagation(); handleDelete(student._id); }}>
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export both if needed separately
export { Students, StudentDetail };
