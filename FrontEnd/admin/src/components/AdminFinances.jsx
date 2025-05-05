import { useState } from "react";
import "../style/AdminFinances.css"

const AdminFinances= () => {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Course Payment - React Basics", amount: 150, status: "Paid" },
    { id: 2, description: "Course Payment - Node.js Advanced", amount: 200, status: "Pending" },
  ]);
  const [newTransaction, setNewTransaction] = useState({ description: "", amount: "", status: "" });

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.status) return;
    setTransactions([...transactions, { id: transactions.length + 1, ...newTransaction }]);
    setNewTransaction({ description: "", amount: "", status: "" });
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <div className="finance">
      <h1 className="page-title">Finance Management</h1>
      <div className="finance-form">
        <input
          type="text"
          placeholder="Description"
          value={newTransaction.description}
          onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
        />
        <select
          value={newTransaction.status}
          onChange={(e) => setNewTransaction({ ...newTransaction, status: e.target.value })}
        >
          <option value="">Select Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
        <button className="add-transaction" onClick={handleAddTransaction}>Add Transaction</button>
      </div>
      <table className="finance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.description}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.status}</td>
              <td>
                <button className="delete" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminFinances;