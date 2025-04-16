'use client';

import React from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';

// Loading component for use within the client component
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center my-5">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

const YourResources: React.FC = () => {
  const { status } = useSession();

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  // if (status === 'unauthenticated') {
  //   redirect('/auth/signin');
  // }

  // Resources data
  const resources = [
    {
      id: 1,
      name: 'Lab Goggles',
      campus: 'Main Campus',
      postedBy: 'Workplace CC',
      postedOn: '04/16/2025, 9:00 AM',
      location: 'Location',
      returnDeadline: 'Return Deadline',
      imageUrl: '/images/lab-goggles.jpg',
    },
    {
      id: 2,
      name: 'Stuff',
      campus: 'Campus',
      postedBy: 'Posted by',
      postedOn: 'Posted on',
      location: 'Location',
      returnDeadline: 'Return Deadline',
      imageUrl: '/images/default-resource.jpg',
    },
    {
      id: 3,
      name: 'Stuff',
      campus: 'Campus',
      postedBy: 'Posted by',
      postedOn: 'Posted on',
      location: 'Location',
      returnDeadline: 'Return Deadline',
      imageUrl: '/images/default-resource.jpg',
    },
    {
      id: 4,
      name: 'Stuff',
      campus: 'Campus',
      postedBy: 'Posted by',
      postedOn: 'Posted on',
      location: 'Location',
      returnDeadline: 'Return Deadline',
      imageUrl: '/images/default-resource.jpg',
    },
    {
      id: 5,
      name: 'Stuff',
      campus: 'Campus',
      postedBy: 'Posted by',
      postedOn: 'Posted on',
      location: 'Location',
      returnDeadline: 'Return Deadline',
      imageUrl: '/images/default-resource.jpg',
    },
  ];

  return (
    <Container className="py-3">
      <h2>Your Resources</h2>
      <Row className="g-3">
        {resources.map((resource) => (
          <Col key={resource.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className="h-100 border-0">
              {/* Resource Image - Light gray background placeholder */}
              <div className="bg-light" style={{ height: '120px', position: 'relative' }}>
                {resource.imageUrl && (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image
                      src={resource.imageUrl}
                      alt={resource.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
              </div>

              {/* Resource Info with gray background */}
              <div className="bg-light p-2">
                <h5 className="mb-0 fs-6">{resource.name}</h5>
                <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                  <div className="d-flex justify-content-between">
                    <span>{resource.campus}</span>
                    <span>{resource.postedBy}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>{resource.postedOn}</span>
                    <span>{resource.location}</span>
                  </div>
                </div>
              </div>

              {/* Return Deadline with red background */}
              <div className="bg-danger text-white text-center p-1">
                <small>{resource.returnDeadline}</small>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default YourResources;
