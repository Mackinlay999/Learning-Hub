import React from "react";
import "../style/NetworkingSession.css";
// import sessionImage from "./session.jpg"; // Replace with the actual image path

const NetworkingSession = () => {
  return (

    <div className="network">

    <div className="networking-container">
      <div className="networking-content">
        <h2>Networking sessions - GL Confluence</h2>
        <ul>
          <li>🔵 Connect with like-minded professionals</li>
          <li>🔵 Grow your professional network</li>
        </ul>
        <h3>Our learners work at top companies</h3>
        <div className="company-logos">
          <img src="https://tse2.mm.bing.net/th?id=OIP.0Eb1VUFSOSpcwYlahbfHLAHaHa&pid=Api&P=0&h=220" alt="Microsoft" />

          <img src="https://tse3.mm.bing.net/th?id=OIP.Wk9CWgZilLnrCJgC8nlllwHaEK&pid=Api&P=0&h=220" alt="Amazon" />

          <img src="https://tse3.mm.bing.net/th?id=OIP.Ci0j7mR8W_tCJDWGyrymrgHaEK&pid=Api&P=0&h=220" alt="American Express" />

          <img src="https://tse2.mm.bing.net/th?id=OIP.aWCJ_2NzRkT8ZPgITkzzWwHaEK&pid=Api&P=0&h=220" alt="Netflix" />

          <img src="https://tse1.mm.bing.net/th?id=OIP.kDgfn1RL9uUQS-B0fbHePQHaDt&pid=Api&P=0&h=220" alt="Google" />


          <img src="https://tse1.mm.bing.net/th?id=OIP.TGuFnB7AJ5sz0_K_bZHlYQHaDt&pid=Api&P=0&h=220" alt="Flipkart" />

          <img src="https://tse2.mm.bing.net/th?id=OIP.DeId6RpwM-avm_kPulWfrAHaEK&pid=Api&P=0&h=220" alt="Adobe" />

          {/* <img src="https://tse2.mm.bing.net/th?id=OIP.CkH31o9wmgOSJUcQ3apu4wHaEi&pid=Api&P=0&h=220" alt="Citibank" /> */}
        </div>
      </div>
      <div className="networking-image">
        <img src="./img/Team.png" alt="Networking Event" />
      </div>
    </div>



    <div className="hackathon-container">
      {/* Left Section - Text Content */}
      <div className="hackathon-content">
        <h2>Hackathons & Live Projects</h2>
        <ul>
          <li>🔵 Participate in hackathons sponsored by top companies</li>
          <li>🔵 Build industry experience that will be relevant to your future job</li>
          <li>🔵 Take part in live projects organised by companies such as Mahindra Logistics, Wysa, Bajaj Allianz</li>
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

export default NetworkingSession;
