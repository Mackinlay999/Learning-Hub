

import React, { useEffect, useState } from 'react';
import axios from './axios';
import "../style/AdminLeadbydate.css";

const AdminLeadsByDate = () => {
  const [dailyLeads, setDailyLeads] = useState([]);

  useEffect(() => {
    axios.get('/getLeadsByDate')
      .then(res => setDailyLeads(res.data.totalLeadsByDate))
      .catch(err => console.error(err));
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };

  return (
    <div className="leads-by-date-container">
      <h2>📆 Daily Leads Overview</h2>
      <div className="table-wrapper">
        <table className="leads-table">
          <thead className='last-th'>
            <tr className='last-tr'>
              <th>Date</th>
              <th>Number of Leads</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {dailyLeads.map(day =>
              day.leads.map(lead => (
                <tr key={lead._id}>
                  <td>{formatDate(day._id)}</td>
                  <td>{day.totalLeads}</td>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.number}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeadsByDate;

