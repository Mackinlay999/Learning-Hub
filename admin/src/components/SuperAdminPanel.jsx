import React from 'react'
import SecurityCompliance from './SecurityCompliance'
import WebsiteContentManager from './WebsiteContentManager'

import AdminManagement from './AdminManagement'

const SuperAdminPanel = () => {
  return (
    <div>
     
      <h1>Super Admin Panel</h1>
      <AdminManagement />

 {/* <SecurityCompliance /> */}
 {/* <WebsiteContentManager /> */}
    </div>
  )
}

export default SuperAdminPanel
