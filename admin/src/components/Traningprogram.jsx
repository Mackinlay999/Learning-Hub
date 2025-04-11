import React from 'react'
import Courses from './Courses';
import LiveSessions from './LiveSession';
import AssessmentsCertifications from './AssessmentsCertifications';

const Trainingprogram = () => {
  return (
    <div>
      <h3>Training Programs & Course Management</h3>
      <Courses />
      <LiveSessions />
      <AssessmentsCertifications />
    </div>
  )
}

export default Trainingprogram ;
