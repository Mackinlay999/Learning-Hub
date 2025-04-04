import React from 'react'
import Finances from './Finances'
import Report from './Report'
import Transaction from './Transaction'
import RefundsDisputes from './RefundsDisputes'
import CommissionPayouts from './CommissionPayouts'

const FinanceAndPayment = () => {
  return (
    <div>
        <h3>Finance & Payment Management </h3>
        <Transaction />
        <RefundsDisputes />
        <CommissionPayouts />
        {/* <Finances />
        <Report /> */}
    </div>
  )
}

export default FinanceAndPayment
