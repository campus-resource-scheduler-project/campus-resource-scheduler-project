/* eslint-disable max-len */
import { Button, Col, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main id="hasBG" style={{ overflow: 'hidden' }}>
    <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Col className="text-center">
        <h1 style={{ color: 'black' }}>
          Welcome to
          {' '}
          <b>Campus Resource Scheduler!</b>
        </h1>
        <Row className="justify-content-center align-items-center">
          <Col className="text-center col-auto mx-5">
            <Button size="lg" id="landing-button" className="mt-2 rounded-0" href="/" style={{ backgroundColor: '#363636', border: 'none' }}>
              <b>Borrow Equipment</b>
            </Button>
          </Col>
          <Col className="text-center col-auto mx-5">
            <Button size="lg" id="landing-button" className="mt-2 rounded-0" href="/" style={{ backgroundColor: '#363636', border: 'none' }}>
              <b>Borrow Rooms</b>
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col className="mt-5 text-center">
            <h1 style={{ color: 'black', fontSize: '24px' }}>
              or try our
              {' '}
              <b>LoanLink</b>
              {' '}
              AI to help you find what you need.
            </h1>
            <Col className="text-center">
              <Button size="lg" id="landing-button" className="mt-2 rounded-0" href="/" style={{ backgroundColor: '#363636', border: 'none' }}>
                <b>LoanLink</b>
              </Button>
            </Col>
          </Col>
        </Row>
      </Col>
    </Row>
  </main>
);

export default Home;
