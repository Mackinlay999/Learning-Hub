const express = require("express");
const { uploadFile } = require("../Controller/FileUplode");  // Ensure it's an object with a function


const upload = require("../Utils/Multer");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;