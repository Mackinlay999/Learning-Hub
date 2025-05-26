import React, { useEffect, useState } from 'react';
import axios from './axios';
import "../style/AdminLeadbydate.css";

const AdminLeadsByDate = () => {
  const [todayLeads, setTodayLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/getLeadsByDate')
      .then(res => {
        const allLeads = res.data.totalLeadsByDate;

        const today = new Date().toISOString().split('T')[0];
        const todayData = allLeads.find(day =>
          new Date(day._id).toISOString().split('T')[0] === today
        );

        setTodayLeads(todayData ? [todayData] : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="leads-by-date-container">
      <h2>📆 Today's Leads</h2>
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
            {todayLeads.length > 0 ? (
              todayLeads[0].leads.map(lead => (
                <tr key={lead._id}>
                  <td>{formatDate(todayLeads[0]._id)}</td>
                  <td>{todayLeads[0].totalLeads}</td>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.number}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  No leads found for today (0)
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeadsByDate;
