import { Col, Container, Row } from 'react-bootstrap';

/* Render a Not Found page if the user enters a URL that doesn't match any route. */
const NotFound = () => (
  <Container className="py-3" id="hasBG" style={{ height: '100vh', overflow: 'hidden', minWidth: '100vw' }}>
    <Row className="justify-content-center">
      <Col xs={4} className="text-center">
        <h2>
          <p>Page not found</p>
        </h2>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
