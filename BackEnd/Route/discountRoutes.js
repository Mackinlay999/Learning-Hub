const express = require("express");
const router = express.Router();
const discountController = require("../Controller/discountController.js");

router.post("/discounts", discountController.createDiscount);
router.get("/discounts", discountController.getDiscounts);
router.put("/discounts/:id", discountController.updateDiscount);
router.delete("/discounts/:id", discountController.deleteDiscount);
router.patch("/discounts/:id/apply", discountController.applyDiscount);

module.exports = router;
