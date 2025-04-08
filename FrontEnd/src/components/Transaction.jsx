import { useState } from "react";
import "../style/Transaction.css";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editingIndex, setEditingIndex] = useState(null);

  // Calculate Revenue Summary
  const totalRevenue = transactions.reduce((sum, t) => (t.status === "Paid" ? sum + Number(t.amount) : sum), 0);
  const pendingPayments = transactions.reduce((sum, t) => (t.status === "Pending" ? sum + Number(t.amount) : sum), 0);

  const addOrUpdateTransaction = () => {
    if (!amount || !paymentMode) return;

    if (editingIndex !== null) {
      // Update transaction
      const updatedTransactions = transactions.map((t, index) =>
        index === editingIndex ? { ...t, amount, paymentMode, status } : t
      );
      setTransactions(updatedTransactions);
      setEditingIndex(null);
    } else {
      // Add new transaction
      setTransactions([...transactions, { amount, paymentMode, status }]);
    }

    // Reset form
    setAmount("");
    setPaymentMode("");
    setStatus("Pending");
  };

  const editTransaction = (index) => {
    const t = transactions[index];
    setAmount(t.amount);
    setPaymentMode(t.paymentMode);
    setStatus(t.status);
    setEditingIndex(index);
  };

  const deleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
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
        <button  className="d-btn" onClick={addOrUpdateTransaction}>
          {editingIndex !== null ? "Update" : "Add"} Transaction
        </button>
      </div>

      {/* Transaction List */}
      <div className="transaction-list">
        {transactions.length === 0 ? (
          <p>No transactions available</p>
        ) : (
          transactions.map((t, index) => (
            <div className="transaction-card" key={index}>
              <p><strong>Amount:</strong> ₹{t.amount}</p>
              <p><strong>Payment Mode:</strong> {t.paymentMode}</p>
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

export default Transaction;
