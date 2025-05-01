/* eslint-disable max-len */

'use client';

import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';

/** The Home page. */
const Home = () => {
  const mockResources = [
    {
      id: 1,
      name: 'Camera Tripod',
      type: 'Equipment',
      location: 'Media Room 3',
      campus: 'UH Mānoa',
      postedDate: 'Posted April 21, 2025',
      imageUrl: '/images/default-resource.jpg',
    },
    {
      id: 2,
      name: 'Study Room A',
      type: 'Room',
      location: 'Hamilton Library 2nd Floor',
      campus: 'UH Mānoa',
      postedDate: 'Posted April 20, 2025',
      imageUrl: '/images/default-resource.jpg',
    },
    {
      id: 3,
      name: 'Microscope',
      type: 'Lab Equipment',
      location: 'Bilger Hall 112',
      campus: 'UH Mānoa',
      postedDate: 'Posted April 18, 2025',
      imageUrl: '/images/default-resource.jpg',
    },
  ];

  return (
    <main id="hasBG" style={{ overflowX: 'hidden' }}>
      {/* Hero section */}
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col className="text-center">
          <h1 style={{ color: 'black' }}>
            Welcome to
            {' '}
            <b>Campus Resource Scheduler!</b>
          </h1>
          <Row className="justify-content-center align-items-center">
            <Col className="text-center col-auto mx-5">
              <Button
                size="lg"
                id="landing-button"
                className="mt-2 rounded-0"
                href="/"
                style={{ backgroundColor: '#363636', border: 'none' }}
              >
                <b>Borrow Equipment</b>
              </Button>
            </Col>
            <Col className="text-center col-auto mx-5">
              <Button
                size="lg"
                id="landing-button"
                className="mt-2 rounded-0"
                href="/"
                style={{ backgroundColor: '#363636', border: 'none' }}
              >
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
                <Button
                  size="lg"
                  id="landing-button"
                  className="mt-2 rounded-0"
                  href="/"
                  style={{ backgroundColor: '#363636', border: 'none' }}
                >
                  <b>LoanLink</b>
                </Button>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Full-Width Recently Available Section with UH Mānoa Green */}
      <div style={{ backgroundColor: '#00694b', color: 'white', padding: '4rem 1rem' }}>
        <Container>
          {/* Overview/Instructions */}
          <Row className="mb-4 text-center">
            <Col>
              <h2 className="fw-bold mb-3">Recently Available Resources</h2>
              <p className="lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
                Browse a selection of the most recently posted rooms, equipment, and tools on campus. These resources are available now, and you can borrow them directly by clicking one of the options bellow or exploring further on our Borrow Equipment Tab.
              </p>
            </Col>
          </Row>

          {/* Card Grid */}
          <Row className="g-4 justify-content-center">
            {mockResources.map((res) => (
              <Col key={res.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm border-0">
                  <div style={{ height: '160px', position: 'relative' }}>
                    <Image
                      src={res.imageUrl}
                      alt={res.name}
                      fill
                      style={{ objectFit: 'cover', borderTopLeftRadius: '0.375rem', borderTopRightRadius: '0.375rem' }}
                    />
                  </div>
                  <Card.Body className="bg-white text-dark">
                    <Card.Title>{res.name}</Card.Title>
                    <Card.Text>
                      <small>
                        <b>Type:</b>
                        {' '}
                        {res.type}
                      </small>
                      <br />
                      <small>
                        <b>Location:</b>
                        {' '}
                        {res.location}
                      </small>
                      <br />
                      <small>
                        <b>Campus:</b>
                        {' '}
                        {res.campus}
                      </small>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-secondary text-white text-center">
                    <small>{res.postedDate}</small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default Home;
