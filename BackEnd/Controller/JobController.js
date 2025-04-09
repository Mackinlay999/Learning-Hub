const Job = require("../Model/JobScheme")


const Joblist ={
    createJob : async (req, res) => {
        try {

            console.log("created job");
            const {title,company,role,location,skills} = req.body
            if(!title || !company ||!role ||!location || !skills){
                return res.status(400).json({err :"fill the all data"})
            }
            
          const job = new Job({title,company,role,location,skills});
          await job.save();
          res.status(201).json(job);
        } catch (err) {
          res.status(500).json({ message: "Error creating job", error: err.message });
        }
      },
      getAllJobs : async (req, res) => {
        try {
            console.log("all job");
          const jobs = await Job.find();
          res.status(200).json(jobs);
        } catch (err) {
          res.status(500).json({ message: "Error fetching jobs", error: err.message });
        }
      },
      updateJob: async (req, res) => {
        console.log("Updating job with ID:", req.params.id);
        console.log("New job data:", req.body);
      
        try {
          const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
          );
      
          if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
          }
      
          res.status(200).json(updatedJob);
        } catch (err) {
          console.error("Error:", err);
          res.status(500).json({ message: "Error updating job", error: err.message });
        }
      },
      
      deleteJob : async (req, res) => {
        console.log("delete job");
        try {
          await Job.findByIdAndDelete(req.params.id);
          res.status(200).json({ message: "Job deleted successfully" });
        } catch (err) {
          res.status(500).json({ message: "Error deleting job", error: err.message });
        }
    }
}
module.exports = Joblist ;