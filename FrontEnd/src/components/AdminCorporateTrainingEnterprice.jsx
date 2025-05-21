import React from 'react'
import AdminCorporateClientForm from './AdminCorporateClientForm'
import AdminHRAndEmployeeTraining from './AdminHRAndEmployeeTraining'
import AdminCustomLearningPaths from './AdminCustomLearningPaths'


const AdminCorporateTrainingEnterprice = () => {
  return (
    <div>
      {/* <h3>Corporate Training & Enterprise Solutions</h3> */}
      <AdminCorporateClientForm />
      <AdminHRAndEmployeeTraining />
      <AdminCustomLearningPaths />
      
    </div>
  )
}

export default AdminCorporateTrainingEnterprice
