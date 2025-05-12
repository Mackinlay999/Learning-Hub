import { useEffect, useState } from "react";
import axios from "axios";
import "../style/AdminDiscountsPromotions.css";

const API_URL = "https://learning-hub-p2yq.onrender.com/api/discounts"; // Change this if you're hosting it elsewhere

const AdminDiscountsPromotions = () => {
  const [discounts, setDiscounts] = useState([]);
  const [code, setCode] = useState("");
  const [percentage, setPercentage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const res = await axios.get(API_URL);
      setDiscounts(res.data);
    } catch (err) {
      console.error("Error fetching discounts", err);
    }
  };

  const generateCode = () => {
    const newCode = `DISC-${Math.random()
      .toString(36)
      .substr(2, 6)
      .toUpperCase()}`;
    setCode(newCode);
  };

  const addOrUpdateDiscount = async () => {
    if (!code || !percentage || !startDate || !expiryDate) return;

    const payload = {
      code,
      percentage,
      startDate,
      expiryDate,
    };

    try {
      if (editingId) {
        // UPDATE
        await axios.put(`${API_URL}/${editingId}`, payload);
        setEditingId(null);
      } else {
        // ADD
        await axios.post(API_URL, payload);
      }
      fetchDiscounts();
      resetForm();
    } catch (err) {
      console.error("Error saving discount", err);
    }
  };

  const resetForm = () => {
    setCode("");
    setPercentage("");
    setStartDate("");
    setExpiryDate("");
    setEditingId(null);
  };

  const applyDiscount = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}/apply`);
      fetchDiscounts();
    } catch (err) {
      console.error("Error applying discount", err);
    }
  };

  const editDiscount = (discount) => {
    setCode(discount.code);
    setPercentage(discount.percentage);
    setStartDate(discount.startDate.split("T")[0]);
    setExpiryDate(discount.expiryDate.split("T")[0]);
    setEditingId(discount._id);
  };

  const removeDiscount = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchDiscounts();
    } catch (err) {
      console.error("Error deleting discount", err);
    }
  };

  return (
    <div className="discounts-container">
      <h2>Discounts, Coupons & Promotions</h2>

      <div className="discount-form">
        <button className="d-btn" onClick={generateCode}>
          Generate Code
        </button>
        <input type="text" placeholder="Discount Code" value={code} readOnly />
        <input
          type="number"
          placeholder="Discount %"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <button className="d-btn" onClick={addOrUpdateDiscount}>
          {editingId ? "Update" : "Add"} Discount
        </button>
      </div>

      <div className="discount-list">
        {discounts.length === 0 ? (
          <p>No discounts available</p>
        ) : (
          discounts.map((discount) => (
            <div className="discount-card" key={discount._id}>
              <p>
                <strong>Code:</strong> {discount.code}
              </p>
              <p>
                <strong>Discount:</strong> {discount.percentage}%
              </p>
              <p>
                <strong>Valid:</strong> {discount.startDate.split("T")[0]} -{" "}
                {discount.expiryDate.split("T")[0]}
              </p>
              <p>
                <strong>Usage:</strong> {discount.usage} times
              </p>
              <button
                className="apply-btn"
                onClick={() => applyDiscount(discount._id)}
              >
                Apply
              </button>
              <button
                className="d-edit-btn"
                onClick={() => editDiscount(discount)}
              >
                Edit
              </button>
              <button
                className="remove-btn"
                onClick={() => removeDiscount(discount._id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDiscountsPromotions;
