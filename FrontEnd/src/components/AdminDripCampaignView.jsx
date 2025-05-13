import React, { useState, useEffect } from "react";
import axios from "./axios";
import "../style/AdminDripCampaignView.css";

const AdminDripCampaignView = () => {
  const [dripSteps, setDripSteps] = useState([]);
  const [sentSteps, setSentSteps] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [newStep, setNewStep] = useState({
    step: "",
    delayDays: "",
    content: "",
    fromEmail: "",
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
    if (!newStep.step || newStep.delayDays === "" || !newStep.content || !newStep.fromEmail) return;
  
    const payload = {
      ...newStep,
      delayDays: Number(newStep.delayDays),
    };
  
    if (editIndex !== null) {
      const id = dripSteps[editIndex]._id;
      try {
        const res = await axios.put(`/updateDripStep/${id}`, payload);
        const updated = [...dripSteps];
        updated[editIndex] = res.data.updatedStep;
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
  
    setNewStep({ step: "", delayDays: "", content: "", fromEmail: "" });
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

 

  return (
    <div className="drip-container">
      <h2 className="drip-heading">📧 Drip Campaign Manager</h2>

      <div className="drip-form">
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
          <li className="drip-list-item" key={index}>
            <div className="drip-step">
              <strong className="drip-step-title">{step.step}</strong> 
              <em className="drip-delay">(Day {step.delayDays})</em>
              <p className="drip-content">{step.content}</p>
              <p className="drip-from"><strong>From:</strong> {step.fromEmail}</p>
            </div>
            <div className="drip-controls">
              <button className="drip-edit-btn" onClick={() => handleEdit(index)}>✏️ Edit</button>
              <button className="drip-delete-btn" onClick={() => handleDelete(index)}>🗑️ Delete</button>
            </div>
          </li>
        ))}
      </ol>

      <hr className="drip-divider" />

      <h3 className="drip-heading">⏱️ Sent Steps</h3>
      <ol className="drip-sent-list">
        {sentSteps.map((step, index) => (
          <li className="drip-sent-item" key={index}>
            ✅ {step.step} (Day {step.delayDays})
          </li>
        ))}
      </ol>
    </div>
  );
};

export default AdminDripCampaignView;



