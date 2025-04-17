


import { useEffect, useState } from "react";
import "../style/Courses.css";
import axios from "./axios";  



const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ 
    name: "",
    duration: "", 
    price: "", 
    mode: "",
    ProgramOverview: "",
    Curriculumtitle: "",
    objective: [""],   
    topics: "",
    assessments: "",
    Programbenefits: "",
    placementAssistance: "",
    enrollkeytitle: "",
    enrollkeycontent: "",
  });
  const [editCourse, setEditCourse] = useState(null);

  // Fetch all courses on component load using axios
  useEffect(() => {
    axios.get(`/getAllPrograms`)
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Failed to fetch courses", error));
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  // Add a new course using axios
  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.mode || !newCourse.duration || !newCourse.price) return;
  
    axios.post(`/createProgram`, newCourse)
      .then(() => {
        // ✅ FIX: This nested .then was broken earlier
        axios.get(`/getAllPrograms`)
          .then((response) => setCourses(response.data));
        
        // ✅ Reset the form AFTER data is fetched
        setNewCourse({
          name: "",
          mode: "",
          duration: "",
          price: "",
          ProgramOverview: "",
          Curriculumtitle: "",
          objective: "",
          topics: "",
          assessments: "",
          Programbenefits: "",
          placementAssistance: "",
          enrollkeytitle: "",
          enrollkeycontent: "",
        });
      })
      .catch((error) => console.error("Failed to add course", error));
  };
  

  // Delete a course using axios
  const handleDeleteCourse = (id) => {
    axios.delete(`/deleteProgram/${id}`)
      .then(() => setCourses(courses.filter((c) => c._id !== id)))
      .catch((error) => console.error("Delete failed", error));
  };

  // Start editing a course
  const handleEditCourse = (course) => {
    setEditCourse(course);
  };

  // Handle input changes while editing
  const handleEditChange = (e) => {
    setEditCourse({ ...editCourse, [e.target.name]: e.target.value });
  };

  // Save edited course using axios
  const handleSaveEdit = () => {
    axios.put(`/updateProgram/${editCourse._id}`, editCourse)
      .then(() => {
        setCourses(courses.map((c) => (c._id === editCourse._id ? editCourse : c)));
        setEditCourse(null);
      })
      .catch((error) => console.error("Failed to save course", error));
  };

  // Handle dynamic objective changes
  const handleObjectiveChange = (index, value) => {
    const updatedObjectives = [...newCourse.objective];
    updatedObjectives[index] = value;
    setNewCourse({ ...newCourse, objective: updatedObjectives });
  };

  const addObjectiveField = () => {
    setNewCourse({ ...newCourse, objective: [...newCourse.objective, ""] });
  };

  const deleteObjectiveField = (index) => {
    const updatedObjectives = newCourse.objective.filter((_, i) => i !== index);
    setNewCourse({ ...newCourse, objective: updatedObjectives });
  };

  return (
    <div className="courses">
      <h1 className="page-title">Course Management</h1>

      {/* Course Form */}
      <div className="course-form">
        <input type="text" name="name" placeholder="Course Name" value={newCourse.name} onChange={handleInputChange} />
        <input type="text" name="duration" placeholder="Duration" value={newCourse.duration} onChange={handleInputChange} />
        <input type="text" name="price" placeholder="Price" value={newCourse.price} onChange={handleInputChange} />
        <input type="text" name="mode" placeholder="Mode" value={newCourse.mode} onChange={handleInputChange} />
        <input type="text" name="ProgramOverview" placeholder="Program Overview" value={newCourse.ProgramOverview} onChange={handleInputChange} />
        <input type="text" name="Curriculumtitle" placeholder="Curriculum Title" value={newCourse.Curriculumtitle} onChange={handleInputChange} />

        <input type="text" name="objective" placeholder="objective" value={newCourse.objective} onChange={handleInputChange} />



        <input type="text" name="topics" placeholder="Topics" value={newCourse.topics} onChange={handleInputChange} />
        <input type="text" name="assessments" placeholder="Assessments" value={newCourse.assessments} onChange={handleInputChange} />
        <input type="text" name="Programbenefits" placeholder="Program Benefits" value={newCourse.Programbenefits} onChange={handleInputChange} />
        <input type="text" name="placementAssistance" placeholder="Placement Assistance" value={newCourse.placementAssistance} onChange={handleInputChange} />
        <input type="text" name="enrollkeytitle" placeholder="Enroll Key Title" value={newCourse.enrollkeytitle} onChange={handleInputChange} />
        <input type="text" name="enrollkeycontent" placeholder="Enroll Key Content" value={newCourse.enrollkeycontent} onChange={handleInputChange} />

        <button className="add-course" onClick={handleAddCourse}>Add Course</button>
      </div>

      


<div className="course-container">
  {courses.map((course, index) => (
    <div className="course-card" key={course._id}>
      <div className="course-header">
        <h3>Course {index + 1}</h3>

        {/* <button className="c-button"
  onClick={() => {
    if (editCourse && editCourse._id === course._id) {
      handleSaveEdit(); // 👈 this should save
    } else {
      handleEditCourse(course); // 👈 this enables edit mode
    }
  }}
>
  {editCourse && editCourse._id === course._id ? "Save" : "Edit"}
</button>

        <button onClick={() => handleDeleteCourse(course._id)}>Delete</button> */}

<div className="c-course-actions">
  <button
    className="c-btn c-btn-edit"
    onClick={() => {
      if (editCourse && editCourse._id === course._id) {
        handleSaveEdit(); // Save action
      } else {
        handleEditCourse(course); // Edit mode
      }
    }}
  >
    {editCourse && editCourse._id === course._id ? "Save" : "Edit"}
  </button>

  <button
    className="c-btn c-btn-delete"
    onClick={() => handleDeleteCourse(course._id)}
  >
    Delete
  </button>
</div>

      </div>
      <div className="course-details">
        <div className="detail">
          <strong>ID:</strong> {index + 1}
        </div>
        <div className="detail">
          <strong>Name:</strong>
          {editCourse && editCourse._id === course._id ? (
            <input type="text" name="name" value={editCourse.name} onChange={handleEditChange} />
          ) : (
            course.name
          )}
        </div>
        <div className="detail">
          <strong>Duration:</strong>
          {editCourse && editCourse._id === course._id ? (
            <input type="text" name="duration" value={editCourse.duration} onChange={handleEditChange} />
          ) : (
            course.duration
          )}
        </div>
        <div className="detail">
          <strong>Fees:</strong>
          {editCourse && editCourse._id === course._id ? (
            <input type="text" name="price" value={editCourse.price} onChange={handleEditChange} />
          ) : (
            course.price
          )}
        </div>
        <div className="detail">
          <strong>Mode:</strong>
          {editCourse && editCourse._id === course._id ? (
            <input type="text" name="mode" value={editCourse.mode} onChange={handleEditChange} />
          ) : (
            course.mode
          )}
        </div>
        <div className="detail">
          <strong>Curriculum Title:</strong>
          {editCourse && editCourse._id === course._id ? (
            <input type="text" name="Curriculumtitle" value={editCourse.Curriculumtitle} onChange={handleEditChange} />
          ) : (
            course.Curriculumtitle
          )}
        </div>
        <div className="detail">
          <strong>Objective:</strong>
          {editCourse && editCourse._id === course._id ? (
            <input
              type="text"
              name="objective"
              value={Array.isArray(editCourse.objective) ? editCourse.objective.join(', ') : editCourse.objective}
              onChange={handleEditChange}
            />
          ) : (
            Array.isArray(course.objective) ? course.objective.join(', ') : course.objective
          )}
        </div>
        <div className="detail">
          <strong>Topics:</strong>
          {editCourse && editCourse._id === course._id ? (
            <input type="text" name="topics" value={editCourse.topics} onChange={handleEditChange} />
          ) : (
            course.topics
          )}
        </div>
        <div className="detail">
          <strong>Assessments:</strong>
          {editCourse && editCourse._id === course._id ? (
            <input type="text" name="assessments" value={editCourse.assessments} onChange={handleEditChange} />
          ) : (
            course.assessments
          )}
        </div>
        <div className="detail">
          <strong>Program Benefits:</strong>
          {editCourse && editCourse._id === course._id ? (
            <input type="text" name="Programbenefits" value={editCourse.Programbenefits} onChange={handleEditChange} />
          ) : (
            course.Programbenefits
          )}
        </div>
        <div className="detail">
          <strong>Placement Assistance:</strong>
          {editCourse && editCourse._id === course._id ? (
            <input type="text" name="placementAssistance" value={editCourse.placementAssistance} onChange={handleEditChange} />
          ) : (
            course.placementAssistance
          )}
        </div>
        <div className="detail">
          <strong>Enroll Key Title:</strong>
          {editCourse && editCourse._id === course._id ? (
            <input type="text" name="enrollkeytitle" value={editCourse.enrollkeytitle} onChange={handleEditChange} />
          ) : (
            course.enrollkeytitle
          )}
        </div>
        <div className="detail">
          <strong>Enroll Key Content:</strong>
          {editCourse && editCourse._id === course._id ? (
            <input type="text" name="enrollkeycontent" value={editCourse.enrollkeycontent} onChange={handleEditChange} />
          ) : (
            course.enrollkeycontent
          )}
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Courses;

