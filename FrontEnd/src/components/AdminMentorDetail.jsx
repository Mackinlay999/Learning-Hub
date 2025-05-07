import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { motion } from "framer-motion";

const AdminMentorDetail = () => {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/mentors/${id}`);
        setMentor(res.data);
        setSessions(res.data.sessions || []);
        setStudents(res.data.students || []);
        setFeedbacks(res.data.feedbacks || []); // Assuming feedbacks are part of mentor data
        setLoading(false);
      } catch (err) {
        setError("Error fetching mentor details.");
        setLoading(false);
      }
    };

    fetchMentorDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  if (!mentor) {
    return <div className="text-center mt-5">No mentor data available</div>;
  }

  return (
    <div className="container mt-4">
      <motion.div
        className="card shadow-lg mentorDetailCard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-header d-flex justify-content-between align-items-center mentorDetailCardHeader">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
          <h4>{mentor.name} - {mentor.expertise}</h4>
          <span className="badge bg-info">{mentor.role || "Mentor"}</span>
        </div>

        <div className="card-body row mentorDetailCardBody">
          <div className="col-md-3 text-center mentorDetailProfile">
            <img
              src={mentor.photo}
              alt="mentor"
              className="img-fluid rounded-circle mb-2"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <p className="text-muted mentorDetailText">{mentor.email}</p>
            <p className="text-muted mentorDetailText">{mentor.mobile || "mobile not provided"}</p>
          </div>

          <div className="col-md-9 mentorDetailInfo">
            {/* Sessions Conducted */}
            <h5 className="mentorDetailHeader">Sessions Conducted</h5>
            {sessions.length > 0 ? (
              <ul className="list-group mb-3 mentorDetailSessionList">
                {sessions.map((session, i) => (
                  <li
                    key={i}
                    className="list-group-item d-flex justify-content-between align-items-center mentorDetailSessionItem"
                  >
                    {session.title} - {session.date}
                    <span className="badge bg-primary">{session.topic}</span>
                    {/* Feedback for this session */}
                    {feedbacks
                      .filter(feedback => feedback.sessionId === session._id)
                      .map((feedback, idx) => (
                        <div key={idx} className="mt-2">
                          <p className="text-muted">{feedback.studentName}: {feedback.comment}</p>
                          <span className="badge bg-success">Rating: {feedback.rating}</span>
                        </div>
                      ))}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted mentorDetailText">No sessions conducted.</p>
            )}

            {/* Assigned Students */}
            <h5 className="mentorDetailHeader">Assigned Students</h5>
            {students.length > 0 ? (
              <ul className="list-group mb-3 mentorDetailStudentList">
                {students.map((s, i) => (
                  <li key={i} className="list-group-item">
                    {s.name} ({s.course})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted mentorDetailText">No students assigned.</p>
            )}

            {/* Notes */}
            <h5 className="mentorDetailHeader">Mentor Notes</h5>
            <div className="border rounded p-2 bg-light mentorDetailNote">
              {mentor.notes ? (
                <p className="mentorDetailText">{mentor.notes}</p>
              ) : (
                <p className="text-muted mentorDetailText">No notes added yet.</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminMentorDetail;
