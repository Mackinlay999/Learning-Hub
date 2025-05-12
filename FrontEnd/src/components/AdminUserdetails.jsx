// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from './axios';
// import '../style/AdminUserdetails.css';

// const AdminUserdetails = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get('/admin/me', { withCredentials: true })
//       .then((response) => {
//         const { username, email, role } = response.data;
//         setName(username);
//         setEmail(email);
//         setRole(role);
//       })
//       .catch((error) => {
//         if (error.response && error.response.status === 401) {
//           alert('Unauthorized: Please log in.');
//           navigate('/login');
//         } else {
//           console.error('Error fetching admin info:', error);
//         }
//       });
//   }, [navigate]);

//   const handleSignOut = () => {
//     axios
//       .post('/admin/logout', {}, { withCredentials: true })
//       .then((response) => {
//         alert(response.data.message);
//         navigate('/login');
//       })
//       .catch((error) => {
//         console.error('Error during logout:', error);
//       });
//   };

//   const handleResumeUpload = (e) => {
//     const file = e.target.files[0];
//     setResume(file);
//   };

//   const handleUpload = () => {
//     if (!resume) {
//       alert('Please select a resume to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('resume', resume);

//     axios
//       .post('/admin/profileResume', formData, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'multipart/form-data' },
//       })
//       .then((response) => {
//         alert('Resume uploaded successfully!');
//         setResumeURL(response.data.resumeUrl);
//       })
//       .catch((error) => {
//         console.error('Error uploading resume:', error);
//       });
//   };

//   return (
//     <div className="user-detail-container">
//       <div className="user-detail-card">
//         <h1 className="user-detail-h1">Admin Profile</h1>
//         <div className="user-detail-info">
//           <p><strong>Name:</strong> {name}</p>
//           <p><strong>Email:</strong> {email}</p>
//           <p><strong>Role:</strong> {role}</p>
//         </div>

//         <button onClick={handleSignOut} className="user-detail-signout-btn">Sign Out</button>
//       </div>
//     </div>
//   );
// };

// export default AdminUserdetails;
