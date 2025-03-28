const express = require("express");
const { uploadFile } = require("../Controller/FileUplode");
const contactController = require("../Controller/Contact");


const upload = require("../Utils/Multer");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);


// contact


router.post("/contact", contactController.submitContactForm);

module.exports = router;