import { useEffect, useState } from "react";
import axios from "axios";
import "../style/AdminRefundsDisputes.css";

const AdminRefundsDisputes = () => {
  const [refunds, setRefunds] = useState([]);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null); // For backend update

  const API_URL = "https://learning-hub-p2yq.onrender.com/api/refunds"; // 🔁 Replace with actual backend URL

  // Fetch all refunds on load
  useEffect(() => {
    fetchRefunds();
  }, []);

  const fetchRefunds = async () => {
    try {
      const res = await axios.get(API_URL);
      setRefunds(res.data);
    } catch (error) {
      console.error("Error fetching refunds:", error);
    }
  };

  const addOrUpdateRefund = async () => {
    if (!amount || !reason) return;

    const refundData = { amount, reason, status };

    try {
      if (editingIndex !== null) {
        // Update refund
        await axios.put(`${API_URL}/${editingId}`, refundData);
      } else {
        // Add refund
        await axios.post(API_URL, refundData);
      }

      fetchRefunds();
      resetForm();
    } catch (error) {
      console.error("Error submitting refund:", error);
    }
  };

  const editRefund = (index) => {
    const r = refunds[index];
    setAmount(r.amount);
    setReason(r.reason);
    setStatus(r.status);
    setEditingIndex(index);
    setEditingId(r._id); // Set MongoDB _id for PUT
  };

  const deleteRefund = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchRefunds();
    } catch (error) {
      console.error("Error deleting refund:", error);
    }
  };

  const resetForm = () => {
    setAmount("");
    setReason("");
    setStatus("Pending");
    setEditingIndex(null);
    setEditingId(null);
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
            <div className="refund-card" key={r._id}>
              <p>
                <strong>Amount:</strong> ₹{r.amount}
              </p>
              <p>
                <strong>Reason:</strong> {r.reason}
              </p>
              <p>
                <strong>Status:</strong> {r.status}
              </p>
              <button className="edit-btn" onClick={() => editRefund(index)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteRefund(r._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminRefundsDisputes;
