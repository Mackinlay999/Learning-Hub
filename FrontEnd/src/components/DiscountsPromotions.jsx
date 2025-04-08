import { useState } from "react";
import "../style/DiscountsPromotions.css";

const DiscountsPromotions = () => {
  const [discounts, setDiscounts] = useState([]);
  const [code, setCode] = useState("");
  const [percentage, setPercentage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const generateCode = () => {
    const newCode = `DISC-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setCode(newCode);
  };

  const addOrUpdateDiscount = () => {
    if (!code || !percentage || !startDate || !expiryDate) return;

    if (editingIndex !== null) {
      // Update existing discount
      const updatedDiscounts = discounts.map((discount, index) =>
        index === editingIndex ? { ...discount, code, percentage, startDate, expiryDate } : discount
      );
      setDiscounts(updatedDiscounts);
      setEditingIndex(null);
    } else {
      // Add new discount
      setDiscounts([...discounts, { code, percentage, startDate, expiryDate, usage: 0 }]);
    }

    // Reset form fields
    setCode("");
    setPercentage("");
    setStartDate("");
    setExpiryDate("");
  };

  const applyDiscount = (index) => {
    const updatedDiscounts = [...discounts];
    updatedDiscounts[index].usage += 1;
    setDiscounts(updatedDiscounts);
  };

  const editDiscount = (index) => {
    const discount = discounts[index];
    setCode(discount.code);
    setPercentage(discount.percentage);
    setStartDate(discount.startDate);
    setExpiryDate(discount.expiryDate);
    setEditingIndex(index);
  };

  const removeDiscount = (index) => {
    setDiscounts(discounts.filter((_, i) => i !== index));
  };

  return (
    <div className="discounts-container">
      <h2>Discounts, Coupons & Promotions</h2>

      {/* Discount Creation/Update Form */}
      <div className="discount-form">
        <button  className="d-btn" onClick={generateCode}>Generate Code</button>
        <input type="text" placeholder="Discount Code" value={code} readOnly />
        <input
          type="number"
          placeholder="Discount %"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        <button className="d-btn"  onClick={addOrUpdateDiscount}>{editingIndex !== null ? "Update" : "Add"} Discount</button>
      </div>

      {/* Discount List */}
      <div className="discount-list">
        {discounts.length === 0 ? (
          <p>No discounts available</p>
        ) : (
          discounts.map((discount, index) => (
            <div className="discount-card" key={index}>
              <p><strong>Code:</strong> {discount.code}</p>
              <p><strong>Discount:</strong> {discount.percentage}%</p>
              <p><strong>Valid:</strong> {discount.startDate} - {discount.expiryDate}</p>
              <p><strong>Usage:</strong> {discount.usage} times</p>
              <button className="apply-btn" onClick={() => applyDiscount(index)}>Apply</button>
              <button className="edit-btn" onClick={() => editDiscount(index)}>Edit</button>
              <button className="remove-btn" onClick={() => removeDiscount(index)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DiscountsPromotions;
