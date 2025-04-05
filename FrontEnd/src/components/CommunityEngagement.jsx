import React, { useState } from "react";
import "../style/CommunityEngagement.css";

const CommunityEngagement = () => {
  const [forums, setForums] = useState([]);
  const [polls, setPolls] = useState([]);
  const [forum, setForum] = useState({ title: "", author: "", content: "" });
  const [poll, setPoll] = useState({ question: "", options: "" });

  const [isEditingForum, setIsEditingForum] = useState(false);
  const [editingForumId, setEditingForumId] = useState(null);

  const [isEditingPoll, setIsEditingPoll] = useState(false);
  const [editingPollId, setEditingPollId] = useState(null);

  const handleForumChange = (e) => {
    setForum({ ...forum, [e.target.name]: e.target.value });
  };

  const handlePollChange = (e) => {
    setPoll({ ...poll, [e.target.name]: e.target.value });
  };

  const submitForum = (e) => {
    e.preventDefault();
    if (isEditingForum) {
      setForums(
        forums.map((f) =>
          f.id === editingForumId ? { ...forum, id: editingForumId } : f
        )
      );
      setIsEditingForum(false);
      setEditingForumId(null);
    } else {
      setForums([...forums, { ...forum, id: Date.now() }]);
    }
    setForum({ title: "", author: "", content: "" });
  };

  const submitPoll = (e) => {
    e.preventDefault();
    if (isEditingPoll) {
      setPolls(
        polls.map((p) =>
          p.id === editingPollId ? { ...poll, id: editingPollId } : p
        )
      );
      setIsEditingPoll(false);
      setEditingPollId(null);
    } else {
      setPolls([...polls, { ...poll, id: Date.now() }]);
    }
    setPoll({ question: "", options: "" });
  };

  const editForum = (f) => {
    setForum(f);
    setIsEditingForum(true);
    setEditingForumId(f.id);
  };

  const deleteForum = (id) => {
    setForums(forums.filter((f) => f.id !== id));
  };

  const editPoll = (p) => {
    setPoll(p);
    setIsEditingPoll(true);
    setEditingPollId(p.id);
  };

  const deletePoll = (id) => {
    setPolls(polls.filter((p) => p.id !== id));
  };

  return (
    <div className="CE-main">
      <h1 className="CE-title">Community Engagement</h1>
      <p className="CE-subtitle">
        Manage student & corporate forums. <br />
        Run polls and surveys.
      </p>

      {/* Discussion Forum Form */}
      <form className="CE-form" onSubmit={submitForum}>
        <h2>Discussion Forum</h2>
        <input
          name="title"
          placeholder="Title"
          value={forum.title}
          onChange={handleForumChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={forum.author}
          onChange={handleForumChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={forum.content}
          onChange={handleForumChange}
          required
        ></textarea>
        <button type="submit">{isEditingForum ? "Update" : "Post"}</button>
      </form>

      {/* Forum List */}
      <div className="CE-section">
        <h3>Discussion Posts</h3>
        {forums.length === 0 ? (
          <p>No discussions yet.</p>
        ) : (
          forums.map((f) => (
            <div key={f.id} className="CE-card">
              <h4>{f.title}</h4>
              <p><strong>By:</strong> {f.author}</p>
              <p>{f.content}</p>
              <button onClick={() => editForum(f)}>Edit</button>
              <button onClick={() => deleteForum(f.id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      {/* Poll Form */}
      <form className="CE-form" onSubmit={submitPoll}>
        <h2>Polls & Surveys</h2>
        <input
          name="question"
          placeholder="Poll Question"
          value={poll.question}
          onChange={handlePollChange}
          required
        />
        <input
          name="options"
          placeholder="Options (comma separated)"
          value={poll.options}
          onChange={handlePollChange}
          required
        />
        <button type="submit">{isEditingPoll ? "Update Poll" : "Add Poll"}</button>
      </form>

      {/* Poll List */}
      <div className="CE-section">
        <h3>Polls</h3>
        {polls.length === 0 ? (
          <p>No polls yet.</p>
        ) : (
          polls.map((p) => (
            <div key={p.id} className="CE-card">
              <h4>{p.question}</h4>
              <ul>
                {p.options.split(",").map((opt, idx) => (
                  <li key={idx}>{opt.trim()}</li>
                ))}
              </ul>
              <button onClick={() => editPoll(p)}>Edit</button>
              <button onClick={() => deletePoll(p.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityEngagement;
