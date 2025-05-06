import React from 'react'
import AdminLeadList from './AdminLeadList'
import AdminLeadDetails from './AdminLeadDetails'
import AdminLeadForm from './AdminLeadForm'
import AdminStudentEnroll from "./AdminStudentEnroll"
import AdminAttendanceProgressTracking from './AdminAttendanceProgressTracking'
import AdminSecurityCompliance from './AdminSecurityCompliance'
import AdminWebsiteContentManager from './AdminWebsiteContentManager'

import AdminManagement from './AdminManagement'
import AdminLeadsByDate from './AdminLeadByDate'





const AdminLeadAndStudentManagement = () => {
  return (
    <div>
       <h3>Lead & Student Management</h3>

 {/* <AdminManagement />

 <AdminSecurityCompliance />
 <AdminWebsiteContentManager /> */}



{
      <AdminLeadList /> }
      <AdminLeadDetails />
      <AdminStudentEnroll />
      <AdminAttendanceProgressTracking />
      {/* <AdminLeadsByDate /> */}
     
      
    </div>
  )
}

export default AdminLeadAndStudentManagement
