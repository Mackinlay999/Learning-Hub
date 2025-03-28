import React from 'react'
import JobBoards from './JobBoread'
import CareerReportForm from "./CareerReportForm"
import CareerCarousel from "./CareerCarosel"
import CareerPrep from "./career.Prep"
import NetworkingSession from './NetworkSession'
import Testimonial from "./Testimonial"
import CareerFooter from "./CareerFooter"
import FilterForm from './FilterForm'
import FacultyMentor from "./Faculty&Mentor"
import CareerSupport from "./CareerSupport"

function Career() {
  return (
    <div>
      <CareerSupport />
        
    <FilterForm />
   <JobBoards />
   <FacultyMentor />
    <CareerReportForm />
    {/* <CareerCarousel /> */}
    <CareerPrep />
    <NetworkingSession />
    <Testimonial />
    <CareerFooter />
   
    </div>
  
   
  )
}

export default Career