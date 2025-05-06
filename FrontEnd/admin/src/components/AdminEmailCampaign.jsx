import React from 'react'
import AdminCampaignBuilder from './AdminCampaignBuilder'
import AdminScheduleEmail from './AdminScheduleEmail'
import AdminDripCampaignView from './AdminDripCampaignView'
import AdminEmailAnalytics from './AdminEmailAnalytics'

const AdminEmailCampaign = () => {
  return (
    <div>
      
      
    
        <AdminCampaignBuilder />
  
{/*       
        <AdminScheduleEmail /> */}
  
     
        <AdminDripCampaignView/>
   
{/*      
        <AdminEmailAnalytics /> */}
      
   
    </div>
  )
}

export default AdminEmailCampaign
