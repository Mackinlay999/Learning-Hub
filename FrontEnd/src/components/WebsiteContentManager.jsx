import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/WebsiteContentManager.css";

const WebsiteContentManager = () => {
  const [content, setContent] = useState({
    homepage: "",
    programs: "",
    blog: "",
    successStories: "",
    seo: {
      title: "",
      description: "",
      keywords: ""
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch existing content on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/website-content");
        if (res.data) {
          setContent(res.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Failed to load content.");
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSeoChange = (field, value) => {
    setContent((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value
      }
    }));
  };

  // ✅ Submit content to backend
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/website-content", content);
      alert("Content saved successfully!");
    } catch (err) {
      console.error("Error saving content:", err);
      alert("Failed to save content.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="content-manager">
      <h2>Website & Content Management</h2>

      <div className="section">
        <label>Homepage Content</label>
        <textarea
          rows="4"
          value={content.homepage}
          onChange={(e) => handleChange("homepage", e.target.value)}
        />

        <label>Programs Page Content</label>
        <textarea
          rows="4"
          value={content.programs}
          onChange={(e) => handleChange("programs", e.target.value)}
        />

        <label>Blog Content</label>
        <textarea
          rows="4"
          value={content.blog}
          onChange={(e) => handleChange("blog", e.target.value)}
        />

        <label>Success Stories Content</label>
        <textarea
          rows="4"
          value={content.successStories}
          onChange={(e) => handleChange("successStories", e.target.value)}
        />
      </div>

      <div className="section">
        <h3>SEO & Metadata</h3>
        <label>Page Title</label>
        <input
          type="text"
          value={content.seo.title}
          onChange={(e) => handleSeoChange("title", e.target.value)}
        />

        <label>Description</label>
        <textarea
          rows="2"
          value={content.seo.description}
          onChange={(e) => handleSeoChange("description", e.target.value)}
        />

        <label>Keywords (comma separated)</label>
        <input
          type="text"
          value={content.seo.keywords}
          onChange={(e) => handleSeoChange("keywords", e.target.value)}
        />
      </div>

      <button className="save-button" onClick={handleSubmit}>
        Save Changes
      </button>
    </div>
  );
};

export default WebsiteContentManager;
