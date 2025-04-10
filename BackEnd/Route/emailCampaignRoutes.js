// routes/emailCampaignRoutes.js
const express = require("express");
const router = express.Router();
const emailCampaignController = require("../Controller/emailCampaignController.js");

router.get("/email-campaigns", emailCampaignController.getAllCampaigns);
router.post("/email-campaigns", emailCampaignController.createCampaign);
router.put("/email-campaigns/:id", emailCampaignController.updateCampaign);
router.delete("/email-campaigns/:id", emailCampaignController.deleteCampaign);
router.post("/email-campaigns/:id/emails", emailCampaignController.addEmailToCampaign);
router.delete("/email-campaigns/:campaignId/emails/:emailId", emailCampaignController.deleteEmailFromCampaign);

module.exports = router;
