// import React, { useState } from "react";
// import "../style/CareerCarousel.css";
// import people1 from "../images/people1.png";
// import people2 from "../images/people2.png";
// import people3 from "../images/people3.png"
// import people4 from "../images/people4.png";
// import people5 from "../images/people5.png";
// import people6 from "../images/people6.png"
// import people7 from "../images/people7.png"
// import people10 from "../images/people10.png"









// // career transitions data
// const careerTransitions = [
//   {
//     name: "Sai Ramya",
//     previousRole: "QA Tester",
//     previousCompany: "Reliable",
//     fromimage: "https://tse1.mm.bing.net/th?id=OIP.SfQRRq0xmcVV0ZTVLSJsGgHaD4&pid=Api&P=0&h=220",

//     toimage : "https://tse4.mm.bing.net/th?id=OIP.UME36I0QZot0JqzLQFYoTAHaEK&pid=Api&P=0&h=220",
//     newRole: "Data Analyst",
//     newCompany: "Mercedes-Benz",
//     image: people1 // Replace with actual image URL
//   },
//   {
//     name: "Siddharth Garg",
//     previousRole: "GET",
//     previousCompany: "UNO MINDA",
//     fromimage:"https://tse1.mm.bing.net/th?id=OIP._lwwVY4EYZkZygIE4R9l8QHaDL&pid=Api&P=0&h=220",
//     toimage:" https://tse2.mm.bing.net/th?id=OIP.OKJtZr05h1WNMqF2UTyRRgHaEK&pid=Api&P=0&h=220",
//     newRole: "Analyst",
//     newCompany: "American Express",
//     image: people2,
//   },
//   {
//     name: "Sumant Nankar",
//     previousRole: "System Engineer(QA-ETL)",
//     previousCompany: "TCS",
//     fromimage:" https://tse4.mm.bing.net/th?id=OIP.iz0l2PLYQDTZgy32ELt1UAHaEa&pid=Api&P=0&h=220",
//     toimage:" https://tse2.mm.bing.net/th?id=OIP.OIQZo2SQrDnXiDLeXmwPPwAAAA&pid=Api&P=0&h=220",
//     newRole: "Consultant in Financial Risk Advisory",
//     newCompany: "EY",
//     image:people3,
//   },
//   {
//     name: "Jyant Mahara",
//     previousRole: "Application Development Analyst",
//     previousCompany: "Accenture",
//     fromimage:"https://tse4.mm.bing.net/th?id=OIP.SL3dLYvePGonrfH1B4-hxAHaDE&pid=Api&P=0&h=220",
//     toimage:" https://tse3.mm.bing.net/th?id=OIP.3WDKi4vgtlKWRfVukjKF0AHaD4&pid=Api&P=0&h=220",
//     newRole: "Senior Data Scientist",
//     newCompany: "Impact Analytics",
//     image:people4,
//   },
//   {
//     name: "Neha Sharma",
//     previousRole: "Software Engineer",
//     previousCompany: "Infosys",
//     fromimage:"https://tse3.mm.bing.net/th?id=OIP.9ntdfCLFfRaEKexy2PmMvwHaCv&pid=Api&P=0&h=220",
//     toimage:"https://tse3.mm.bing.net/th?id=OIP.SqEICC59PL1VrdefhGEqqgHaCg&pid=Api&P=0&h=220",
//     newRole: "Data Scientist",
//     newCompany: "Google",
//     image:people5,
//   },
//   {
//     name: "Ravi Verma",
//     previousRole: "Marketing Executive",
//     previousCompany: "Deloitte",
//     fromimage:"https://tse4.mm.bing.net/th?id=OIP.vmq2cucD0UCAlpr00Q9NGAHaEK&pid=Api&P=0&h=220",
//     toimage:"https://tse3.mm.bing.net/th?id=OIP.vL108Wlvzp_2mHXF-keXCQHaFj&pid=Api&P=0&h=220",
//     newRole: "Product Manager",
//     newCompany: "Amazon",
//     image:people6,
//   },
//   {
//     name: "Ankit Patel",
//     previousRole: "Junior Developer",
//     previousCompany: "Wipro",
//     fromimage:"https://tse3.mm.bing.net/th?id=OIP.ckaHsUxZQgfH2SNa6C3omAAAAA&pid=Api&P=0&h=220",
//     toimage:"https://tse2.mm.bing.net/th?id=OIP.0Eb1VUFSOSpcwYlahbfHLAHaHa&pid=Api&P=0&h=220",
//     newRole: "Senior Software Engineer",
//     newCompany: "Microsoft",
//     image:people7,
//   },
//   {
//     name: "Priya Kapoor",
//     previousRole: "Data Analyst",
//     previousCompany: "Capgemini",
//     fromimage:"https://tse2.mm.bing.net/th?id=OIP.-qsHehf9bna9qR0ScEFP7gHaDA&pid=Api&P=0&h=220",
//     toimage:"https://tse1.mm.bing.net/th?id=OIP.zf8g1tolI3HRPumaeETgcAHaEK&pid=Api&P=0&h=220",
//     newRole: "AI Engineer",
//     newCompany: "Tesla",
//     image:people10,
    
//   },
// ];

// const CareerCarousel = () => {
//   const [startIndex, setStartIndex] = useState(0);
//   const itemsPerPage = 4;

//   const handleNext = () => {
//     if (startIndex + itemsPerPage < careerTransitions.length) {
//       setStartIndex(startIndex + itemsPerPage);
//     }
//   };

//   const handlePrev = () => {
//     if (startIndex - itemsPerPage >= 0) {
//       setStartIndex(startIndex - itemsPerPage);
//     }
//   };

//   return (
//     <div className="carousel-container">
//       <h2>Successful Career Transitions To Inspire You</h2>
//       <div className="card-container">
//         {careerTransitions.slice(startIndex, startIndex + itemsPerPage).map((person, index) => (
//           <div key={index} className="card">
//             <img src={person.image} alt={person.name} className="profile-img" />
//             <h3>{person.name}</h3>
//             <p>{person.previousRole}</p>
//             <img src={person.fromimage} alt={person.previousCompany} className="company-logo" />
//             <div className="transition-arrow">⬇</div>
//             <p>{person.newRole}</p>
//             <img src={person.toimage} alt={person.newCompany} className="company-logo" />
//           </div>
//         ))}
//       </div>
//       <div className="navigation">
//         <button onClick={handlePrev} disabled={startIndex === 0}>
//           ← Prev
//         </button>
//         <button onClick={handleNext} disabled={startIndex + itemsPerPage >= careerTransitions.length}>
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CareerCarousel;
