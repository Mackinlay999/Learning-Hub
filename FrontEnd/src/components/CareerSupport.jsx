import React from 'react'
import JobBoards from './JobBoread'
import CareerReportForm from "./CareerReportForm"
import CareerCarousel from "./CareerCarosel"
import CareerPrep from "./career.Prep"
import NetworkingSession from './NetworkSession'
import Testimonial from "./Testimonial"
import CareerFooter from "./CareerFooter"
import FilterForm from './FilterForm'

function CareerSupport() {
  return (
    <div>
    <FilterForm />
   <JobBoards />
    <CareerReportForm />
    <CareerCarousel />
    <CareerPrep />
    <NetworkingSession />
    <Testimonial />
    <CareerFooter />
   
    </div>
  
   
  )
}

export default CareerSupport