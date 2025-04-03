import React from 'react'
import DashboardAdmin from "../components/DashboardAdmin"
import DUsers from './dUser'
import Courses from './Courses'
import Finances from './Finances'
import Report from './Report'
import Supports from './Supports'
import Setting from './Setting'
import LeadList from './LeadList'
import LeadDetails from './LeadDetails'
import LeadForm from './LeadForm'
import AssignLead from './AssignLead'


const Dashboard = () => {
  return (
    <div>
      {/* Lead Management  */}
      <DashboardAdmin />
      <LeadList />
      <LeadDetails />
      <AssignLead />
      <LeadForm />

      
    <DUsers />
    <Courses />
    <Finances />
    <Report />
    <Supports />
    {/* <Setting /> */}
      
    </div>
  )
}

export default Dashboard
