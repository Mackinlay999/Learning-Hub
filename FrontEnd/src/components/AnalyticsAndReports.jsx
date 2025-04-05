import React from 'react'
import RealTimeInsightsDashboard from './RealTimeInsightsDashboard'
import CustomReportsAndDataExports from './CustomReportsAndDataExports'
import AIBasedDecision from './AIBasedDecision'

const AnalyticsAndReports = () => {
  return (
    <div>
      <h3>Analytics & Reports</h3>
      <RealTimeInsightsDashboard />
      <CustomReportsAndDataExports />
      <AIBasedDecision />
    </div>
  )
}

export default AnalyticsAndReports
