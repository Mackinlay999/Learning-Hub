import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/AdminAIBasedDecision.css";

const AdminAdmissionsEnrollment = () => {
  const [insights, setInsights] = useState([]);
  const [insight, setInsight] = useState({
    customerSegment: "",
    churnPrediction: "",
    retentionStrategy: "",
    leadPriority: "Low",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Update with your own backend base URL
  const BASE_URL =
    "https://learning-hub-p2yq.onrender.com/api/decision-insights";

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setInsights(res.data);
    } catch (err) {
      console.error("Error fetching insights:", err.message);
    }
  };

  const handleChange = (e) => {
    setInsight({ ...insight, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${BASE_URL}/${editingId}`, insight);
        setIsEditing(false);
        setEditingId(null);
      } else {
        await axios.post(BASE_URL, insight);
      }
      setInsight({
        customerSegment: "",
        churnPrediction: "",
        retentionStrategy: "",
        leadPriority: "Low",
      });
      fetchInsights();
    } catch (err) {
      console.error("Error submitting insight:", err.message);
    }
  };

  const deleteInsight = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchInsights();
    } catch (err) {
      console.error("Error deleting insight:", err.message);
    }
  };

  const editInsight = (item) => {
    setInsight({
      customerSegment: item.customerSegment,
      churnPrediction: item.churnPrediction,
      retentionStrategy: item.retentionStrategy,
      leadPriority: item.leadPriority,
    });
    setIsEditing(true);
    setEditingId(item._id);
  };

  return (
    <div className="AI-main">
      <h1 className="AI-title">AI-Based Decision Making</h1>
      <p className="AI-subtitle">
        Predict churn rate & recommend retention strategies.
        <br />
        Automated lead prioritization for sales teams.
      </p>

      <form className="AI-form" onSubmit={handleSubmit}>
        <input
          name="customerSegment"
          placeholder="Customer Segment"
          value={insight.customerSegment}
          onChange={handleChange}
          required
        />
        <input
          name="churnPrediction"
          placeholder="Predicted Churn Rate (%)"
          type="number"
          min="0"
          max="100"
          value={insight.churnPrediction}
          onChange={handleChange}
          required
        />
        <textarea
          name="retentionStrategy"
          placeholder="Retention Strategy"
          value={insight.retentionStrategy}
          onChange={handleChange}
          required
        ></textarea>
        <select
          name="leadPriority"
          value={insight.leadPriority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button type="submit">
          {isEditing ? "Update Insight" : "Add Insight"}
        </button>
      </form>

      <div className="AI-list">
        <h2 className="AI-section-title">AI Insights</h2>
        {insights.length === 0 ? (
          <p className="AI-empty">No insights available.</p>
        ) : (
          <table className="AI-table">
            <thead>
              <tr className="ST-tr">
                <th>Segment</th>
                <th>Churn %</th>
                <th>Strategy</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {insights.map((item) => (
                <tr key={item._id}>
                  <td>{item.customerSegment}</td>
                  <td>{item.churnPrediction}%</td>
                  <td>{item.retentionStrategy}</td>
                  <td>{item.leadPriority}</td>
                  <td>
                    <button onClick={() => editInsight(item)}>Edit</button>
                    <button onClick={() => deleteInsight(item._id)}>
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

export default AdminAdmissionsEnrollment;
