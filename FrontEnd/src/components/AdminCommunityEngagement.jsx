import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/AdminCommunityEngagement.css";

const BASE_URL = "https://learning-hub-p2yq.onrender.com/api/community"; // Replace with Render URL if deployed

const AdminCommunityEngagement = () => {
  const [forums, setForums] = useState([]);
  const [polls, setPolls] = useState([]);
  const [forum, setForum] = useState({ title: "", author: "", content: "" });
  const [poll, setPoll] = useState({ question: "", options: "" });

  const [isEditingForum, setIsEditingForum] = useState(false);
  const [editingForumId, setEditingForumId] = useState(null);

  const [isEditingPoll, setIsEditingPoll] = useState(false);
  const [editingPollId, setEditingPollId] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    fetchForums();
    fetchPolls();
  }, []);

  const fetchForums = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/forums`);
      setForums(res.data);
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  };

  const fetchPolls = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/polls`);
      setPolls(res.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  const handleForumChange = (e) => {
    setForum({ ...forum, [e.target.name]: e.target.value });
  };

  const handlePollChange = (e) => {
    setPoll({ ...poll, [e.target.name]: e.target.value });
  };

  const submitForum = async (e) => {
    e.preventDefault();
    try {
      if (isEditingForum) {
        await axios.put(`${BASE_URL}/forums/${editingForumId}`, forum);
      } else {
        await axios.post(`${BASE_URL}/forums`, forum);
      }
      setForum({ title: "", author: "", content: "" });
      setIsEditingForum(false);
      setEditingForumId(null);
      fetchForums();
    } catch (err) {
      console.error("Forum submission error:", err);
    }
  };

  const submitPoll = async (e) => {
    e.preventDefault();
    try {
      const pollData = {
        question: poll.question,
        options: poll.options.split(",").map((opt) => opt.trim()),
      };

      if (isEditingPoll) {
        await axios.put(`${BASE_URL}/polls/${editingPollId}`, pollData);
      } else {
        await axios.post(`${BASE_URL}/polls`, pollData);
      }

      setPoll({ question: "", options: "" });
      setIsEditingPoll(false);
      setEditingPollId(null);
      fetchPolls();
    } catch (err) {
      console.error("Poll submission error:", err);
    }
  };

  const editForum = (f) => {
    setForum(f);
    setIsEditingForum(true);
    setEditingForumId(f._id);
  };

  const deleteForum = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/forums/${id}`);
      fetchForums();
    } catch (err) {
      console.error("Delete forum error:", err);
    }
  };

  const editPoll = (p) => {
    setPoll({ question: p.question, options: p.options.join(", ") });
    setIsEditingPoll(true);
    setEditingPollId(p._id);
  };

  const deletePoll = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/polls/${id}`);
      fetchPolls();
    } catch (err) {
      console.error("Delete poll error:", err);
    }
  };

  return (
    <div className="CE-main">
      <h1 className="CE-title">Community Engagement</h1>
      <p className="CE-subtitle">
        Manage student & corporate forums. <br />
        Run polls and surveys.
      </p>

      {/* Forum Form */}
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
        <button className="d-btn" type="submit">
          {isEditingForum ? "Update" : "Post"}
        </button>
      </form>

      {/* Forum List */}
      <div className="CE-section">
        <h3>Discussion Posts</h3>
        {forums.length === 0 ? (
          <p>No discussions yet.</p>
        ) : (
          forums.map((f) => (
            <div key={f._id} className="CE-card">
              <h4>{f.title}</h4>
              <p>
                <strong>By:</strong> {f.author}
              </p>
              <p>{f.content}</p>
              <button onClick={() => editForum(f)}>Edit</button>
              <button onClick={() => deleteForum(f._id)}>Delete</button>
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
        <button className="d-btn" type="submit">
          {isEditingPoll ? "Update Poll" : "Add Poll"}
        </button>
      </form>

      {/* Poll List */}
      <div className="CE-section">
        <h3>Polls</h3>
        {polls.length === 0 ? (
          <p>No polls yet.</p>
        ) : (
          polls.map((p) => (
            <div key={p._id} className="CE-card">
              <h4>{p.question}</h4>
              <ul>
                {p.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
              <button onClick={() => editPoll(p)}>Edit</button>
              <button onClick={() => deletePoll(p._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCommunityEngagement;
