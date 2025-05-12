import React, { useState } from "react";
import axios from "axios";
import "../style/FilterForm.css";

const FilterForm = () => {
  const [learningDomain, setLearningDomain] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Learning Domain:", learningDomain);
    console.log("Work Experience:", workExperience);
    console.log("File:", file);

    if (!learningDomain || !workExperience || !file) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("learningDomain", learningDomain);
    formData.append("workExperience", workExperience);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://learning-hub-p2yq.onrender.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to submit data");
    }
  };

  return (
    <div className="c-container">
      <h2 className="filter-h2">Career Opportunities</h2>
      <form className="c-form" onSubmit={handleSubmit}>
        <select
          className="c-select"
          value={learningDomain}
          onChange={(e) => setLearningDomain(e.target.value)}
        >
          <option value="">Job Opening</option>
          <option value="Data-Scientist">Data Scientist</option>
          <option value="Full-Stack-Developer">Full Stack Developer</option>
          <option value="QA-testing">QA Testing</option>
          <option value="Graphic-Designer">Graphic Designer</option>
          <option value="UI-UX-Designer">UI/UX Designer</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Business Analyst">Business Analyst</option>
          <option value="Finance">Finance</option>
        </select>

        <select
          className="c-select"
          value={workExperience}
          onChange={(e) => setWorkExperience(e.target.value)}
        >
          <option value="">Select Work Experience</option>
          <option value="0-1 Years">0-1 Years</option>
          <option value="1-3 Years">1-3 Years</option>
          <option value="3-5 Years">3-5 Years</option>
          <option value="10+ Years">10+ Years</option>
        </select>

        <input
          className="c-input"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="c-submit" type="submit">
          Apply
        </button>
      </form>
    </div>
  );
};

export default FilterForm;

// import React, { useState } from "react";
// import axios from "axios";
// import "../style/FilterForm.css";

// const FilterForm = () => {
//   const [learningDomain, setLearningDomain] = useState("");
//   const [workExperience, setWorkExperience] = useState("");
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!learningDomain || !workExperience || !file) {
//       showMessage("Please fill all fields before submitting.", "error");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("learningDomain", learningDomain);
//     formData.append("workExperience", workExperience);
//     formData.append("file", file);

//     try {
//       const response = await axios.post("https://learning-hub-p2yq.onrender.com/api/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "Accept": "application/json",
//         },
//       });
//       showMessage("File uploaded successfully!", "success");
//     } catch (error) {
//       showMessage("Failed to submit data", "error");
//     }
//   };

//   const showMessage = (msg, type) => {
//     setMessage(msg);
//     setMessageType(type);
//     setTimeout(() => {
//       setMessage("");
//     },1000);
//   };

//   return (
//     <div className="c-container">
//       {message && <div className={`message ${messageType}`}>{message}</div>}
//       <h2 className="filter-h2">Career Portal</h2>
//       <form className="c-form" onSubmit={handleSubmit}>
//         <select className="c-select" value={learningDomain} onChange={(e) => setLearningDomain(e.target.value)}>
//           <option value="">Job Opening</option>
//           <option value="Data-Scientist">Data Scientist</option>
//           <option value="Full-Stack-Developer">Full Stack Developer</option>
//           <option value="QA-testing">QA Testing</option>
//           <option value="Graphic-Designer">Graphic Designer</option>
//           <option value="UI-UX-Designer">UI/UX Designer</option>
//           <option value="HR">HR</option>
//           <option value="Marketing">Marketing</option>
//           <option value="Sales">Sales</option>
//           <option value="Business Analyst">Business Analyst</option>
//           <option value="Finance">Finance</option>
//         </select>

//         <select className="c-select" value={workExperience} onChange={(e) => setWorkExperience(e.target.value)}>
//           <option value="">Select Work Experience</option>
//           <option value="0-1 Years">0-1 Years</option>
//           <option value="1-3 Years">1-3 Years</option>
//           <option value="3-5 Years">3-5 Years</option>
//           <option value="10+ Years">10+ Years</option>
//         </select>

//         <input className="c-input" type="file" onChange={(e) => setFile(e.target.files[0])} />
//         <button className="c-submit" type="submit">Apply</button>
//       </form>
//     </div>
//   );
// };

// export default FilterForm;
