const express = require("express");
const { uploadFile } = require("../Controller/FileUplode");
const contactController = require("../Controller/Contact");
const  login =require("../Controller/login");
const  auth  = require("../Utils/Auth");
const Course =require("../Controller/TraningProgarm")
const LiveSessionandWebinars =require("../Controller/LiveSessions")
const JobController  = require("../Controller/JobController")
const PlacementController =require("../Controller/PlacementApplication")
const Assessment = require("../Controller/Assessment")
const AlumniController  =require("../Controller/Alumni")


const upload = require("../Utils/Multer");
const { join } = require("path");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);


// contact


router.post("/contact", contactController.submitContactForm);


// Userr


router.post("/register", login.register)
router.get("/admin", login.admin)
router.post("/login", login.login)
router.post("/logout", login.logout)
router.post("/forgetpassword", login.forgetpassword)
router.post("/setNewPassword", login.setNewPassword)
router.post("/profileResume", upload.single("resume"), login.profileResume)
router.get("/me" ,  auth.authverify, login.me)



// traningProgram
router.get("/getProgram",  Course.getProgram);
router.post("/createProgram", Course.createProgram );
router.put("/updateProgram/:id",  Course.updateProgram);
router.delete("/deleteProgram/:id",  Course.deleteProgram);


// Live Sessions And Webinars

router.post('/createSession', LiveSessionandWebinars.createSession);
router.get('/getAllSessions', LiveSessionandWebinars.getAllSessions);
router.put('/updateSession/:id', LiveSessionandWebinars.updateSession);
router.delete('/deleteSession/:id', LiveSessionandWebinars.deleteSession);


// Assessment
router.post("/createAssessment", Assessment.createAssessment);
router.get("/getAssessments", Assessment.getAssessments);
router.put("/updateAssessment/:id", Assessment.updateAssessment);
router.delete("/deleteAssessment/:id", Assessment.deleteAssessment);
router.patch("/issueCertificate/:id", Assessment.issueCertificate);


// job


router.post("/createJob", JobController.createJob);
router.get("/getAllJobs", JobController.getAllJobs);
router.put("/updateJob/:id", JobController.updateJob);
router.delete("/deleteJob/:id", JobController.deleteJob);



// PlacemaentApplication

router.post("/createApplication", PlacementController.createApplication);
router.get("/getAllApplications", PlacementController.getAllApplications);
router.put("/updateApplication/:id", PlacementController.updateApplication);
router.delete("/deleteApplication/:id", PlacementController.deleteApplication);




// Alumni

router.post("/createAlumni", AlumniController.createAlumni);
router.get("/getAllAlumni", AlumniController.getAllAlumni);
router.put("/updateAlumni/:id", AlumniController.updateAlumni);
router.delete("/deleteAlumni/:id", AlumniController.deleteAlumni);


module.exports = router;