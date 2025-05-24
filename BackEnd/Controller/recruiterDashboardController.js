const Job = require('../Model/Job');
const Applicant = require('../Model/Applicant');

const getDashboardStats = async (req, res) => {
  try {
    const recruiterId = req.userid;

    const totalJobs = await Job.countDocuments({ recruiter: recruiterId });
    const activeJobs = await Job.countDocuments({ recruiter: recruiterId, deadline: { $gte: new Date() } });
    const totalApplications = await Applicant.countDocuments({});

    res.json({
      totalJobs,
      activeJobs,
      totalApplications
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getRecentApplications = async (req, res) => {
  try {
    const recruiterId = req.userid; // or req.userid depending on your fix

    // Find jobs posted by this recruiter
    const jobs = await Job.find({ recruiter: recruiterId }).select('_id');

    const jobIds = jobs.map(job => job._id);

    const applications = await Applicant.find({ job: { $in: jobIds } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name job createdAt')
      .populate('job', 'title');

    const formatted = applications.map(app => ({
      name: app.name,
      job: app.job?.title || "Unknown",
      time: app.createdAt
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};


const getJobPerformance = async (req, res) => {
  try {
    const recruiterId = req.userid;
    const jobs = await Job.find({ recruiter: recruiterId });

    let views = 0;
    let applications = 0;
    let expired = 0;

    for (const job of jobs) {
      views += job.views;
      const count = await Applicant.countDocuments({ job: job._id });
      applications += count;

      if (new Date(job.deadline) < new Date()) expired++;
    }

    res.json({
      jobViews: views,
      applicationsReceived: applications,
      jobsExpired: expired
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch performance' });
  }
};

module.exports = {
    getDashboardStats,
    getRecentApplications,
    getJobPerformance
}
