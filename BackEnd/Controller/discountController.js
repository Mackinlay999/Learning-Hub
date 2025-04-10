const Discount = require("../Model/discountModel.js");

// Create a new discount
exports.createDiscount = async (req, res) => {
  try {
    const { code, percentage, startDate, expiryDate } = req.body;
    const discount = new Discount({ code, percentage, startDate, expiryDate });
    await discount.save();
    res.status(201).json(discount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all discounts
exports.getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a discount
exports.updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Discount.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a discount
exports.deleteDiscount = async (req, res) => {
  try {
    await Discount.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Discount deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Apply discount (increment usage)
exports.applyDiscount = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) return res.status(404).json({ message: "Discount not found" });

    discount.usage += 1;
    await discount.save();
    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
