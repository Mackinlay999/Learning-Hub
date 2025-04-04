import { useState } from "react";
import "../style/SalesFunnelConversion.css";

const SalesFunnelConversion = () => {
  const [funnel, setFunnel] = useState({
    Lead: ["John Doe", "Jane Smith"],
    Nurturing: ["Alice Brown"],
    Conversion: ["David Lee"],
    Enrollment: []
  });

  const [newLead, setNewLead] = useState("");

  // Drag & Drop Handling
  const handleDragStart = (e, lead, stage) => {
    e.dataTransfer.setData("lead", lead);
    e.dataTransfer.setData("stage", stage);
  };

  const handleDrop = (e, newStage) => {
    e.preventDefault();
    const lead = e.dataTransfer.getData("lead");
    const oldStage = e.dataTransfer.getData("stage");

    if (oldStage !== newStage) {
      setFunnel((prevFunnel) => {
        const updatedFunnel = { ...prevFunnel };
        updatedFunnel[oldStage] = updatedFunnel[oldStage].filter((l) => l !== lead);
        updatedFunnel[newStage] = [...updatedFunnel[newStage], lead];
        return updatedFunnel;
      });
    }
  };

  // Add New Lead
  const addLead = () => {
    if (newLead.trim()) {
      setFunnel((prevFunnel) => ({
        ...prevFunnel,
        Lead: [...prevFunnel.Lead, newLead]
      }));
      setNewLead(""); // Reset input
    }
  };

  // Delete Lead
  const deleteLead = (stage, lead) => {
    setFunnel((prevFunnel) => ({
      ...prevFunnel,
      [stage]: prevFunnel[stage].filter((l) => l !== lead)
    }));
  };

  return (
    <div className="sales-funnel">
      <h2>Sales Funnel & Conversion Analytics</h2>

      {/* Add New Lead */}
      <div className="add-lead">
        <input 
          type="text" 
          placeholder="Enter Lead Name" 
          value={newLead} 
          onChange={(e) => setNewLead(e.target.value)} 
        />
        <button onClick={addLead}>Add Lead</button>
      </div>

      {/* Funnel Stages */}
      <div className="funnel-container">
        {Object.keys(funnel).map((stage) => (
          <div
            key={stage}
            className="funnel-stage"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, stage)}
          >
            <h3>{stage} ({funnel[stage].length})</h3>
            <ul>
              {funnel[stage].map((lead) => (
                <li 
                  key={lead} 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, lead, stage)}
                >
                  {lead}
                  <button className="delete-btn" onClick={() => deleteLead(stage, lead)}>✖</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesFunnelConversion;
