/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */

'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { returnResource } from '@/lib/dbActions';

// Loading component for use within the client component
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center my-5">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

// Define Resource type
interface Resource {
  id: number;
  name: string;
  category: string;
  type: string;
  owner: string;
  location: string;
  campus: string;
  image: string;
  posted?: string;
  deadline?: string;
}

interface YourResourcesProps {
  initialResources: Resource[];
}

const YourResources: React.FC<YourResourcesProps> = ({ initialResources = [] }) => {
  const { status } = useSession();
  // Sort the initialResources to prioritize resources with type "room"
  const sortedInitialResources = [...initialResources].sort((a, b) => {
    // Resources with type "room" come first
    if (a.type === 'room' && b.type !== 'room') return -1;
    if (a.type !== 'room' && b.type === 'room') return 1;
    // If both are "room" or both are not "room", maintain original order
    return 0;
  });

  const [resources, setResources] = useState<Resource[]>(sortedInitialResources);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReturnResource = async (resourceId: number) => {
    try {
      setLoading(true);

      // Call the server action to return the resource
      const result = await returnResource(resourceId);

      if (result.success) {
        // Remove the returned resource from the list
        setResources(resources.filter(resource => resource.id !== resourceId));
        setLoading(false);
        return true;
      }
      throw new Error(result.error || 'Failed to return resource');
    } catch (err) {
      console.error('Error returning resource:', err);
      setError('Failed to return resource. Please try again later.');
      setLoading(false);
      return false;
    }
  };

  if (status === 'loading' || loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container className="py-3">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-3 mb-5">
      <h2 className="mb-4">Your Resources</h2>
      {resources.length === 0 ? (
        <div className="alert alert-info">
          You don&apos;t have any resources checked out at the moment.
        </div>
      ) : (
        <Row className="g-4">
          {resources.map((resource) => (
            <Col key={resource.id} xs={12} sm={6} lg={4} className="d-flex justify-content-center">
              {/* Fixed width container for resource card */}
              <div style={{ width: '250px' }}>
                <Card className="h-100 border-0 shadow-sm bg-white" style={{ width: '250px' }}>
                  {/* Resource Image */}
                  <div style={{ height: '250px', width: '250px', position: 'relative' }}>
                    {resource.image ? (
                      <Image
                        src={resource.image}
                        alt={resource.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        className="bg-light d-flex justify-content-center align-items-center"
                        style={{ height: '100%' }}
                      >
                        <span className="text-muted">{resource.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Resource Content */}
                  <Card.Body className="p-3">
                    {/* Resource Name as heading */}
                    <h5 className="mb-3">{resource.name}</h5>

                    {/* Category and Posted - New format */}
                    <div className="mb-2">
                      <div className="d-flex justify-content-between">
                        <span>{resource.category}</span>
                        <span>Posted On:</span>
                      </div>
                      <div className="text-end">
                        <span>{resource.posted || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Campus and Location */}
                    <div className="d-flex justify-content-between mb-3">
                      <span>{resource.campus}</span>
                      <span>{resource.location}</span>
                    </div>
                  </Card.Body>

                  {/* Return Button - Outside Card.Body for full width */}
                  <button
                    type="button"
                    className="btn btn-danger text-white w-100 py-2 rounded-0 rounded-bottom"
                    style={{ width: '250px' }}
                    onClick={() => {
                      if (confirm(`Are you sure you want to return ${resource.name}?`)) {
                        handleReturnResource(resource.id).then(success => {
                          if (success) {
                            alert(`${resource.name} has been returned successfully`);
                            window.location.reload(); // Reload the page to reflect changes
                          } else {
                            alert('Failed to return the resource. Please try again.');
                          }
                        });
                      }
                    }}
                  >
                    {resource.deadline
                      ? `Return by: ${new Date(resource.deadline).toLocaleString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}`
                      : 'Return Resource'}
                  </button>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default YourResources;
