const express = require("express");
const { uploadFile } = require("../Controller/FileUplode");
const contactController = require("../Controller/Contact");
const  login =require("../Controller/login");
const  auth  = require("../Utils/Auth");
const Course =require("../Controller/TraningProgarm")
const LiveSessionandWebinars =require("../Controller/LiveSessions")

const upload = require("../Utils/Multer");

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



module.exports = router;