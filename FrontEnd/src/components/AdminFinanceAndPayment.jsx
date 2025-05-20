import React from 'react'
import AdminFinances from './AdminFinances'
import AdminReport from './AdminReport'
import AdminTransaction from './AdminTransaction'
import AdminRefundsDisputes from './AdminRefundsDisputes'
import AdminCommissionPayouts from './AdminCommissionPayouts'

const AdminFinanceAndPayment = () => {
  return (
    <div>
        {/* <h3>Finance & Payment Management </h3> */}
        <AdminTransaction />
       
        <AdminCommissionPayouts />
        {/* <AdminFinances />
        <AdminReport /> */}
    </div>
  )
}

export default AdminFinanceAndPayment
