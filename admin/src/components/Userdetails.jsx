import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios';
import '../style/UserDetails.css';

const Userdetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [resume, setResume] = useState(null);
  const [resumeURL, setResumeURL] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/admin/me', { withCredentials: true })
      .then((response) => {
        const { username, email, number, resumeUrl } = response.data;
        setName(username);
        setEmail(email);
        setNumber(number);
        setResumeURL(resumeUrl);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert('Unauthorized: Please log in.');
          navigate('/login');
        } else {
          console.error('Error fetching admin info:', error);
        }
      });
  }, [navigate]);

  const handleSignOut = () => {
    axios
      .post('/admin/logout', {}, { withCredentials: true })
      .then((response) => {
        alert(response.data.message);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleUpload = () => {
    if (!resume) {
      alert('Please select a resume to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);

    axios
      .post('http://localhost:3000/api/admin/profileResume', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        alert('Resume uploaded successfully!');
        setResumeURL(response.data.resumeUrl);
      })
      .catch((error) => {
        console.error('Error uploading resume:', error);
      });
  };

  return (
    <div className="user-container">
      <div className="user-card">
        <h1 className="user-h1">Admin Profile</h1>
        <div className="info">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
         
         
        </div>

       

        <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
      </div>
    </div>
  );
};

export default Userdetails;
