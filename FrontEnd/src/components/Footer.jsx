// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Image, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaLinkedinIn,
//   FaInstagram,
//   FaArrowUp,
// } from "react-icons/fa";
// import "../style/Footer.css";
// import Logo from "../images/logo.png";

// const Footer = () => {
//   const [showScroll, setShowScroll] = useState(false);

//   useEffect(() => {
//     const checkScroll = () => {
//       setShowScroll(window.scrollY > 200);
//     };
//     window.addEventListener("scroll", checkScroll);
//     return () => window.removeEventListener("scroll", checkScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <motion.footer
//         className="footer"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <Container>
//           <Row className="footer-content">
//             {/* Footer Logo & Branding */}
//             <Col md={4} className="footer-logo text-center">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Image
//                   src={Logo}
//                   alt="Company Logo"
//                   className="footer-logo-img"
//                 />
//               </motion.div>
//             </Col>

//             {/* <div className="content-container">
//         <div className="text-content">
//           <h2>Contact Us</h2>
//           <p>Let’s Connect,</p>
//           <p>Have any questions? Feel free to reach out!</p>
//           <p>📍 Headquarters: Bangalore, Karnataka</p>
//           <p>📞 Phone: 09363352660</p>
//           <p>📧 Email: harikrishg44@gmail.com</p>
//           <p>🌐 Mackinlay Learning Hub.Com</p>
//         </div>
//       </div> */}

      



//             {/* Quick Links Section */}
//             <Col md={4} className="footer-links">
//               <h5>Quick Links</h5>
//               <ul>
//                 <motion.li whileHover={{ scale: 1.1 }}>
//                   <Link to="/about">About Us</Link>
//                 </motion.li>
//                 <motion.li whileHover={{ scale: 1.1 }}>
//                   <Link to="/contact">Contact</Link>
//                 </motion.li>
//                 <motion.li whileHover={{ scale: 1.1 }}>
//                   <Link to="/careers">Careers</Link>
//                 </motion.li>
//                 <motion.li whileHover={{ scale: 1.1 }}>
//                   <Link to="/blog">Blog</Link>
//                 </motion.li>
//               </ul>
//             </Col>

//             {/* Social Media Links */}
//             <Col md={4} className="footer-social text-center">
//               <h5>Follow Us</h5>
//               <motion.a
//                 href="https://www.facebook.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="social-icon facebook"
//                 whileHover={{ scale: 1.2, rotate: 10 }}
//               >
//                 <FaFacebookF />
//               </motion.a>
//               <motion.a
//                 href="https://twitter.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="social-icon twitter"
//                 whileHover={{ scale: 1.2, rotate: -10 }}
//               >
//                 <FaTwitter />
//               </motion.a>
//               <motion.a
//                 href="https://www.linkedin.com/company/mackinlay-learning-hub/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="social-icon linkedin"
//                 whileHover={{ scale: 1.2, rotate: 10 }}
//               >
//                 <FaLinkedinIn />
//               </motion.a>
//               <motion.a
//                 href="https://www.instagram.com/mackinlay_learning_hub/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="social-icon instagram"
//                 whileHover={{ scale: 1.2, rotate: -10 }}
//               >
//                 <FaInstagram />
//               </motion.a>
//             </Col>
//           </Row>

//           {/* Copyright Text - Centered */}
//           <Row>
//             <Col className="text-center copyright-text">
//               <p>&copy; 2024 Mackinlay Learning Hub. All Rights Reserved.</p>
//             </Col>
//           </Row>
//         </Container>
//       </motion.footer>

//       {/* Scroll-to-Top Button */}
//       {showScroll && (
//         <motion.button
//           className="scroll-to-top"
//           onClick={scrollToTop}
//           whileHover={{ scale: 1.2 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <FaArrowUp />
//         </motion.button>
//       )}
//     </>
//   );
// };

// export default Footer;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";
import "../style/Footer.css";
import Logo from "../images/logo.png";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      className="footer py-5 bg-dark text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Container>
        {/* Responsive 4-Column Layout */}
        <Row className="gy-4 justify-content-between text-center text-md-start">
          
          {/* Column 1: Logo */}
          <Col md={3} sm={6}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Image src={Logo} alt="Company Logo" className="footer-logo-img mb-3" />
            </motion.div>
            
          </Col>

          {/* Column 2: Contact Info */}
          <Col md={3} sm={6}>
  <h5 className="text-white">Contact Us</h5>
  <p className="text-white">📍 Bangalore, Karnataka</p>
  <p className="text-white">📞 09363352660</p>
  <p className="text-white">📧 harikrishg44@gmail.com</p>
  <p className="text-white">🌐 Mackinlay Learning Hub</p>
</Col>


          {/* Column 3: Quick Links */}
          <Col md={3} sm={6}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/about" className="text-white">About Us</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-white">Contact</Nav.Link>
              <Nav.Link as={Link} to="/careers" className="text-white">Careers</Nav.Link>
              <Nav.Link as={Link} to="/blog" className="text-white">Blog</Nav.Link>
            </Nav>
          </Col>

          {/* Column 4: Social Media */}
          <Col md={3} sm={6} className="text-md-end">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <motion.a href="https://www.facebook.com/" className="social-icon">
                <FaFacebookF />
              </motion.a>
              <motion.a href="https://twitter.com/" className="social-icon">
                <FaTwitter />
              </motion.a>
              <motion.a href="https://www.linkedin.com/company/mackinlay-learning-hub/" className="social-icon">
                <FaLinkedinIn />
              </motion.a>
              <motion.a href="https://www.instagram.com/mackinlay_learning_hub/" className="social-icon">
                <FaInstagram />
              </motion.a>
            </div>
          </Col>

        </Row>

        {/* Copyright Text */}
        <Row className="mt-4 ">
          <Col className="text-center">
            <p className="text-white">&copy; 2024 Mackinlay Learning Hub. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>

      {/* Scroll-to-Top Button */}
      {showScroll && (
        <motion.button
          className="scroll-to-top btn btn-primary"
          onClick={scrollToTop}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp />
        </motion.button>
      )}
    </motion.footer>
  );
};

export default Footer;
