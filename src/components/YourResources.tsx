import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

const YourResources: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  // Mock data to display the resources based on the provided image
  const resourcesData = [
    {
      id: 1,
      name: 'Lab Goggles',
      campus: 'Main Campus',
      postedBy: 'Workplace CC',
      postedOn: '04/16/2025, 9:00 AM',
      returnDeadline: 'Return Deadline',
      imageUrl: '/images/lab-goggles.jpg',
    },
    {
      id: 2,
      name: 'Stuff',
      campus: 'Campus',
      postedBy: 'Posted by',
      postedOn: 'Posted on',
      returnDeadline: 'Return Deadline',
      imageUrl: '/images/default-resource.jpg',
    },
    {
      id: 3,
      name: 'Stuff',
      campus: 'Campus',
      postedBy: 'Posted by',
      postedOn: 'Posted on',
      returnDeadline: 'Return Deadline',
      imageUrl: '/images/default-resource.jpg',
    },
    {
      id: 4,
      name: 'Stuff',
      campus: 'Campus',
      postedBy: 'Posted by',
      postedOn: 'Posted on',
      returnDeadline: 'Return Deadline',
      imageUrl: '/images/default-resource.jpg',
    },
    {
      id: 5,
      name: 'Stuff',
      campus: 'Campus',
      postedBy: 'Posted by',
      postedOn: 'Posted on',
      returnDeadline: 'Return Deadline',
      imageUrl: '/images/default-resource.jpg',
    },
  ];

  return (
    <Container className="py-3">
      <h2>Your Resources</h2>
      <div className="mb-2">Borrowing</div>

      <Row className="g-3">
        {resourcesData.map((resource) => (
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
                  <div>{resource.postedOn}</div>
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
