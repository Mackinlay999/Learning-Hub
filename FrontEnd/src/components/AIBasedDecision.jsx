import React, { useState } from "react";
import "../style/AIBasedDecision.css";

const AIBasedDecision= () => {
  const [insights, setInsights] = useState([]);
  const [insight, setInsight] = useState({
    customerSegment: "",
    churnPrediction: "",
    retentionStrategy: "",
    leadPriority: "Low",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setInsight({ ...insight, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setInsights(
        insights.map((item) =>
          item.id === editingId ? { ...insight, id: editingId } : item
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newInsight = { ...insight, id: Date.now() };
      setInsights([...insights, newInsight]);
    }

    setInsight({
      customerSegment: "",
      churnPrediction: "",
      retentionStrategy: "",
      leadPriority: "Low",
    });
  };

  const deleteInsight = (id) => {
    setInsights(insights.filter((item) => item.id !== id));
  };

  const editInsight = (item) => {
    setInsight(item);
    setIsEditing(true);
    setEditingId(item.id);
  };

  return (
    <div className="AI-main">
      <h1 className="AI-title">AI-Based Decision Making</h1>
      <p className="AI-subtitle">
        Predict churn rate & recommend retention strategies.<br />
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
        <select name="leadPriority" value={insight.leadPriority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button type="submit">{isEditing ? "Update Insight" : "Add Insight"}</button>
      </form>

      <div className="AI-list">
        <h2 className="AI-section-title">AI Insights</h2>
        {insights.length === 0 ? (
          <p className="AI-empty">No insights available.</p>
        ) : (
          <table className="AI-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Churn %</th>
                <th>Strategy</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {insights.map((item) => (
                <tr key={item.id}>
                  <td>{item.customerSegment}</td>
                  <td>{item.churnPrediction}%</td>
                  <td>{item.retentionStrategy}</td>
                  <td>{item.leadPriority}</td>
                  <td>
                    <button onClick={() => editInsight(item)}>Edit</button>
                    <button onClick={() => deleteInsight(item.id)}>Delete</button>
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

export default AIBasedDecision;
