import React from "react"; // Importing React library to create React components
import "./footer.css"; // Importing styles for the Footer component
import { Container, Row, Col } from "reactstrap"; // Importing Container, Row, and Col components from Reactstrap
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Importing social media icons from react-icons/fa
import HomeEase from "../../images/HomeEase.png"; // Importing the HomeEase logo image
import { Link } from "react-router-dom/cjs/react-router-dom"; // Importing Link component from react-router-dom

// Define a functional component called Footer
const Footer = () => {
  return (
    <footer className="footer"> {/* Footer section with class name 'footer' */}
      <Container> {/* Container component to wrap content */}
        <Row> {/* Row component for layout */}
          {/* Column for logo */}
          <Col xs={12} md={3}>
            <div className="logo"> {/* Logo container */}
              <img src={HomeEase} alt="Logo" /> {/* HomeEase logo */}
            </div>
          </Col>
          {/* Column for quick links */}
          <Col xs={12} md={3}>
            <div className="footer-links"> {/* Footer links container */}
              <h4>Quick Links</h4> {/* Title for quick links */}
              <ul> {/* Unordered list for links */}
                <li>
                  <Link to="/">Home</Link> {/* Link to home page */}
                </li>
                <li>
                  <Link to="/services">Accommodation</Link> {/* Link to accommodation page */}
                </li>
                <li>
                  <Link to="/contact">Contact</Link> {/* Link to contact page */}
                </li>
              </ul>
            </div>
          </Col>
          {/* Column for social links */}
          <Col xs={12} md={3}>
            <div className="footer-links"> {/* Footer links container */}
              <h4>Social Links</h4> {/* Title for social links */}
              <ul> {/* Unordered list for social links */}
                <li>
                  <a href="#"> {/* Link to Facebook */}
                    <FaFacebookF /> {/* Facebook icon */}
                  </a>
                </li>
                <li>
                  <a href="#"> {/* Link to Twitter */}
                    <FaTwitter /> {/* Twitter icon */}
                  </a>
                </li>
                <li>
                  <a href="#"> {/* Link to Instagram */}
                    <FaInstagram /> {/* Instagram icon */}
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          {/* Column for contact information */}
          <Col xs={12} md={3}>
            <div className="footer-links"> {/* Footer links container */}
              <h4>Contact Us</h4> {/* Title for contact information */}
              <p>123 Main Street, City, State</p> {/* Address */}
              <p>Email: info@example.com</p> {/* Email */}
              <p>Phone: +1 123 456 7890</p> {/* Phone number */}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; // Exporting the Footer component as default
