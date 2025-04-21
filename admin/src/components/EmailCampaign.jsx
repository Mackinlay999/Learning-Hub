import React from 'react'
import CampaignBuilder from './CampaignBuilder'
import ScheduleEmail from './ScheduleEmail'
import DripCampaignView from './DripCampaignView'
import EmailAnalytics from './EmailAnalytics'

const EmailCampaign = () => {
  return (
    <div>
      
      
    
        <CampaignBuilder />
  
      
        <ScheduleEmail />
  
     
        <DripCampaignView/>
   
{/*      
        <EmailAnalytics /> */}
      
   
    </div>
  )
}

export default EmailCampaign
