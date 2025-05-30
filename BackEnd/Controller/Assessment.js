const Assessment = require("../Model/AssessmentScheme");


const AssessmentController ={
    createAssessment : async (req, res) => {
        try {
          // console.log("create Assessment");
          const {title,type,status}=req.body

          if(!title || !type || !status ){
            return res.status(400).json({err:"fill the all data"})
          }
          
          const assessment = await Assessment({title,type,status});
          await assessment.save();
          res.status(201).json(assessment);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
      getAssessments : async (req, res) => {
        // console.log("get all Assessment");
        
        try {
          const assessments = await Assessment.find();
          res.json(assessments);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      updateAssessment : async (req, res) => {
        // console.log("update Assessment");
        
        try {
          const updated = await Assessment.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!updated) return res.status(404).json({ error: "Assessment not found" });
          res.json(updated);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
      deleteAssessment : async (req, res) => {
        // console.log("delete Assessment");
        
        try {
          await Assessment.findByIdAndDelete(req.params.id);
          res.json({ message: "Assessment deleted" });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      issueCertificate: async (req, res) => {
        // console.log("issue Assessment");
        try {
          const assessment = await Assessment.findByIdAndUpdate(
            req.params.id,
            { issuedCertificate: true },
            { new: true }
          );
      
          if (!assessment) {
            return res.status(404).json({ error: "Assessment not found" });
          }
      
          res.json(assessment);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
      
      }


module.exports = AssessmentController