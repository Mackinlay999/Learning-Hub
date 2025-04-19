import React, { useState } from 'react';
import "../style/DripCampaignView.css"

const DripCampaignView = () => {
  const [dripCampaign, setDripCampaign] = useState([
    {
      step: 'Step 1: Welcome Email',
      delay: 'Immediately after sign-up',
      content: 'Welcome to our platform! We’re excited to have you.',
    },
    {
      step: 'Step 2: Introduction to Features',
      delay: '1 day after sign-up',
      content: 'Here’s what you can do with our platform. Explore features.',
    },
    {
      step: 'Step 3: Case Studies',
      delay: '3 days after sign-up',
      content: 'See how others achieved success using our tools.',
    },
    {
      step: 'Step 4: Final Call',
      delay: '5 days after sign-up',
      content: 'Need help getting started? Book a free consultation today!',
    },
  ]);

  const [newStep, setNewStep] = useState({
    step: '',
    delay: '',
    content: '',
  });

  const handleAddStep = () => {
    setDripCampaign([
      ...dripCampaign,
      { step: newStep.step, delay: newStep.delay, content: newStep.content },
    ]);
    setNewStep({ step: '', delay: '', content: '' });
  };

  const handleDeleteStep = (index) => {
    const updatedCampaign = dripCampaign.filter((_, i) => i !== index);
    setDripCampaign(updatedCampaign);
  };

  return (
    <div className="drip-card">
      <h2 className="drip-title">📬 Drip Campaign View</h2>

      <div className="drip-form-group">
        <input
          className="drip-input"
          type="text"
          placeholder="Step Name"
          value={newStep.step}
          onChange={(e) => setNewStep({ ...newStep, step: e.target.value })}
        />
        <input
          className="drip-input"
          type="text"
          placeholder="Delay"
          value={newStep.delay}
          onChange={(e) => setNewStep({ ...newStep, delay: e.target.value })}
        />
        <input
          className="drip-input"
          type="text"
          placeholder="Content"
          value={newStep.content}
          onChange={(e) => setNewStep({ ...newStep, content: e.target.value })}
        />
        <button className="drip-button" onClick={handleAddStep}>
          Add Step
        </button>
      </div>

      <ol className="drip-list">
        {dripCampaign.map((step, index) => (
          <li className="drip-item" key={index}>
            <div className="drip-step">
              <strong>{step.step}</strong> - {step.delay}
              <br />
              <em>{step.content}</em>
            </div>
            <button className="drip-delete" onClick={() => handleDeleteStep(index)}>
              🗑️ Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default DripCampaignView;
