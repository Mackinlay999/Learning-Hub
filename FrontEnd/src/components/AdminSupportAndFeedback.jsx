import React from 'react'
import AdminStudentHelpdeskAndTicketing from './AdminStudentHelpdeskAndTicketing'
import AdminFeedbackCourseRatings from './AdminFeedbackCourseRatings'
import AdminCommunityEngagement from './AdminCommunityEngagement'

const AdminSupportAndFeedback = () => {
  return (
    <div>
      {/* <h3>Support & Feedback</h3> */}
      <AdminStudentHelpdeskAndTicketing />
      <AdminFeedbackCourseRatings />
      <AdminCommunityEngagement />
    </div>
  )
}

export default AdminSupportAndFeedback
