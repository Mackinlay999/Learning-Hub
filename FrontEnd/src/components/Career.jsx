import React from 'react'
import JobBoards from './JobBoread'
import CareerReportForm from "./CareerReportForm"
// import CareerCarousel from "./CareerCarosel"
import CareerPrep from "./careerPrep"
import NetworkingSession from './NetworkSession'
import Testimonial from "./Testimonial"
import CareerFooter from "./CareerFooter"
import FilterForm from './FilterForm'
import FacultyMentor from "./Faculty&Mentor"
import CareerSupport from "./CareerSupport"
import ProgramTraning from "./ProgramTraning"
import AdmissionsEnrollment from "./AdmissionsEnrollment"
import CorporateTraining from "./CorporateTraining"

function Career() {
  return (
    <div>
      <CareerSupport />
    
        
    <FilterForm />
   <JobBoards />
   <FacultyMentor />
    <CareerReportForm />
    {/* <CareerCarousel /> */}
    <ProgramTraning />
    < AdmissionsEnrollment />
    <CorporateTraining />
    <CareerPrep />
    <NetworkingSession />
    <Testimonial />
    <CareerFooter />
   
    </div>
  
   
  )
}

export default Career