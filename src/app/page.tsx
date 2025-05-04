/* eslint-disable max-len */

'use client';

import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { PrismaClient, Resource } from '@prisma/client';

/** The Home page. */
const Home = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === 'admin@foo.com';
  const isJohn = session?.user?.email === 'john@foo.com';
  const isLoggedIn = isAdmin || isJohn;

	if (isLoggedIn) {
  	fetchResources();
	}
  }, [isLoggedIn]);

  if (loading && isLoggedIn) {
	return (
  	<main id="hasBG" style={{ overflowX: 'hidden', minHeight: '100vh' }}>
    	<Container className="py-5">
      	<Row className="justify-content-center">
        	<Col className="text-center">
          	<div className="spinner-border text-primary" role="status">
            	<span className="visually-hidden">Loading...</span>
          	</div>
        	</Col>
      	</Row>
    	</Container>
  	</main>
	);
  }

  // Admin-specific content
  if (isAdmin) {
    return (
      <main id="hasBG" style={{ overflowX: 'hidden', minHeight: '100vh' }}>
        <Container className="py-5">
          <Row className="mb-4 text-center">
            <Col>
              <h2 className="fw-bold mb-3" style={{ color: 'black' }}>All Resources (Admin View)</h2>
              <p className="lead" style={{ maxWidth: '700px', margin: '0 auto', color: 'black' }}>
                As an admin, you can view and manage all resources in the system.
              </p>
            </Col>
          </Row>

          <Row className="g-4 justify-content-center">
            {adminResources.map((res) => (
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
                        <b>Type:</b> {res.type}
                      </small>
                      <br />
                      <small>
                        <b>Location:</b> {res.location}
                      </small>
                      <br />
                      <small>
                        <b>Campus:</b> {res.campus}
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
      </main>
    );
  }

// John-specific content
if (isJohn) {
  return (
    <main id="hasBG" style={{ overflowX: 'hidden', minHeight: '100vh' }}>
      <Container className="py-5">
        {/* New "How It Works" section */}
        <Row className="mb-5 text-center">
          <Col>
            <h2 className="fw-bold mb-3" style={{ color: 'black' }}>How To Use The Scheduler</h2>
            <p className="lead" style={{ maxWidth: '800px', margin: '0 auto', color: 'black' }}>
              Browse and reserve equipment through the Equipment tab, book study rooms via the Rooms tab, 
              manage your current reservations in Your Resources, and get personalized recommendations 
              using our LoanLink AI assistant.
            </p>
          </Col>
        </Row>

        {/* Existing resources section */}
        <Row className="mb-4 text-center">
          <Col>
            <h2 className="fw-bold mb-3" style={{ color: 'black' }}>Recently Available Resources</h2>
            <p className="lead" style={{ maxWidth: '700px', margin: '0 auto', color: 'black' }}>
              Browse a selection of the most recently posted rooms, equipment, and tools on campus. 
              These resources are available now, and you can borrow them directly by clicking one of 
              the options below or exploring further on our Borrow Equipment Tab.
            </p>
          </Col>
        </Row>

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
                      <b>Type:</b> {res.type}
                    </small>
                    <br />
                    <small>
                      <b>Location:</b> {res.location}
                    </small>
                    <br />
                    <small>
                      <b>Campus:</b> {res.campus}
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
    </main>
  );
}

  // Default content (not logged in)
  return (
    <main id="hasBG" style={{ overflowX: 'hidden' }}>
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col className="text-center">
          <h1 style={{ color: 'black' }}>
            Welcome to <b>Campus Resource Scheduler!</b>
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
                or try our <b>LoanLink</b> AI to help you find what you need.
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
    </main>
  );
};

export default Home;