

import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/AdminEmployerLogin.css";

const AdminEmployerLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="AdminEmployer-container">
      <div className="AdminEmployer-buttonWrapper">
        <button className="AdminEmployer-userLoginBtn"
          onClick={() => navigate("/login")}
        >
          User Login
        </button>
        <button
          className="AdminEmployer-adminLoginBtn"
          onClick={() => navigate("/admin-login")}
        >
          Admin Login
        </button>


        {/* <button
          className="AdminEmployer-adminLoginBtn"
          onClick={() => navigate("/Recruiter-login")}
        >
        
           Recruiter Login
           </button> */}

       <button
      className="AdminEmployer-adminLoginBtn"
      onClick={() => navigate("/Recruiter-login")}
    >
      Recruiter Login
    </button>

           
      </div>
    </div>
  );
};

export default AdminEmployerLogin;


