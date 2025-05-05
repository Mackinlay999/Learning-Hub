import React from 'react'
import StudentHelpdeskAndTicketing from './StudentHelpdeskAndTicketing'
import FeedbackCourseRatings from './FeedbackCourseRatings'
import CommunityEngagement from './CommunityEngagement'

const AdminSupportAndFeedback = () => {
  return (
    <div>
      <h3>Support & Feedback</h3>
      <StudentHelpdeskAndTicketing />
      <FeedbackCourseRatings />
      <CommunityEngagement />
    </div>
  )
}

export default AdminSupportAndFeedback
