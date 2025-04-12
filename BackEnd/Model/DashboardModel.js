const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  totalLeads: {
    type: Number,
    required: true,
  },
  activeStudents: {
    type: Number,
    required: true,
  },
  courseCount: {
    type: Number,
    required: true,
  },
  revenueData: [
    {
      day: String,
      hours: Number,
    },
  ],
  paymentStatus: {
    paid: {
      type: Number,
      required: true,
    },
    pending: {
      type: Number,
      required: true,
    },
    overdue: {
      type: Number,
      required: true,
    },
  },
  attendanceSnapshot: {
    type: Number,
    required: true,
  },
  events: [
    {
      eventName: String,
      time: String,
    },
  ],
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
