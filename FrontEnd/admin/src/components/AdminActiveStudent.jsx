import axios from './axios';
import { useEffect, useState } from 'react';

const AdminActiveStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchActiveStudents = async () => {
      try {
        const res = await axios.get('getActiveStudents'); // Adjust URL if needed
        setStudents(res.data);
      } catch (error) {
        console.error('Error fetching active students', error);
      }
    };

    fetchActiveStudents();
  }, []);

  return (
    <div>
      <h2>Active Students</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name} - {student.email} - {student.course}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminActiveStudents;
