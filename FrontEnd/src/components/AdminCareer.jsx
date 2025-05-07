import React from 'react'
import AdminJobBoards from './AdminJobBoread'
import AdminCareerReportForm from "./AdminCareerReportForm"
import AdminCareerCarousel from "./AdminCareerCarosel"
import AdminCareerPrep from "./Admincareer.Prep"
import AdminNetworkingSession from './AdminNetworkSession'
import AdminTestimonial from "./AdminTestimonial"
import AdminCareerFooter from "./AdminCareerFooter"
import AdminFilterForm from './AdminFilterForm'
import AdminFacultyMentor from "./AdminFaculty&Mentor"
import AdminCareerSupport from "./AdminCareerSupport"
import AdminProgramTraning from "./AdminProgramTraning"
import AdminAdmissionsEnrollment from "./AdminAdmissionsEnrollment"
import AdminCorporateTraining from "./AdminCorporateTraining"

function AdminCareer() {
  return (
    <div>
      <AdminCareerSupport />
    
        
    <AdminFilterForm />
   <AdminJobBoards />
   <AdminFacultyMentor />
    <AdminCareerReportForm />
    {/* <AdminCareerCarousel /> */}
    <AdminProgramTraning />
    < AdminAdmissionsEnrollment />
    <AdminCorporateTraining />
    <AdminCareerPrep />
    <AdminNetworkingSession />
    <AdminTestimonial />
    <AdminCareerFooter />
   
    </div>
  
   
  )
}

export default AdminCareer