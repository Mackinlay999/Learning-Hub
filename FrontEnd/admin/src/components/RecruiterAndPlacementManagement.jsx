import React from 'react'
import JobPostingAndRecruiter from './JobPostingAndRecruiter'
import PlacementAssistanceTracking from './PlacementAssistanceTracking'
import AlumniNetworking from './AlumniNetworking'

const RecruiterAndPlacementManagement = () => {
  return (
    <div>
      <h3>Recruiter & Placement Management</h3>
      <JobPostingAndRecruiter />
      <PlacementAssistanceTracking />
      <AlumniNetworking />
    </div>
  )
}

export default RecruiterAndPlacementManagement
