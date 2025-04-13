/* eslint-disable max-len */
import { Col, Container, Image, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3" style={{ backgroundColor: '#363636', color: 'white' }}>

    <Container className="d-flex justify-content-end">
      <Image
        className="mx-5"
        src="/logo-text.png"
        width={200}
        height={75}
        alt="logo"
      />
      <Row id="footer-divs" className="w-75 ms-auto align-items-tops">
        <Col>
          <h5 className="text-decoration-none"><b>Quick Links</b></h5>
          <li><a href="/" id="footer-links">Equipment</a></li>
          <li><a href="/" id="footer-links">Rooms</a></li>
          <li><a href="/" id="footer-links">Your Resources</a></li>
        </Col>
        <Col>
          <h5 className="text-decoration-none"><b>About Us</b></h5>
          <li><a href="https://github.com/campus-resource-scheduler-project" id="footer-links">GitHub</a></li>
          <li><a href="https://campus-resource-scheduler-project.github.io" id="footer-links">Project Information</a></li>
        </Col>
        <Col>
          <h5 className="text-decoration-none"><b>Contact Us</b></h5>
          <li>(808) 123-4567</li>
          <li>user@hawaii.edu</li>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
