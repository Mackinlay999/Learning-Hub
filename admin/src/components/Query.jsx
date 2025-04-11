
import React, { useState } from "react";
import "../style/Query.css";

const Query = () => {
  const [queries, setQueries] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleCreateQuery = () => {
    if (!queryText.trim()) return;
    setQueries((prevQueries) => [
      ...prevQueries,
      {
        id: Date.now(),
        text: queryText,
        ticket: `TICKET-${prevQueries.length + 1}`,
      },
    ]);
    setQueryText("");
  };

  const handleDeleteQuery = (id) => {
    setQueries((prevQueries) => prevQueries.filter((query) => query.id !== id));
  };

  const handleEditQuery = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveQuery = (id) => {
    setQueries((prevQueries) =>
      prevQueries.map((query) =>
        query.id === id ? { ...query, text: editingText } : query
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const filteredQueries = queries.filter((q) =>
    q.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Q-container">
      <h2 className="Q-heading">Query Management</h2>
      <div className="Q-controls">
        <input
          type="text"
          className="Q-input"
          placeholder="Enter new query"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
        />
        <button className="Q-button" onClick={handleCreateQuery}>Create Query</button>
      </div>
      {filteredQueries.length > 0 ? (
        <div className="Q-table-container">
          <table className="Q-table">
            <thead>
              <tr>
                <th className="Q-th">ID</th>
                <th className="Q-th">Query</th>
                <th className="Q-th">Ticket</th>
                <th className="Q-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQueries.map((query) => (
                <tr key={query.id} className="Q-tr">
                  <td className="Q-td">{query.id}</td>
                  <td className="Q-td">
                    {editingId === query.id ? (
                      <input
                        type="text"
                        className="Q-edit-input"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                    ) : (
                      query.text
                    )}
                  </td>
                  <td className="Q-td">{query.ticket}</td>
                  <td className="Q-td Q-actions">
                    {editingId === query.id ? (
                      <button className="Q-button" onClick={() => handleSaveQuery(query.id)}>Save</button>
                    ) : (
                      <button className="Q-button" onClick={() => handleEditQuery(query.id, query.text)}>Edit</button>
                    )}
                    <button className="Q-button Q-delete" onClick={() => handleDeleteQuery(query.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="Q-no-data">No queries found.</p>
      )}
    </div>
  );
};

export default Query;
