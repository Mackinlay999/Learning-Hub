import React from 'react'
import LeadList from './LeadList'
import LeadDetails from './LeadDetails'
import LeadForm from './LeadForm'
import StudentEnroll from "./StudentEnroll"
import AttendanceTracking from './AttendenceTracking'


const LeadAndStudentManagement = () => {
  return (
    <div>
      <h3>Lead & Student Management</h3>
      <LeadList />
      <LeadDetails />
      <StudentEnroll />
      <AttendanceTracking />
      {/* <AssignLead /> */}
    
    </div>
  )
}

export default LeadAndStudentManagement
