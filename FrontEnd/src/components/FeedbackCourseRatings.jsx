import React, { useState } from "react";
import "../style/FeedbackCourseRatings.css";

const FeedbackCourseRatings = () => {
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

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setFeedbacks(
        feedbacks.map((f) =>
          f.id === editingId ? { ...feedback, id: editingId } : f
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newFeedback = { ...feedback, id: Date.now() };
      setFeedbacks([...feedbacks, newFeedback]);
    }

    setFeedback({
      course: "",
      mentor: "",
      review: "",
      rating: 1,
      sentiment: "Positive",
    });
  };

  const deleteFeedback = (id) => {
    setFeedbacks(feedbacks.filter((f) => f.id !== id));
  };

  const editFeedback = (data) => {
    setFeedback(data);
    setIsEditing(true);
    setEditingId(data.id);
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
        <select name="sentiment" value={feedback.sentiment} onChange={handleChange}>
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
              <tr>
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
                <tr key={f.id}>
                  <td>{f.course}</td>
                  <td>{f.mentor}</td>
                  <td>{f.review}</td>
                  <td>{f.rating}</td>
                  <td>{f.sentiment}</td>
                  <td>
                    <button onClick={() => editFeedback(f)}>Edit</button>
                    <button onClick={() => deleteFeedback(f.id)}>Delete</button>
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

export default FeedbackCourseRatings;
