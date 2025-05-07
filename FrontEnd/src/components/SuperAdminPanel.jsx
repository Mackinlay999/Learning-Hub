import React from 'react'
import AdminSecurityCompliance from './AdminSecurityCompliance'
import AdminWebsiteContentManager from './AdminWebsiteContentManager'

import AdminManagement from './AdminManagement'

const SuperAdminPanel = () => {
  return (
    <div>
     
      <h1>Super Admin Panel</h1>
      <AdminManagement />

 {/* <AdminSecurityCompliance /> */}
 {/* <AdminWebsiteContentManager /> */}
    </div>
  )
}

export default SuperAdminPanel
