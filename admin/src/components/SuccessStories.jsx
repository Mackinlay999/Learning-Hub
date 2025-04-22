// import React, { useEffect, useState } from "react";
// import "../style/SuccessStories.css"; // Import the CSS file

// const SuccessStories = () => {
//   const [stories, setStories] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     company: "",
//     photo: null,
    
   
//   });
//   const [editId, setEditId] = useState(null);

//   // Using demo/mock data for preview
//   useEffect(() => {
//     const demoStories = [
//       {
//         _id: "1",
//         name: "Ananya Sharma",
//         company: "Google",
//         visible: true,
//          photo: "https://tse3.mm.bing.net/th?id=OIP.ExUMGcgLhnkYGwDJXWDd1QHaF8&pid=Api&P=0&h=220"
//       },
//       {
//         _id: "2",
//         name: "Rahul Verma",
//         company: "Microsoft",
//         visible: false,
//       },
//     ];
//     setStories(demoStories);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "file") {
//       setFormData({ ...formData, [name]: files[0] });
//     } else if (type === "checkbox") {
//       setFormData({ ...formData, [name]: checked });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newStory = {
//       _id: Math.random().toString(),
//       name: formData.name,
//       company: formData.company,
//       visible: formData.visible,
//     };

//     if (editId) {
//       setStories(stories.map((s) => (s._id === editId ? newStory : s)));
//       setEditId(null);
//     } else {
//       setStories([newStory, ...stories]);
//     }

//     setFormData({
//         name: story.name,
//         company: story.company,
//         visible: story.visible,
//         photo: null,
//       });
//   };

//   const handleEdit = (story) => {
//     setEditId(story._id);
//     setFormData({
//       name: story.name,
//       company: story.company,
//       visible: story.visible,
//       photo: null,
//       letter: null,
//     });
//   };

//   const handleDelete = (id) => {
//     setStories(stories.filter((story) => story._id !== id));
//   };

//   const handleToggleVisibility = (id, current) => {
//     setStories(
//       stories.map((story) =>
//         story._id === id ? { ...story, visible: !current } : story
//       )
//     );
//   };

//   return (
//     <div className="container">
//       <h2 className="title">Add / Edit Student Success Story</h2>
//       <form onSubmit={handleSubmit} className="form">
//         <input
//           type="text"
//           name="name"
//           placeholder="Student Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="company"
//           placeholder="Placed At"
//           value={formData.company}
//           onChange={handleChange}
//           required
//         />
//         <input type="file" name="photo" accept="image/*" onChange={handleChange} />
//         {/* <input type="file" name="letter" accept="application/pdf,image/*" onChange={handleChange} /> */}
//         {/* <label className="checkbox">
//           <input
//             type="checkbox"
//             name="visible"
//             checked={formData.visible}
//             onChange={handleChange}
//           />
//           Show on Website
//         </label> */}
//         <button type="submit" className="btn">
//           {editId ? "Update" : "Add"}
//         </button>
//       </form>

//       <h2 className="subtitle">All Success Stories</h2>
//       <div className="story-list">
//         {stories.map((story) => (
//           <div key={story._id} className="story-card">
//             <div>
//               <p className="story-name">Name :{story.name}</p>
//               <p>Company: {story.company}</p>
//               <img src={story.photo}  alt={story.name} />
             
//             </div>
//             <div className="actions">
//               <button onClick={() => handleEdit(story)} className="edit-btn">Edit</button>
//               <button onClick={() => handleDelete(story._id)} className="delete-btn">Delete</button>
//               <button
//                 onClick={() => handleToggleVisibility(story._id, story.visible)}
//                 className="toggle-btn"
//               >
//                 Toggle
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SuccessStories;

import React, { useEffect, useState } from "react";
import axios from "./axios";
import "../style/SuccessStories.css";

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    photo: null,
  });
  const [editId, setEditId] = useState(null);

  // GET all success stories
  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await axios.get(`/getAllStories`);
      setStories(res.data);
    } catch (err) {
      console.error("Error fetching stories:", err);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Create or update story
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("company", formData.company);
    if (formData.photo) data.append("photo", formData.photo);

    try {
      if (editId) {
        await axios.put(`/updateStory/${editId}`, data);
      } else {
        await axios.post(`/createStory`, data);
      }
      await fetchStories();
      setEditId(null);
      setFormData({ name: "", company: "", photo: null, visible: true });
    } catch (err) {
      console.error("Error submitting story:", err);
    }
  };

  // Edit story
  const handleEdit = (story) => {
    setEditId(story._id);
    setFormData({
      name: story.name,
      company: story.company,
      visible: story.visible ?? true,
      photo: null,
    });
  };

  // Delete story
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/deleteStory/${id}`);
      setStories(stories.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting story:", err);
    }
  };

  // Toggle visibility
  const handleToggleVisibility = async (id, current) => {
    try {
      await axios.put(`/updateStory/${id}`, {
        visible: !current,
      });
      await fetchStories();
    } catch (err) {
      console.error("Error toggling visibility:", err);
    }
  };

  return (
    <div className="success-story-container">
      <h2 className="success-story-title">Add / Edit Student Success Story</h2>
      <form onSubmit={handleSubmit} className="success-story-form">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Placed At"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
        />
        
        <button type="submit" className="success-story-btn">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <h2 className="success-story-subtitle">All Success Stories</h2>
      <div className="success-story-list">
        {stories.map((story) => (
          <div key={story._id} className="success-story-card">
            <div>
              <p className="success-story-name">Name: {story.name}</p>
              <p>Company: {story.company}</p>
              {story.photo && (
                <img
                  src={story.photo}
                  alt={story.name}
                  className="success-story-photo"
                />
              )}
            </div>
            <div className="success-story-actions">
              <button onClick={() => handleEdit(story)} className="success-story-edit-btn">
                Edit
              </button>
              <button
                onClick={() => handleDelete(story._id)}
                className="success-story-delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;


