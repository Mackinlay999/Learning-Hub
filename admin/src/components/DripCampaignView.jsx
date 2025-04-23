import React, { useState, useEffect } from "react";
import axios from "./axios";
import "../style/DripCampaignView.css";

const DEFAULT_FROM_EMAIL = "rjerald6803@gmail.com";

const DripCampaignView = () => {
  const [dripSteps, setDripSteps] = useState([]);
  const [sentSteps, setSentSteps] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [newStep, setNewStep] = useState({
    step: "",
    delayDays: "",
    content: "",
    fromEmail: DEFAULT_FROM_EMAIL,
  });

  // Fetch all steps
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await axios.get("/getAllDripSteps");
        setDripSteps(res.data);
      } catch (err) {
        alert("❌ Failed to fetch steps");
        console.error(err);
      }
    };
    fetchSteps();
  }, []);

  // Simulate email sending (1s = 1 day)
  useEffect(() => {
    let timers = [];

    dripSteps.forEach((step, idx) => {
      const delay = step.delayDays * 1000;
      const timer = setTimeout(() => {
        setSentSteps((prev) => [...prev, step]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [dripSteps]);

  const handleInputChange = (field, value) => {
    setNewStep({ ...newStep, [field]: value });
  };

  const handleAddOrUpdate = async () => {
    if (!newStep.step || !newStep.delayDays || !newStep.content || !newStep.fromEmail) return;

    const payload = {
      ...newStep,
      delayDays: Number(newStep.delayDays),
    };

    if (editIndex !== null) {
      const id = dripSteps[editIndex]._id;
      try {
        const res = await axios.put(`/updateDripStep/${id}`, payload);
        const updated = [...dripSteps];
        updated[editIndex] = res.data;
        setDripSteps(updated);
        alert("✅ Step updated successfully!");
        setEditIndex(null);
      } catch (err) {
        alert("❌ Failed to update step");
      }
    } else {
      try {
        const res = await axios.post("/createdrip", payload);
        setDripSteps([...dripSteps, res.data]);
        alert("✅ Step added successfully!");
      } catch (err) {
        alert("❌ Failed to add step");
      }
    }

    setNewStep({ step: "", delayDays: "", content: "", fromEmail: DEFAULT_FROM_EMAIL });
    setSentSteps([]);
    setCurrentIndex(0);
  };

  const handleEdit = (index) => {
    const stepToEdit = dripSteps[index];
    setNewStep({
      step: stepToEdit.step,
      delayDays: stepToEdit.delayDays,
      content: stepToEdit.content,
      fromEmail: stepToEdit.fromEmail,
    });
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const id = dripSteps[index]._id;
    try {
      await axios.delete(`/deleteDripStep/${id}`);
      const updated = dripSteps.filter((_, i) => i !== index);
      setDripSteps(updated);
      setSentSteps([]);
      setCurrentIndex(0);
      alert("🗑️ Step deleted successfully!");
    } catch (err) {
      alert("❌ Failed to delete step");
      console.error(err);
    }
  };

  const handleSendCampaign = async () => {
    try {
      const res = await axios.post("/sendDripCampaignEmailsBatch");
      console.log("Campaign Sent:", res.data);
      alert("🚀 Drip Campaign emails are being sent!");
    } catch (err) {
      alert("❌ Failed to send drip campaign");
      console.error(err);
    }
  };

  return (
    <div className="drip-card">
      <h2 className="drip-title">📧 Drip Campaign Manager</h2>

      <div className="drip-form-group">
        <input
          className="drip-input"
          type="text"
          placeholder="Step Name"
          value={newStep.step}
          onChange={(e) => handleInputChange("step", e.target.value)}
        />
        <input
          className="drip-input"
          type="number"
          placeholder="Delay in Days"
          value={newStep.delayDays}
          onChange={(e) => handleInputChange("delayDays", e.target.value)}
        />
        <input
          className="drip-input"
          type="text"
          placeholder="Email Content"
          value={newStep.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
        />
        <input
          className="drip-input"
          type="email"
          placeholder="From Email"
          value={newStep.fromEmail}
          onChange={(e) => handleInputChange("fromEmail", e.target.value)}
        />
        <button className="drip-button" onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update Step" : "Add Step"}
        </button>
      </div>

      <ol className="drip-list">
        {dripSteps.map((step, index) => (
          <li className="drip-item" key={index}>
            <div className="drip-step">
              <strong>{step.step}</strong> <em>(Day {step.delayDays})</em>
              <p>{step.content}</p>
              <p><strong>From:</strong> {step.fromEmail}</p>
            </div>
            <div className="drip-actions">
              <button onClick={() => handleEdit(index)}>✏️ Edit</button>
              <button onClick={() => handleDelete(index)}>🗑️ Delete</button>
            </div>
          </li>
        ))}
      </ol>

      <hr />

      <h3 className="drip-title">⏱️ Sent Steps</h3>
      <ol className="drip-list">
        {sentSteps.map((step, index) => (
          <li key={index}>
            ✅ {step.step} (Day {step.delayDays})
          </li>
        ))}
      </ol>

      {currentIndex < dripSteps.length ? (
        <p className="drip-status">⏳ Sending next email...</p>
      ) : dripSteps.length === 0 ? (
        <p className="drip-status">❌ No steps defined.</p>
      ) : (
        <p className="drip-status">✅ All emails sent!</p>
      )}

      <button className="drip-button" onClick={handleSendCampaign}>
        🚀 Send Drip Campaign
      </button>
    </div>
  );
};

export default DripCampaignView;
