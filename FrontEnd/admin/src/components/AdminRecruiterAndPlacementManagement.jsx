import React from 'react'
import AdminJobPostingAndRecruiter from './AdminJobPostingAndRecruiter'
import AdminPlacementAssistanceTracking from './AdminPlacementAssistanceTracking'
import AdminAlumniNetworking from './AdminAlumniNetworking'

const AdminRecruiterAndPlacementManagement = () => {
  return (
    <div>
      <h3>Recruiter & Placement Management</h3>
      <AdminJobPostingAndRecruiter />
      <AdminPlacementAssistanceTracking />
      <AdminAlumniNetworking />
    </div>
  )
}

export default AdminRecruiterAndPlacementManagement
