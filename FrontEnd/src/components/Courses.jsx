import { useState } from "react";
import "../style/Courses.css"
const  Courses =() => {
    const [courses, setCourses] = useState([
      { id: 1, name: "React Basics", instructor: "John Doe", duration: "4 Weeks" },
      { id: 2, name: "Node.js Advanced", instructor: "Jane Smith", duration: "6 Weeks" },
    ]);
    const [newCourse, setNewCourse] = useState({ name: "", instructor: "", duration: "" });
  
    const handleAddCourse = () => {
      if (!newCourse.name || !newCourse.instructor || !newCourse.duration) return;
      setCourses([...courses, { id: courses.length + 1, ...newCourse }]);
      setNewCourse({ name: "", instructor: "", duration: "" });
    };
  
    const handleDeleteCourse = (id) => {
      setCourses(courses.filter((course) => course.id !== id));
    };
  
    return (
      <div className="courses">
        <h1 className="page-title">Course Management</h1>
        <div className="course-form">
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Instructor"
            value={newCourse.instructor}
            onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
          />
          <input
            type="text"
            placeholder="Duration"
            value={newCourse.duration}
            onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
          />
          <button className="add-course" onClick={handleAddCourse}>Add Course</button>
        </div>
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
                <td>{course.name}</td>
                <td>{course.instructor}</td>
                <td>{course.duration}</td>
                <td>
                  <button className="delete" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Courses;