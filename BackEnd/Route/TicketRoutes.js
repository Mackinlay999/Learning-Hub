const express = require("express");
const router = express.Router();
const {
  createTicket,
  getAllTickets,
  updateTicket,
  deleteTicket,
} = require("../Controller/ticketController.js");

router.post("/tickets", createTicket);
router.get("/tickets", getAllTickets);
router.put("/tickets/:id", updateTicket);
router.delete("/tickets/:id", deleteTicket);

module.exports = router;
