import { useState, useEffect } from "react";
import axios from "axios";
import "../style/Transaction.css";

// 🔗 Backend base URL
const BASE_URL = "http://localhost:3000/api/transactions"; // Change this to your backend

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch all transactions on component mount
  useEffect(() => {
    axios.get(BASE_URL)
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  // ✅ Calculate Revenue Summary
  const totalRevenue = transactions.reduce(
    (sum, t) => (t.status === "Paid" ? sum + Number(t.amount) : sum),
    0
  );
  const pendingPayments = transactions.reduce(
    (sum, t) => (t.status === "Pending" ? sum + Number(t.amount) : sum),
    0
  );

  // ✅ Add or Update transaction
  const addOrUpdateTransaction = async () => {
    if (!amount || !paymentMode) return;

    const newTransaction = { amount, paymentMode, status };

    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/${editingId}`, newTransaction);
      } else {
        await axios.post(BASE_URL, newTransaction);
      }
      const res = await axios.get(BASE_URL); // Refresh list
      setTransactions(res.data);
    } catch (err) {
      console.error("Add/Update Error:", err);
    }

    // Reset form
    setAmount("");
    setPaymentMode("");
    setStatus("Pending");
    setEditingId(null);
  };

  // ✅ Edit transaction
  const editTransaction = (t) => {
    setAmount(t.amount);
    setPaymentMode(t.paymentMode);
    setStatus(t.status);
    setEditingId(t._id);
  };

  // ✅ Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      const res = await axios.get(BASE_URL);
      setTransactions(res.data);
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="transactions-container">
      <h2>Transactions & Revenue Dashboard</h2>

      {/* Revenue Summary */}
      <div className="revenue-summary">
        <p><strong>Total Revenue:</strong> ₹{totalRevenue}</p>
        <p><strong>Pending Payments:</strong> ₹{pendingPayments}</p>
      </div>

      {/* Transaction Form */}
      <div className="transaction-form">
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
          <option value="">Select Payment Mode</option>
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="PayPal">PayPal</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
        <button className="d-btn" onClick={addOrUpdateTransaction}>
          {editingId ? "Update" : "Add"} Transaction
        </button>
      </div>

      {/* Transaction List */}
      <div className="transaction-list">
        {transactions.length === 0 ? (
          <p>No transactions available</p>
        ) : (
          transactions.map((t) => (
            <div className="transaction-card" key={t._id}>
              <p><strong>Amount:</strong> ₹{t.amount}</p>
              <p><strong>Payment Mode:</strong> {t.paymentMode}</p>
              <p><strong>Status:</strong> {t.status}</p>
              <button className="edit-btn" onClick={() => editTransaction(t)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteTransaction(t._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Transaction;
