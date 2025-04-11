import React from 'react'
import LeadList from './LeadList'
import LeadDetails from './LeadDetails'
import LeadForm from './LeadForm'
import StudentEnroll from "./StudentEnroll"
import AttendanceProgressTracking from './AttendanceProgressTracking'
import SecurityCompliance from './SecurityCompliance'
import WebsiteContentManager from './WebsiteContentManager'

import AdminManagement from './AdminManagement'




const LeadAndStudentManagement = () => {
  return (
    <div>
       <h3>Lead & Student Management</h3>

 {/* <AdminManagement />

 <SecurityCompliance />
 <WebsiteContentManager /> */}



{
      <LeadList /> }
      <LeadDetails />
      <StudentEnroll />
      <AttendanceProgressTracking />
      
    </div>
  )
}

export default LeadAndStudentManagement
