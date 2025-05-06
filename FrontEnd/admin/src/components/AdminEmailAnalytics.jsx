import React, { useState } from 'react';
import "../style/AdminEmailAnalytics.css"

const AdminEmailAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    openRate: 68,
    ctr: 24,
    conversions: 35,
  });

  const [newData, setNewData] = useState({
    openRate: '',
    ctr: '',
    conversions: '',
  });

  const handleUpdateAnalytics = () => {
    setAnalytics({
      openRate: newData.openRate || analytics.openRate,
      ctr: newData.ctr || analytics.ctr,
      conversions: newData.conversions || analytics.conversions,
    });
    setNewData({ openRate: '', ctr: '', conversions: '' });
  };

  return (
    <div className="email-card">
      <h2 className="email-title">📊 Email Analytics</h2>

      <div className="email-form-group">
        <input
          className="email-input"
          type="number"
          placeholder="Open Rate (%)"
          value={newData.openRate}
          onChange={(e) => setNewData({ ...newData, openRate: e.target.value })}
        />
        <input
          className="email-input"
          type="number"
          placeholder="CTR (%)"
          value={newData.ctr}
          onChange={(e) => setNewData({ ...newData, ctr: e.target.value })}
        />
        <input
          className="email-input"
          type="number"
          placeholder="Conversions"
          value={newData.conversions}
          onChange={(e) =>
            setNewData({ ...newData, conversions: e.target.value })
          }
        />
        <button className="email-button" onClick={handleUpdateAnalytics}>
          Update Analytics
        </button>
      </div>

      <div className="email-stats">
        <p>
          <strong>Open Rate:</strong> {analytics.openRate}%
        </p>
        <p>
          <strong>Click-Through Rate (CTR):</strong> {analytics.ctr}%
        </p>
        <p>
          <strong>Conversions:</strong> {analytics.conversions}
        </p>
      </div>
    </div>
  );
};

export default AdminEmailAnalytics;
