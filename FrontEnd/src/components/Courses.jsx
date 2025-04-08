import { useEffect, useState } from "react";
import "../style/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", instructor: "", duration: "" , price: ""});
  const [editCourse, setEditCourse] = useState(null);

  const API_BASE = "http://localhost:3000/api"; // 🔁 Update if your port or URL differs

  // 📦 Fetch all courses on component load
  useEffect(() => {
    fetch(`${API_BASE}/getProgram`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Failed to fetch courses", err));
  }, []);

  // ✅ Handle form input
  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  // ➕ Add a new course
  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.instructor || !newCourse.duration ||  !newCourse.price) return;

    fetch(`${API_BASE}/createProgram`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    })
      .then((res) => res.json())
      .then(() => {
        fetch(`${API_BASE}/getProgram`)
          .then((res) => res.json())
          .then((data) => setCourses(data));
        setNewCourse({ name: "", instructor: "", duration: "",price:"" });
      });
  };

  // 🗑 Delete a course
  const handleDeleteCourse = (id) => {
    fetch(`${API_BASE}/deleteProgram/${id}`, {
      method: "DELETE",
    })
      .then(() => setCourses(courses.filter((c) => c._id !== id)))
      .catch((err) => console.error("Delete failed", err));
  };

  // ✏️ Start editing
  const handleEditCourse = (course) => {
    setEditCourse(course);
  };

  // 🛠 Handle input changes while editing
  const handleEditChange = (e) => {
    setEditCourse({ ...editCourse, [e.target.name]: e.target.value });
  };

  // 💾 Save edits
  const handleSaveEdit = () => {
    fetch(`${API_BASE}/updateProgram/${editCourse._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editCourse),
    })
      .then((res) => res.json())
      .then(() => {
        setCourses(courses.map((c) => (c._id === editCourse._id ? editCourse : c)));
        setEditCourse(null);
      });
  };

  return (
    <div className="courses">
      <h1 className="page-title">Course Management</h1>

      {/* Course Form */}
      <div className="course-form">
        <input type="text" name="name" placeholder="Course Name" value={newCourse.name} onChange={handleInputChange} />
        <input type="text" name="instructor" placeholder="Instructor" value={newCourse.instructor} onChange={handleInputChange} />
        <input type="text" name="duration" placeholder="Duration" value={newCourse.duration} onChange={handleInputChange} />
        <input type="text" name="price" placeholder="price" value={newCourse.price} onChange={handleInputChange} />
        <button className="add-course" onClick={handleAddCourse}>Add Course</button>
      </div>

      {/* Course Table */}
      <table className="course-table">
        <thead>
          <tr className="C-tr">
            <th>ID</th>
            <th>Name</th>
            <th>Instructor</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id} className="C-tr">
              <td>{index + 1}</td>
              <td>
                {editCourse && editCourse._id === course._id ? (
                  <input type="text" name="name" value={editCourse.name} onChange={handleEditChange} />
                ) : (
                  course.name
                )}
              </td>
              <td>
                {editCourse && editCourse._id === course._id ? (
                  <input type="text" name="instructor" value={editCourse.instructor} onChange={handleEditChange} />
                ) : (
                  course.instructor
                )}
              </td>
              <td>
                {editCourse && editCourse._id === course._id ? (
                  <input type="text" name="duration" value={editCourse.duration} onChange={handleEditChange} />
                ) : (
                  course.duration
                )}
              </td>
            
              <td>
                {editCourse && editCourse._id === course._id ? (
                  <input type="text" name="price" value={editCourse.price} onChange={handleEditChange} />
                ) : (
                  course.price
                )}
              </td>






              <td>
                {editCourse && editCourse._id === course._id ? (
                  <button className="save" onClick={handleSaveEdit}>Save</button>
                ) : (
                  <>
                    <button className="edit" onClick={() => handleEditCourse(course)}>Edit</button>
                    <button className="delete" onClick={() => handleDeleteCourse(course._id)}>Delete</button>
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
