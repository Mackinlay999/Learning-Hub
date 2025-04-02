import React from 'react'
import DashboardAdmin from "../components/DashboardAdmin"
import DUsers from './dUser'
import Courses from './Courses'
import Finances from './Finances'
import Report from './Report'
import Supports from './Supports'
import Setting from './Setting'


const Dashboard = () => {
  return (
    <div>
      
      <DashboardAdmin />
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
