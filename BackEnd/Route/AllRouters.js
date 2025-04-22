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
const leadController =require("../Controller/LeadController")
const StudentController = require("../Controller/Studentpay") 
const AttendanceController =require("../Controller/AttendanceController")
const Admincontroller = require("../Controller/Adminlogin")
const Verifyrole = require("../Utils/Verifyrole")
const DeleteUser = require("../Utils/DeleteUser")
const RevenueController = require("../Controller/RevenueController")
const Studentrefund =require("../Controller/RefundsController")
const SuccessStroy = require("../Controller/successStoryController")
const campaignController = require("../Controller/campaignController")
const  leademail = require("../Controller/leademail")
const dripCampaignController = require("../Controller/dripCampaignsController")

const upload = require("../Utils/Multer");
const { join } = require("path");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);


// contact


router.post("/contact", contactController.submitContactForm);


// User login


router.post("/register", login.register)
router.get("/admin", login.admin)
router.post("/login", login.login)
router.post("/logout", login.logout)
router.post("/forgetpassword", login.forgetpassword)
router.post("/setNewPassword", login.setNewPassword)
router.get("/getAlluser", login.getAlluser)
router.post("/profileResume", upload.single("resume"), login.profileResume)
router.get("/me" ,  auth.authverify, login.me)



// traningProgram
router.get("/getAllPrograms",  Course.getAllPrograms);
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



// Lead
router.post("/createLead", leadController.createLead);
router.get("/getLeads", leadController.getLeads);
router.get("/getLeadById/:id", leadController.getLeadById);
router.put("/updateLead/:id", leadController.updateLead);
router.delete("/deleteLead/:id", leadController.deleteLead);

// StudentEnrollAndPaymentScheme

router.post("/createStudents", StudentController.createStudent);
router.get("/getStudents", StudentController. getStudents);
router.put("/updateStudent/:id", StudentController.updateStudent);
router.delete("/deleteStudent/:id", StudentController.deleteStudent);


// attendanceProgresS
router.post("/createRecord", AttendanceController.createRecord);
router.get("/getRecords", AttendanceController.getRecords);
router.put("/updateRecord/:id", AttendanceController.updateRecord);
router.delete("/deleteRecord/:id", AttendanceController.deleteRecord);



// Adminroute

router.post("/admin/register",  Admincontroller.register)
router.get("/admin/alluser",  Admincontroller.getallrole)
router.post("/admin/login",  Admincontroller.login)
router.post("/admin/logout",  Admincontroller.logout)
router.post("/admin/forgetpassword",  Admincontroller.forgetpassword)
router.post("/admin/setNewPassword",  Admincontroller.setNewPassword)
router.put("/admin/update-role", Verifyrole.verifyToken , Admincontroller.updateRole);
router.get("/admin/me" ,  auth.authverify,  Admincontroller.me)
router.delete("/admin/deleteUser", DeleteUser.User ,  Admincontroller.deleteUser);



// Revenue

router.get("/getRevenue", RevenueController.getRevenue);
router.post("/addRevenue", RevenueController.addRevenue);
router.put("/updateRevenue/:id", RevenueController.updateRevenue);
router.delete("/deleteRevenue/:id", RevenueController.deleteRevenue);



// Student Refund

router.get("/getAllStudentRefunds", Studentrefund.getAllStudentRefunds );
router.post("/createStudentRefund", Studentrefund.createStudentRefund);
router.put("/updateStudentRefund/:id", Studentrefund.updateStudentRefund );
router.delete("/deleteStudentRefund/:id", Studentrefund.deleteStudentRefund );



// successStory
router.get("/getAllStories", SuccessStroy.getAllStories);
router.post("/createStory", upload.single("photo"), SuccessStroy.createStory);
router.put("/updateStory/:id", upload.single("photo"), SuccessStroy.updateStory);
router.delete("/deleteStory/:id", SuccessStroy.deleteStory);

// campaign

router.post('/createCampaign', campaignController.createCampaign);
router.get('/getCampaigns', campaignController.getCampaigns);
router.put('/updateCampaign/:id', campaignController.updateCampaign);
router.delete('/deleteCampaign/:id',campaignController.deleteCampaign);


// LeadEmails
router.post('/createLeademail', leademail.createLeademail);
router.get('/getLeademail', leademail.getLeademail);
router.delete('/deleteLeademail/:leadId', leademail.deleteLeademail);
router.put('/updateLeademail/:id', leademail.updateLeademail);


// DripCompains 

router.post("/sendDripCampaignEmails" , dripCampaignController.sendDripCampaignEmails)
router.post("/createdrip" , dripCampaignController.createdrip)
router.get("/getAllDripSteps" , dripCampaignController.getAllDripSteps)
router.put("/updateDripStep/:id" , dripCampaignController.updateDripStep)
router.delete("/deleteDripStep/:id" , dripCampaignController.deleteDripStep)




module.exports = router;