import { useEffect, useState } from "react";
import axios from "axios";
import "../style/AdminCommissionPayouts.css";

const API_BASE =
  "https://learning-hub-p2yq.onrender.com/api/commission-payouts"; // or your deployed backend URL

const AdminCommissionPayouts = () => {
  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Instructor Payout");
  const [status, setStatus] = useState("Pending");
  const [editingId, setEditingId] = useState(null);

  // Fetch all transactions on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${API_BASE}`);
      setTransactions(res.data);
    } catch (error) {
      console.error("Failed to fetch payouts:", error);
    }
  };

  const addOrUpdateTransaction = async () => {
    if (!name || !amount) return;

    const data = { name, amount, type, status };

    try {
      if (editingId) {
        // Update
        await axios.put(`${API_BASE}/${editingId}`, data);
      } else {
        // Add new
        await axios.post(`${API_BASE}`, data);
      }

      fetchTransactions(); // Refresh data
      resetForm();
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const editTransaction = (transaction) => {
    setName(transaction.name);
    setAmount(transaction.amount);
    setType(transaction.type);
    setStatus(transaction.status);
    setEditingId(transaction._id);
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setAmount("");
    setType("Instructor Payout");
    setStatus("Pending");
    setEditingId(null);
  };

  return (
    <div className="commission-container">
      <h2>Commission & Payouts</h2>

      {/* Form for Adding/Editing Transactions */}
      <div className="commission-form">
        <input
          type="text"
          placeholder="Recipient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Instructor Payout">Instructor Payout</option>
          <option value="Affiliate Commission">Affiliate Commission</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Paid">Paid</option>
        </select>
        <button className="d-btn" onClick={addOrUpdateTransaction}>
          {editingId ? "Update" : "Add"} Transaction
        </button>
      </div>

      {/* List of Transactions */}
      <div className="commission-list">
        {transactions.length === 0 ? (
          <p>No commission or payout records</p>
        ) : (
          transactions.map((t) => (
            <div className="commission-card" key={t._id}>
              <p>
                <strong>Name:</strong> {t.name}
              </p>
              <p>
                <strong>Amount:</strong> ₹{t.amount}
              </p>
              <p>
                <strong>Type:</strong> {t.type}
              </p>
              <p>
                <strong>Status:</strong> {t.status}
              </p>
              <button className="edit-btn" onClick={() => editTransaction(t)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTransaction(t._id)}
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

export default AdminCommissionPayouts;
