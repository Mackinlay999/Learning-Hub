import React from 'react'
import EmailCampaign from './EmailCampaign'
import SalesFunnelConversion from './SalesFunnelConversion'
import DiscountsPromotions from './DiscountsPromotions'

const EMailMarketing = () => {
  return (
    <div>
      <h3>E-Mail Marketing</h3>

      {/* <EmailCampaigns /> */}
      <EmailCampaign />
      {/* <SalesFunnelConversion /> */}
      <DiscountsPromotions />
    </div>
  )
}

export default EMailMarketing
