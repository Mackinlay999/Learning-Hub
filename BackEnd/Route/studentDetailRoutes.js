const express = require("express");
const StudentDetailController = require("../Controller/studentDetailController");

const router = express.Router();

router.get("/studentDetail/:id", StudentDetailController.getStudentById);

module.exports = router;
