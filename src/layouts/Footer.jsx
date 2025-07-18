import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-wrap bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="mb-2">Loca Pelicula</h5>
            <p className="mb-0 small">© 2025 MovieLog. All rights reserved.</p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0 text-center">
            <a href="/about" className="text-light me-3 small">
              About
            </a>
            <a href="/contact" className="text-light me-3 small">
              Contact
            </a>
            <a href="/policy" className="text-light small">
              Policy
            </a>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <FaFacebook className="me-3 icon-hover" />
            <FaInstagram className="me-3 icon-hover" />
            <FaTwitter className="icon-hover" />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
