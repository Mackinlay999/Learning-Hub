

import { useState, useEffect } from "react";
import axios from "./axios";
import "../style/Transaction.css";

const Transaction = () => {
  // 💰 Transactions State
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  // 🔁 Refunds State

  const [refundUsername, setRefundUsername] = useState("");
  const [refundEmail, setRefundEmail] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refundStatus, setRefundStatus] = useState("Pending");
  const [refundEditingId, setRefundEditingId] = useState(null);

  // 🔄 Fetch data on mount
  useEffect(() => {
    fetchTransactions();
    fetchRefunds();
  }, []);

  // 📥 Fetch Transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/getRevenue");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // 📥 Fetch Refunds
  const fetchRefunds = async () => {
    try {
      const response = await axios.get("/getAllStudentRefunds");
      setRefunds(response.data);
    } catch (error) {
      console.error("Error fetching refunds:", error);
    }
  };

  // 📅 Filtered Transactions
  const filteredTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    const today = new Date();

    if (filter === "today") {
      return transactionDate.toDateString() === today.toDateString();
    }

    if (filter === "30days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return transactionDate >= thirtyDaysAgo;
    }

    return true;
  });

  // 💰 Totals
  const totalRevenue = filteredTransactions.reduce(
    (sum, t) => (t.status === "Paid" ? sum + Number(t.amount) : sum),
    0
  );

  const pendingPayments = filteredTransactions.reduce(
    (sum, t) => (t.status === "Pending" ? sum + Number(t.amount) : sum),
    0
  );

  // ➕ Add or Update Transaction
  const addOrUpdateTransaction = async () => {
    if (!username || !email || !amount || !paymentMode) return;

    const transactionData = {
      username,
      email,
      amount: Number(amount),
      paymentMode,
      status,
    };

    try {
      if (editingId) {
        await axios.put(`/updateRevenue/${editingId}`, transactionData);
      } else {
        await axios.post("/addRevenue", {
          ...transactionData,
          date: new Date().toISOString(),
        });
      }

      fetchTransactions();
      setUsername("");
      setEmail("");
      setAmount("");
      setPaymentMode("");
      setStatus("Pending");
      setEditingId(null);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  // ✏️ Edit Transaction
  const editTransaction = (t) => {
    setUsername(t.username);
    setEmail(t.email);
    setAmount(t.amount);
    setPaymentMode(t.paymentMode);
    setStatus(t.status);
    setEditingId(t._id);
  };

  // 🗑️ Delete Transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/deleteRevenue/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // ➕ Add or Update Refund
  const addOrUpdateRefund = async () => {
    if (!refundUsername || !refundEmail || !refundAmount || !refundReason) return;

    const refundData = {
      username: refundUsername,
      email: refundEmail,
      amount: Number(refundAmount),
      reason: refundReason,
      status: refundStatus,
    };

    try {
      if (refundEditingId) {
        await axios.put(`/updateStudentRefund/${refundEditingId}`, refundData);
      } else {
        await axios.post("/createStudentRefund", {
          ...refundData,
          date: new Date().toISOString(),
        });
      }

      fetchRefunds();
      setRefundUsername("");
      setRefundEmail("");
      setRefundAmount("");
      setRefundReason("");
      setRefundStatus("Pending");
      setRefundEditingId(null);
    } catch (error) {
      console.error("Error saving refund:", error);
    }
  };

  // ✏️ Edit Refund
  const editRefund = (r) => {
    setRefundUsername(r.username);
    setRefundEmail(r.email);
    setRefundAmount(r.amount);
    setRefundReason(r.reason);
    setRefundStatus(r.status);
    setRefundEditingId(r._id);
  };

  // 🗑️ Delete Refund
  const deleteRefund = async (id) => {
    try {
      await axios.delete(`/deleteStudentRefund/${id}`);
      fetchRefunds();
    } catch (error) {
      console.error("Error deleting refund:", error);
    }
  };


  const handleRefundRequest = (transaction) => {
    setRefundUsername(transaction.username);
    setRefundEmail(transaction.email);
    setRefundAmount(transaction.amount);
    setRefundReason("");  // Reset reason if not pre-filled
    setRefundStatus("Pending");  // Default status
    setRefundEditingId(null);  // No editing ID for new refunds
  };

  return (
    <div className="transactions-container">
      <h2>Transactions & Revenue Dashboard</h2>

      {/* 🔍 Filter */}
      <div className="filter-options">
        <label>Filter By: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="30days">Last 30 Days</option>
        </select>
      </div>

      {/* 📊 Summary */}
      <div className="revenue-summary">
        <p><strong>Total Revenue:</strong> ₹{totalRevenue}</p>
        <p><strong>Pending Payments:</strong> ₹{pendingPayments}</p>
      </div>

      {/* ➕ Transaction Form */}
      <div className="transaction-form">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} />
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

      {/* 📋 Transaction List */}
      <div className="transaction-list">
        {filteredTransactions.length === 0 ? (
          <p>No transactions available</p>
        ) : (
          filteredTransactions.map((t) => (
            <div className="transaction-card" key={t._id}>
              <p><strong>Username:</strong> {t.username}</p>
              <p><strong>Email:</strong> {t.email}</p>
              <p><strong>Amount:</strong> ₹{t.amount}</p>
              <p><strong>Payment Mode:</strong> {t.paymentMode}</p>
              <p><strong>Status:</strong> {t.status}</p>
              <p><strong>Date:</strong> {new Date(t.date).toLocaleDateString()}</p>
              <button className="edit-btn" onClick={() => editTransaction(t)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteTransaction(t._id)}>Delete</button>
              {/* <button className="refund-btn" onClick={() => handleRefundRequest(t)}>Refund</button> */}
            </div>
          ))
        )}
      </div>

      {/* 💸 Refund Section */}
      {/* <h2 className="refund">Refund Requests</h2> */}
      {/* <div className="refund-form">
        <input type="text" placeholder="Username" value={refundUsername} onChange={(e) => setRefundUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={refundEmail} onChange={(e) => setRefundEmail(e.target.value)} />
        <input type="number" placeholder="Refund Amount (₹)" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} />
        <input type="text" placeholder="Reason" value={refundReason} onChange={(e) => setRefundReason(e.target.value)} />
        <select value={refundStatus} onChange={(e) => setRefundStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button className="d-btn" onClick={addOrUpdateRefund}>
          {refundEditingId ? "Update" : "Submit"} Refund
        </button>
      </div> */}

      {/* 📋 Refund List */}
      {/* <div className="refund-list">
        {refunds.length === 0 ? (
          <p>No refund requests available</p>
        ) : (
          refunds.map((r) => (
            <div className="refund-card" key={r._id}>
              <p><strong>Username:</strong> {r.username}</p>
              <p><strong>Email:</strong> {r.email}</p>
              <p><strong>Amount:</strong> ₹{r.amount}</p>
              <p><strong>Reason:</strong> {r.reason}</p>
              <p><strong>Status:</strong> {r.status}</p>
              <p><strong>Date:</strong> {new Date(r.date).toLocaleDateString()}</p>
              <button className="edit-btn" onClick={() => editRefund(r)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteRefund(r._id)}>Delete</button>
            </div>
          ))
        )}
      </div> */}
    </div>
  );
};

export default Transaction;

