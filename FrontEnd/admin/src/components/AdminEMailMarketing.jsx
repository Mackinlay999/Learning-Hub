import React from 'react'
import AdminEmailCampaign from './AdminEmailCampaign'
import AdminSalesFunnelConversion from './AdminSalesFunnelConversion'
import AdminDiscountsPromotions from './AdminDiscountsPromotions'

const AdminEMailMarketing = () => {
  return (
    <div>
      <h3>E-Mail Marketing</h3>

      <AdminEmailCampaign />
     
      <AdminDiscountsPromotions />
    </div>
  )
}

export default AdminEMailMarketing
