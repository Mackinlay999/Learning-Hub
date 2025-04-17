import React, { useEffect, useState } from 'react';
import axios from './axios';
import '../style/StoryPage.css';

const StoryPage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get('/getAllStories')
      .then(response => setStories(response.data))
      .catch(error => console.log('Error fetching stories:', error));
  }, []);

  return (
    <div className="story-page">
      <h1>Success Stories</h1>
      <div className="story-list">
        {stories.map((story, index) => (
          <div key={index} className="story-item">
            <img src={story.photo} alt={story.title} className="story-image" />
            <h2 className="story-title">{story.name}</h2>
            <p className="story-arrow">⬇️</p>
            <p className="story-author">{story.company}</p>
         
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryPage;
