import React from 'react'
import AdminRealTimeInsightsDashboard from './AdminRealTimeInsightsDashboard'
import AdminCustomReportsAndDataExports from './AdminCustomReportsAndDataExports'
import AdminAIBasedDecision from './AdminAIBasedDecision'

const AdminAnalyticsAndReports = () => {
  return (
    <div>
      {/* <h3>Analytics & Reports</h3> */}
      <AdminRealTimeInsightsDashboard />
      <AdminCustomReportsAndDataExports />
      <AdminAIBasedDecision />
    </div>
  )
}

export default AdminAnalyticsAndReports
