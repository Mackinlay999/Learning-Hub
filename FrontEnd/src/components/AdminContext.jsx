import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    const storedAdmins = JSON.parse(localStorage.getItem("admins")) || [];
    setAdmins(storedAdmins);
  }, []);

  useEffect(() => {
    localStorage.setItem("admins", JSON.stringify(admins));
  }, [admins]);

  const addOrUpdateAdmin = (admin, index = null) => {
    const updatedAdmins = [...admins];
    if (index !== null) {
      updatedAdmins[index] = admin;
      logAction(`Updated admin: ${admin.name}`);
    } else {
      updatedAdmins.push(admin);
      logAction(`Added admin: ${admin.name}`);
    }
    setAdmins(updatedAdmins);
  };

  const deleteAdmin = (index) => {
    const removed = admins[index];
    const updatedAdmins = admins.filter((_, i) => i !== index);
    setAdmins(updatedAdmins);
    logAction(`Deleted admin: ${removed.name}`);
  };

  const logAction = (action) => {
    const newLog = {
      _id: Date.now(),
      userId: { name: "Super Admin" },
      action,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  return (
    <AdminContext.Provider
      value={{ admins, addOrUpdateAdmin, deleteAdmin, auditLogs }}
    >
      {children}
    </AdminContext.Provider>
  );
};
