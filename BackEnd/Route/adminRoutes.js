// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin
} = require("../Controller/adminController.js");

// CRUD Routes
router.post("/admins", createAdmin);
router.get("/admins", getAdmins);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);

module.exports = router;
