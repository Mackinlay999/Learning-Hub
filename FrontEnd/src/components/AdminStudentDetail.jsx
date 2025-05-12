import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "../style/AdminStudentDetail.css";

const AdminStudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios
      .get(`https://learning-hub-p2yq.onrender.com/api/students/${id}`)
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {student.status}
          </span>
        </div>

        <div className="card-body row studentDetailCardBody">
          {/* Left Panel - Profile Photo & Contact */}
          <motion.div
            className="col-md-3 text-center studentDetailProfile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
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

          {/* Right Panel - Detailed Info */}
          <motion.div
            className="col-md-9 studentDetailInfo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Course Progress */}
            <motion.h5
              className="mt-2 studentDetailHeader"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Progress
            </motion.h5>
            <motion.div
              className="progress mb-3 studentDetailProgress"
              style={{ height: "20px" }}
              initial={{ width: 0 }}
              animate={{ width: `${student.progress || 0}%` }}
              transition={{ duration: 1 }}
            >
              <div className="progress-bar progress-bar-striped progress-bar-animated">
                {student.progress || 0}%
              </div>
            </motion.div>

            {/* Payment Details */}
            <motion.h5
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="studentDetailHeader"
            >
              Payment Info
            </motion.h5>
            {student.payments.length > 0 ? (
              <motion.ul
                className="list-group mb-3 studentDetailPaymentList"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
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
              </motion.ul>
            ) : (
              <motion.p
                className="text-muted studentDetailText"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                No payment records found.
              </motion.p>
            )}

            {/* Certificates */}
            <motion.h5
              className="studentDetailHeader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Certificates
            </motion.h5>
            {student.certificates.length > 0 ? (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="studentDetailCertificateList"
              >
                {student.certificates.map((cert, i) => (
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
              </motion.ul>
            ) : (
              <motion.p
                className="text-muted studentDetailText"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                No certificates uploaded.
              </motion.p>
            )}

            {/* Attendance Log */}
            <motion.h5
              className="studentDetailHeader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Attendance Log
            </motion.h5>
            {student.attendance.length > 0 ? (
              <motion.ul
                className="list-group mb-3 studentDetailAttendanceList"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {student.attendance.map((log, i) => (
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
              </motion.ul>
            ) : (
              <motion.p
                className="text-muted studentDetailText"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                No attendance records available.
              </motion.p>
            )}

            {/* Recruiter / Communication Notes */}
            <motion.h5
              className="studentDetailHeader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Recruiter Notes
            </motion.h5>
            <div className="border rounded p-2 bg-light studentDetailNote">
              {student.recruiterNote ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="studentDetailText"
                >
                  {student.recruiterNote}
                </motion.p>
              ) : (
                <motion.p
                  className="text-muted studentDetailText"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  No notes added yet.
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminStudentDetail;
