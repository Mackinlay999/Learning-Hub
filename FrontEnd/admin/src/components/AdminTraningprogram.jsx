import React from 'react'
import AdminCourses from './AdminCourses';
import AdminLiveSessions from './AdminLiveSession';
import AdminAssessmentsCertifications from './AdminAssessmentsCertifications';


const AdminTrainingprogram = () => {
  return (
    <div>
      <h3>Training Programs & Course Management</h3>
      <AdminCourses />
      <AdminLiveSessions />
      <AdminAssessmentsCertifications />
      
    </div>
  )
}

export default AdminTrainingprogram ;
