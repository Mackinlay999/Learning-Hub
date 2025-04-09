const express = require("express");
const router = express.Router();
const corporateClientController = require("../Controller/corporateClientController.js");

router.get("/clients", corporateClientController.getClients);
router.post("/clients", corporateClientController.createClient);
router.put("/clients/:id", corporateClientController.updateClient);
router.delete("/clients/:id", corporateClientController.deleteClient);

module.exports = router;
