import { useState } from "react";
import "../style/CommissionPayouts.css";

const CommissionPayouts = () => {
  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Instructor Payout");
  const [status, setStatus] = useState("Pending");
  const [editingIndex, setEditingIndex] = useState(null);

  const addOrUpdateTransaction = () => {
    if (!name || !amount) return;

    if (editingIndex !== null) {
      // Update existing transaction
      const updatedTransactions = transactions.map((t, index) =>
        index === editingIndex ? { ...t, name, amount, type, status } : t
      );
      setTransactions(updatedTransactions);
      setEditingIndex(null);
    } else {
      // Add new transaction
      setTransactions([...transactions, { name, amount, type, status }]);
    }

    // Reset form
    setName("");
    setAmount("");
    setType("Instructor Payout");
    setStatus("Pending");
  };

  const editTransaction = (index) => {
    const t = transactions[index];
    setName(t.name);
    setAmount(t.amount);
    setType(t.type);
    setStatus(t.status);
    setEditingIndex(index);
  };

  const deleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  return (
    <div className="commission-container">
      <h2>Commission & Payouts</h2>

      {/* Form for Adding Transactions */}
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
        <button onClick={addOrUpdateTransaction}>
          {editingIndex !== null ? "Update" : "Add"} Transaction
        </button>
      </div>

      {/* List of Transactions */}
      <div className="commission-list">
        {transactions.length === 0 ? (
          <p>No commission or payout records</p>
        ) : (
          transactions.map((t, index) => (
            <div className="commission-card" key={index}>
              <p><strong>Name:</strong> {t.name}</p>
              <p><strong>Amount:</strong> ₹{t.amount}</p>
              <p><strong>Type:</strong> {t.type}</p>
              <p><strong>Status:</strong> {t.status}</p>
              <button className="edit-btn" onClick={() => editTransaction(index)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteTransaction(index)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommissionPayouts;
