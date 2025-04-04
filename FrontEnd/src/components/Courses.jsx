import { useState } from "react";
import "../style/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "React Basics", instructor: "John Doe", duration: "4 Weeks" },
    { id: 2, name: "Node.js Advanced", instructor: "Jane Smith", duration: "6 Weeks" },
  ]);
  const [newCourse, setNewCourse] = useState({ name: "", instructor: "", duration: "" });
  const [editCourse, setEditCourse] = useState(null); // For editing a course

  // Handle input change for adding a course
  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  // Add a new course
  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.instructor || !newCourse.duration) return;
    setCourses([...courses, { id: courses.length + 1, ...newCourse }]);
    setNewCourse({ name: "", instructor: "", duration: "" });
  };

  // Delete a course
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  // Start editing a course
  const handleEditCourse = (course) => {
    setEditCourse(course);
  };

  // Handle changes in edit fields
  const handleEditChange = (e) => {
    setEditCourse({ ...editCourse, [e.target.name]: e.target.value });
  };

  // Save the edited course
  const handleSaveEdit = () => {
    setCourses(courses.map((course) => (course.id === editCourse.id ? editCourse : course)));
    setEditCourse(null);
  };

  return (
    <div className="courses">
      <h1 className="page-title">Course Management</h1>

      {/* Course Form */}
      <div className="course-form">
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="instructor"
          placeholder="Instructor"
          value={newCourse.instructor}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={newCourse.duration}
          onChange={handleInputChange}
        />
        <button className="add-course" onClick={handleAddCourse}>
          Add Course
        </button>
      </div>

      {/* Course Table */}
      <table className="course-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Instructor</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>
                {editCourse && editCourse.id === course.id ? (
                  <input type="text" name="name" value={editCourse.name} onChange={handleEditChange} />
                ) : (
                  course.name
                )}
              </td>
              <td>
                {editCourse && editCourse.id === course.id ? (
                  <input type="text" name="instructor" value={editCourse.instructor} onChange={handleEditChange} />
                ) : (
                  course.instructor
                )}
              </td>
              <td>
                {editCourse && editCourse.id === course.id ? (
                  <input type="text" name="duration" value={editCourse.duration} onChange={handleEditChange} />
                ) : (
                  course.duration
                )}
              </td>
              <td>
                {editCourse && editCourse.id === course.id ? (
                  <button className="save" onClick={handleSaveEdit}>Save</button>
                ) : (
                  <>
                    <button className="edit" onClick={() => handleEditCourse(course)}>Edit</button>
                    <button className="delete" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;
