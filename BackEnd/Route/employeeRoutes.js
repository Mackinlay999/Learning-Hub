// routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../Controller/employeeController.js");

router.post("/employees", createEmployee);
router.get("/employees", getAllEmployees);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

module.exports = router;
