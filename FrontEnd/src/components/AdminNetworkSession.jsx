import React from "react";
import "../style/AdminNetworkingSession.css";
// import sessionImage from "./session.jpg"; // Replace with the actual image path

const AdminNetworkingSession = () => {
  return (

    <div className="network">

    <div className="networking-container">
      <div className="networking-content">
        <h2 className="networking-h2">Networking sessions - MLH Confluence</h2>
        <ul>
          <li>🔵 Connect with like-minded professionals</li>
          <li>🔵 Grow your professional network</li>
        </ul>
        
      </div>
      <div className="networking-image">
        <img src="https://tse2.mm.bing.net/th?id=OIP.ra_a2rigyTHOYB1yL2y9uQHaEU&pid=Api&P=0&h=220" alt="Networking Event" />
      </div>
    </div>



    <div className="hackathon-container">
      {/* Left Section - Text Content */}
      <div className="hackathon-content">
        <h2 className="hackathon-h2">Hackathons & Live Projects</h2>
        <ul>
          <li>🔵 Participate in hackathons sponsored by top companies</li>
          <li>🔵 Build industry experience that will be relevant to your future job</li>
          <li>🔵 Take part in live projects organised by companies </li>
          <li>🔵 Work on real-world problems that’ll add value to your resume</li>
        </ul>
      </div>

      {/* Right Section - Image */}
      <div className="hackathon-image">
        <img src="./img/Live-project.png" alt="Hackathon Event" />
      </div>

    </div>
   





    </div>
  );
};

export default AdminNetworkingSession;
