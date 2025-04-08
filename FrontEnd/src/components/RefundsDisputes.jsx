import { useState } from "react";
import "../style/RefundsDisputes.css";

const RefundsDisputes = () => {
  const [refunds, setRefunds] = useState([]);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editingIndex, setEditingIndex] = useState(null);

  const addOrUpdateRefund = () => {
    if (!amount || !reason) return;

    if (editingIndex !== null) {
      // Update refund request
      const updatedRefunds = refunds.map((r, index) =>
        index === editingIndex ? { ...r, amount, reason, status } : r
      );
      setRefunds(updatedRefunds);
      setEditingIndex(null);
    } else {
      // Add new refund request
      setRefunds([...refunds, { amount, reason, status }]);
    }

    // Reset form
    setAmount("");
    setReason("");
    setStatus("Pending");
  };

  const editRefund = (index) => {
    const r = refunds[index];
    setAmount(r.amount);
    setReason(r.reason);
    setStatus(r.status);
    setEditingIndex(index);
  };

  const deleteRefund = (index) => {
    setRefunds(refunds.filter((_, i) => i !== index));
  };

  return (
    <div className="refunds-container">
      <h2>Refunds & Disputes Handling</h2>

      {/* Refund Form */}
      <div className="refund-form">
        <input
          type="number"
          placeholder="Refund Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Reason for Refund"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Resolved">Resolved</option>
        </select>
        <button className="d-btn" onClick={addOrUpdateRefund}>
          {editingIndex !== null ? "Update" : "Submit"} Refund Request
        </button>
      </div>

      {/* Refund List */}
      <div className="refund-list">
        {refunds.length === 0 ? (
          <p>No refund requests</p>
        ) : (
          refunds.map((r, index) => (
            <div className="refund-card" key={index}>
              <p><strong>Amount:</strong> ₹{r.amount}</p>
              <p><strong>Reason:</strong> {r.reason}</p>
              <p><strong>Status:</strong> {r.status}</p>
              <button className="edit-btn" onClick={() => editRefund(index)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteRefund(index)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RefundsDisputes;
