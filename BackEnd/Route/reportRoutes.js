const express = require("express");
const router = express.Router();
const reportController = require("../Controller/reportController.js");

router.post("/reports", reportController.createReport);
router.get("/reports", reportController.getAllReports);
router.put("/reports/:id", reportController.updateReport);
router.delete("/reports/:id", reportController.deleteReport);
router.get("/reports/download/:id", reportController.downloadReport);


module.exports = router;
