import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/AdminFeedbackCourseRatings.css";

const API_BASE_URL = "https://learning-hub-p2yq.onrender.com/api/feedback"; // Replace with your backend URL

const AdminFeedbackCourseRatings = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState({
    course: "",
    mentor: "",
    review: "",
    rating: 1,
    sentiment: "Positive",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Load feedbacks on mount
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const res = await axios.put(`${API_BASE_URL}/${editingId}`, feedback);
        setFeedbacks((prev) =>
          prev.map((f) => (f._id === editingId ? res.data : f))
        );
        setIsEditing(false);
        setEditingId(null);
      } else {
        const res = await axios.post(`${API_BASE_URL}`, feedback);
        setFeedbacks([res.data, ...feedbacks]);
      }

      setFeedback({
        course: "",
        mentor: "",
        review: "",
        rating: 1,
        sentiment: "Positive",
      });
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setFeedbacks(feedbacks.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const editFeedback = (data) => {
    setFeedback(data);
    setIsEditing(true);
    setEditingId(data._id);
  };

  return (
    <div className="FB-main">
      <h1 className="FB-title">Feedback & Course Ratings</h1>
      <p className="FB-subtitle">
        Collect course reviews & mentor feedback.
        <br />
        Analyze sentiment on student feedback.
      </p>

      <form className="FB-form" onSubmit={handleSubmit}>
        <input
          name="course"
          placeholder="Course Name"
          value={feedback.course}
          onChange={handleChange}
          required
        />
        <input
          name="mentor"
          placeholder="Mentor Name"
          value={feedback.mentor}
          onChange={handleChange}
          required
        />
        <textarea
          name="review"
          placeholder="Write your feedback..."
          value={feedback.review}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={feedback.rating}
          onChange={handleChange}
          required
        />
        <select
          name="sentiment"
          value={feedback.sentiment}
          onChange={handleChange}
        >
          <option>Positive</option>
          <option>Neutral</option>
          <option>Negative</option>
        </select>
        <button type="submit">
          {isEditing ? "Update Feedback" : "Submit Feedback"}
        </button>
      </form>

      <div className="FB-list">
        <h2 className="FB-section-title">All Feedback</h2>
        {feedbacks.length === 0 ? (
          <p className="FB-empty">No feedback submitted yet.</p>
        ) : (
          <table className="FB-table">
            <thead>
              <tr className="ST-tr">
                <th>Course</th>
                <th>Mentor</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Sentiment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f) => (
                <tr key={f._id}>
                  <td>{f.course}</td>
                  <td>{f.mentor}</td>
                  <td>{f.review}</td>
                  <td>{f.rating}</td>
                  <td>{f.sentiment}</td>
                  <td>
                    <button onClick={() => editFeedback(f)}>Edit</button>
                    <button onClick={() => deleteFeedback(f._id)}>
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

export default AdminFeedbackCourseRatings;
