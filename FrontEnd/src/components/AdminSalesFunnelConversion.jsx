import { useEffect, useState } from "react";
import axios from "axios";
import "../style/AdminSalesFunnelConversion.css";

const stages = ["Lead", "Nurturing", "Conversion", "Enrollment"];

const AdminSalesFunnelConversion = () => {
  const [funnel, setFunnel] = useState({
    Lead: [],
    Nurturing: [],
    Conversion: [],
    Enrollment: [],
  });

  const [newEntry, setNewEntry] = useState("");

  // 🔁 Fetch all entries
  useEffect(() => {
    axios
      .get("https://learning-hub-p2yq.onrender.com/api/funnel-entries")
      .then((res) => {
        const entries = res.data;
        const grouped = {
          Lead: [],
          Nurturing: [],
          Conversion: [],
          Enrollment: [],
        };
        entries.forEach((entry) => {
          if (grouped[entry.stage]) {
            grouped[entry.stage].push({ id: entry._id, name: entry.name });
          }
        });
        setFunnel(grouped);
      })
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  // 🆕 Add new entry
  const addEntry = () => {
    if (newEntry.trim()) {
      axios
        .post("https://learning-hub-p2yq.onrender.com/api/funnel-entries", {
          name: newEntry,
          stage: "Lead",
        })
        .then((res) => {
          const entry = res.data;
          setFunnel((prev) => ({
            ...prev,
            Lead: [...prev.Lead, { id: entry._id, name: entry.name }],
          }));
          setNewEntry("");
        })
        .catch((err) => console.error("Add failed:", err));
    }
  };

  // 🗑️ Delete entry
  const deleteEntry = (stage, id) => {
    axios
      .delete(`https://learning-hub-p2yq.onrender.com/api/funnel-entries/${id}`)
      .then(() => {
        setFunnel((prev) => ({
          ...prev,
          [stage]: prev[stage].filter((entry) => entry.id !== id),
        }));
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  // 🟦 Drag Handling
  const handleDragStart = (e, entry, stage) => {
    e.dataTransfer.setData("entry", JSON.stringify(entry));
    e.dataTransfer.setData("stage", stage);
  };

  const handleDrop = (e, newStage) => {
    e.preventDefault();
    const entry = JSON.parse(e.dataTransfer.getData("entry"));
    const oldStage = e.dataTransfer.getData("stage");

    if (oldStage !== newStage) {
      axios
        .put(
          `https://learning-hub-p2yq.onrender.com/api/funnel-entries/${entry.id}`,
          {
            stage: newStage,
          }
        )
        .then(() => {
          setFunnel((prev) => {
            const updated = { ...prev };
            updated[oldStage] = updated[oldStage].filter(
              (e) => e.id !== entry.id
            );
            updated[newStage] = [
              ...updated[newStage],
              { id: entry.id, name: entry.name },
            ];
            return updated;
          });
        })
        .catch((err) => console.error("Update failed:", err));
    }
  };

  return (
    <div className="sales-funnel">
      <h2>Sales Funnel & Conversion Analytics</h2>

      {/* Add Entry */}
      <div className="add-lead">
        <input
          type="text"
          placeholder="Enter Name"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <button onClick={addEntry}>Add Entry</button>
      </div>

      {/* Funnel Stages */}
      <div className="funnel-container">
        {stages.map((stage) => (
          <div
            key={stage}
            className="funnel-stage"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, stage)}
          >
            <h3>
              {stage} ({funnel[stage].length})
            </h3>
            <ul>
              {funnel[stage].map((entry) => (
                <li
                  key={entry.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, entry, stage)}
                >
                  {entry.name}
                  <button
                    className="delete-btn"
                    onClick={() => deleteEntry(stage, entry.id)}
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSalesFunnelConversion;
