


import { useEffect, useState } from "react";
import "../style/AdminCourses.css";
import axios from "./axios";  

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ 
    name: "",
    duration: "", 
    price: "", 
    mode: "",
    Certification :"",
    ProgramOverview: "",
    modules: [{ ModuleTitle: "", Objective: "", Topics: "", Assessments: "" }],
    Programbenefits: [""], // This is an array, initialized with one empty string
    PlacementAssistance: "",
    Enrollkeytitle: "",
    Enrollkeycontent: "",
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

  // Handle dynamic changes for modules
  const handleModuleChange = (index, e) => {
    const updatedModules = [...newCourse.modules];
    updatedModules[index][e.target.name] = e.target.value;
    setNewCourse({ ...newCourse, modules: updatedModules });
  };

  // Add a new module
  const addModule = () => {
    setNewCourse({ ...newCourse, modules: [...newCourse.modules, { ModuleTitle: "", Objective: "", Topics: "", Assessments: "" }] });
  };

  // Delete a module
  const deleteModule = (index) => {
    const updatedModules = newCourse.modules.filter((_, i) => i !== index);
    setNewCourse({ ...newCourse, modules: updatedModules });
  };

  // Add a new program benefit
  const addBenefit = () => {
    setNewCourse({ ...newCourse, Programbenefits: [...newCourse.Programbenefits, ""] });
  };

  // Handle program benefits change
  const handleBenefitChange = (index, e) => {
    const updatedBenefits = [...newCourse.Programbenefits];
    updatedBenefits[index] = e.target.value;
    setNewCourse({ ...newCourse, Programbenefits: updatedBenefits });
  };

  // Handle saving the new course
  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.mode || !newCourse.duration || !newCourse.price) return;
  
    axios.post(`/createProgram`, newCourse)
      .then(() => {
        // ✅ Reset the form after successful submission
        axios.get(`/getAllPrograms`)
          .then((response) => setCourses(response.data));
        setNewCourse({
          name: "",
          mode: "",
          duration: "",
          price: "",
          Certification :"",
          ProgramOverview: "",
          modules: [{ ModuleTitle: "", Objective: "", Topics: "", Assessments: "" }],
          Programbenefits: [""], // Reset array to empty string
          PlacementAssistance: "",
          Enrollkeytitle: "",
          Enrollkeycontent: "",
        });
      })
      .catch((error) => console.error("Failed to add course", error));
  };

  // Delete a course
  const handleDeleteCourse = (id) => {
    axios.delete(`/deleteProgram/${id}`)
      .then(() => setCourses(courses.filter((c) => c._id !== id)))
      .catch((error) => console.error("Delete failed", error));
  };

  const deleteBenefit = (index) => {
    const updatedBenefits = newCourse.Programbenefits.filter((_, i) => i !== index);
    setNewCourse({ ...newCourse, Programbenefits: updatedBenefits });
  };
  

  return (
    <div className="courses">
      <h1 className="page-title">Course Management</h1>

      {/* Course Form */}
      {/* <div className="course-form"> */}
        {/* <input type="text" name="name" placeholder="Course Name" value={newCourse.name} onChange={handleInputChange} />
        <input type="text" name="duration" placeholder="Duration" value={newCourse.duration} onChange={handleInputChange} />
        <input type="text" name="price" placeholder="Price" value={newCourse.price} onChange={handleInputChange} />
        <input type="text" name="mode" placeholder="Mode" value={newCourse.mode} onChange={handleInputChange} />
        <input type="text" name="Certification" placeholder="Certification" value={newCourse.Certification} onChange={handleInputChange} /> */}
        {/* <input type="text" name="ProgramOverview" placeholder="Program Overview" value={newCourse.ProgramOverview} onChange={handleInputChange} /> */}

        {/* Programbenefits */}
        {/* <div>
          {newCourse.Programbenefits.map((benefit, index) => (
            <div key={index} className="benefit-form">
              <input
                type="text"
                name="Programbenefits"
                placeholder="Program benefits"
                value={benefit}
                onChange={(e) => handleBenefitChange(index, e)}
              />
              <button type="button" onClick={addBenefit}>Add Benefit</button>
              <button type="button" onClick={() => deleteBenefit(index)}>Delete Benefit</button>
            </div>
          ))}
        </div> */}

        {/* <input type="text" name="PlacementAssistance" placeholder="Placement Assistance" value={newCourse.PlacementAssistance} onChange={handleInputChange} />
        <input type="text" name="Enrollkeytitle" placeholder="Enroll Key Title" value={newCourse.Enrollkeytitle} onChange={handleInputChange} />
        <input type="text" name="Enrollkeycontent" placeholder="Enroll Key Content" value={newCourse.Enrollkeycontent} onChange={handleInputChange} /> */}
      
        {/* Modules */}
        {/* <div>
          {newCourse.modules.map((module, index) => (
            <div key={index} className="module-form">
              <input
                type="text"
                name="ModuleTitle"
                placeholder="Module Title"
                value={module.ModuleTitle}
                onChange={(e) => handleModuleChange(index, e)}
              />
              <input
                type="text"
                name="Objective"
                placeholder="Objective"
                value={module.Objective}
                onChange={(e) => handleModuleChange(index, e)}
              />
              <input
                type="text"
                name="Topics"
                placeholder="Topics"
                value={module.Topics}
                onChange={(e) => handleModuleChange(index, e)}
              />
              <input
                type="text"
                name="Assessments"
                placeholder="Assessments"
                value={module.Assessments}
                onChange={(e) => handleModuleChange(index, e)}
              />
              <button type="button" onClick={() => deleteModule(index)}>Delete Module</button>
            </div>
          ))}
          <button type="button" className="cou-addmodule" onClick={addModule}>Add Module</button>
        </div> */}
{/* 
        <button className="add-course" onClick={handleAddCourse}>Add Course</button> */}
      {/* </div> */}

      {/* Display Courses */}
      <div className="course-container">
        {courses.map((course, index) => (
          <div className="course-card" key={course._id}>
            <div className="course-header">
              <h3>Course: {index + 1}</h3>
              {/* <button className="c-btn c-btn-edit" onClick={() => setEditCourse(course)}>
                Edit
              </button> */}
              {/* <button className="c-btn c-btn-delete" onClick={() => handleDeleteCourse(course._id)}>
                Delete
              </button> */}
            </div>
            <div className="course-details">
              <div><strong>Name:</strong> {course.name}</div>
              <div><strong>Duration:</strong> {course.duration}</div>
              <div><strong>Price:</strong> {course.price}</div>
              <div><strong>Mode:</strong> {course.mode}</div>
              <div><strong>Certification </strong> {course.Certification}</div>
              
              {/* <div><strong>Modules:</strong></div>
              {course.modules.map((module, i) => (
                <div key={i}>
                  <div><strong>Module Title:</strong> {module.ModuleTitle}</div>
                  <div><strong>Objective:</strong> {module.Objective}</div>
                  <div><strong>Topics:</strong> {module.Topics}</div>
                  <div><strong>Assessments:</strong> {module.Assessments}</div>
                </div>
              ))} */}
{/* 
<div><strong>Programbenefits:</strong> {course.Programbenefits.join(", ")}</div>
              <div><strong>PlacementAssistance:</strong> {course.PlacementAssistance}</div>
              <div><strong>Enrollkeytitle:</strong> {course.Enrollkeytitle}</div>
              <div><strong>Enrollkeycontent:</strong> {course.Enrollkeycontent}</div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;


