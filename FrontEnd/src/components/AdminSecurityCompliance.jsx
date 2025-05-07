import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./styles.css";

const AdminSecurityCompliance = () => {
  // ---------------- State Variables ----------------
  const [roles, setRoles] = useState([]);
  const [roleForm, setRoleForm] = useState({ name: "", permissions: "" });
  const [logs, setLogs] = useState([]);
  const [secret, setSecret] = useState(null);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  // ---------------- Role & Permission ----------------
  const fetchRoles = async () => {
    const res = await axios.get("/api/roles");
    setRoles(res.data);
  };

  const createRole = async (e) => {
    e.preventDefault();
    await axios.post("/api/roles", {
      name: roleForm.name,
      permissions: roleForm.permissions.split(",").map(p => p.trim()),
    });
    setRoleForm({ name: "", permissions: "" });
    fetchRoles();
  };

  const deleteRole = async (id) => {
    await axios.delete(`/api/roles/${id}`);
    fetchRoles();
  };

  // ---------------- Audit Logs ----------------
  const fetchLogs = async () => {
    const res = await axios.get("/api/audit-logs");
    setLogs(res.data);
  };

  // ---------------- Two-Factor Auth ----------------
  const generateSecret = async () => {
    const res = await axios.get("/api/2fa/generate");
    setSecret(res.data);
  };

  const verifyToken = async () => {
    try {
      const res = await axios.post("/api/2fa/verify", {
        token,
        secret: secret.base32,
      });
      setMessage(res.data.message || "2FA Verified ✅");
    } catch {
      setMessage("❌ Invalid Token");
    }
  };

  // ---------------- Load on Mount ----------------
  useEffect(() => {
    fetchRoles();
    fetchLogs();
  }, []);

  return (
    <div className="box">
      <h1>🔐 Security & Compliance Panel</h1>

      {/* Roles & Permissions */}
      <section>
        <h2>✅ Security Levels & Permissions</h2>
        <form onSubmit={createRole}>
          <input
            placeholder="Role Name"
            value={roleForm.name}
            onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
          />
          <input
            placeholder="Permissions (comma-separated)"
            value={roleForm.permissions}
            onChange={(e) =>
              setRoleForm({ ...roleForm, permissions: e.target.value })
            }
          />
          <button type="submit">Add Role</button>
        </form>
        <ul>
          {roles.map((role) => (
            <li key={role._id}>
              <strong>{role.name}</strong>: {role.permissions.join(", ")}
              <button onClick={() => deleteRole(role._id)}>🗑</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Audit Logs */}
      <section>
        <h2>📜 Audit Logs</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td>{log.userId?.name || "Unknown"}</td>
                <td>{log.action}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 2FA Setup */}
      <section>
        <h2>🔐 Two-Factor Authentication Setup</h2>
        {!secret ? (
          <button onClick={generateSecret}>Generate Secret</button>
        ) : (
          <div>
            <p><strong>Secret:</strong> {secret.base32}</p>
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter OTP token"
            />
            <button onClick={verifyToken}>Verify</button>
            <p>{message}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminSecurityCompliance;
