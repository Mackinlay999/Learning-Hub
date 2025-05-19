import React, { useEffect, useState } from 'react';
import axios from './axios';
import '../style/AdminStoryPage.css';

const AdminStoryPage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // To avoid caching issues, we can append a timestamp or unique value
    axios.get('/getAllStories?timestamp=' + new Date().getTime())
      .then(response => {
        setStories(response.data);
      })
      .catch(error => {
        console.log('Error fetching stories:', error);
      });
  }, [stories]); // Empty dependency array ensures it runs on mount only

  return (
    <div className="story-page">
      <h1>Success Stories</h1>
      <div className="story-list">
        {stories.map((story, index) => (
          <div key={index} className="story-item">
            <img   src={`https://learning-hub-p2yq.onrender.com/uploads/${story.photo}`} alt={story.name} className="story-image" />
            <div className="story-header">
              <h2 className="story-title">{story.name}</h2>
              {story.LinkedinUrl  && (
                <a href={story.LinkedinUrl} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="linkedin-icon" />
                </a>
              )}
            </div>
            <p className="story-arrow">⬇️</p>
            <p className="story-author">{story.company}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStoryPage;
