import React, { useState } from "react";
import "../style/CareerCarousel.css";
// career transitions data
const careerTransitions = [
  {
    name: "Sai Ramya",
    previousRole: "QA Tester",
    previousCompany: "Reliable",
    newRole: "Data Analyst",
    newCompany: "Mercedes-Benz",
    image: "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png", // Replace with actual image URL
  },
  {
    name: "Siddharth Garg",
    previousRole: "GET",
    previousCompany: "UNO MINDA",
    newRole: "Analyst",
    newCompany: "American Express",
    image: "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png",
  },
  {
    name: "Sumant Nankar",
    previousRole: "System Engineer(QA-ETL)",
    previousCompany: "TCS",
    newRole: "Consultant in Financial Risk Advisory",
    newCompany: "EY",
    image: "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png",
  },
  {
    name: "Jyant Mahara",
    previousRole: "Application Development Analyst",
    previousCompany: "Accenture",
    newRole: "Senior Data Scientist",
    newCompany: "Impact Analytics",
    image: "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png",
  },
  {
    name: "Neha Sharma",
    previousRole: "Software Engineer",
    previousCompany: "Infosys",
    newRole: "Data Scientist",
    newCompany: "Google",
    image: "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png",
  },
  {
    name: "Ravi Verma",
    previousRole: "Marketing Executive",
    previousCompany: "Deloitte",
    newRole: "Product Manager",
    newCompany: "Amazon",
    image: "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png",
  },
  {
    name: "Ankit Patel",
    previousRole: "Junior Developer",
    previousCompany: "Wipro",
    newRole: "Senior Software Engineer",
    newCompany: "Microsoft",
    image: "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png",
  },
  {
    name: "Priya Kapoor",
    previousRole: "Data Analyst",
    previousCompany: "Capgemini",
    newRole: "AI Engineer",
    newCompany: "Tesla",
    image: "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png",
  },
];

const CareerCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (startIndex + itemsPerPage < careerTransitions.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <div className="carousel-container">
      <h2>Successful Career Transitions To Inspire You</h2>
      <div className="card-container">
        {careerTransitions.slice(startIndex, startIndex + itemsPerPage).map((person, index) => (
          <div key={index} className="card">
            <img src={person.image} alt={person.name} className="profile-img" />
            <h3>{person.name}</h3>
            <p>{person.previousRole}</p>
            <img src={`https://via.placeholder.com/100`} alt={person.previousCompany} className="company-logo" />
            <div className="transition-arrow">⬇</div>
            <p>{person.newRole}</p>
            <img src={`https://via.placeholder.com/100`} alt={person.newCompany} className="company-logo" />
          </div>
        ))}
      </div>
      <div className="navigation">
        <button onClick={handlePrev} disabled={startIndex === 0}>
          ← Prev
        </button>
        <button onClick={handleNext} disabled={startIndex + itemsPerPage >= careerTransitions.length}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default CareerCarousel;
