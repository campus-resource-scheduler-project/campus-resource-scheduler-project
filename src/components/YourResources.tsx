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

  // Resources data matching the Resource model
  const resources = [
    {
      id: 1,
      name: 'Lab Goggles',
      category: 'Lab Equipment',
      type: 'Safety Equipment',
      owner: 'Workplace CC',
      location: 'Science Building Room 101',
      campus: 'Main Campus',
      picture: '/images/lab-goggles.jpg',
      posted: '04/16/25 09:00',
      deadline: '04/30/25 17:00',
    },
    {
      id: 2,
      name: 'Microscope',
      category: 'Lab Equipment',
      type: 'Optical Equipment',
      owner: 'Biology Department',
      location: 'Science Building Room 203',
      campus: 'North Campus',
      picture: '/images/default-resource.jpg',
      posted: '04/15/25 14:30',
      deadline: '04/29/25 12:00',
    },
    {
      id: 3,
      name: 'Textbook - Chemistry 101',
      category: 'Books',
      type: 'Textbook',
      owner: 'Library',
      location: 'Library 2nd Floor',
      campus: 'Main Campus',
      picture: '/images/default-resource.jpg',
      posted: '04/10/25 10:15',
      deadline: '05/10/25 23:59',
    },
    {
      id: 4,
      name: 'Laptop',
      category: 'Electronics',
      type: 'Computer',
      owner: 'IT Department',
      location: 'Tech Center',
      campus: 'South Campus',
      picture: '/images/default-resource.jpg',
      posted: '04/05/25 08:45',
      deadline: '05/05/25 17:00',
    },
    {
      id: 5,
      name: 'Audio Recorder',
      category: 'Electronics',
      type: 'Recording Equipment',
      owner: 'Media Center',
      location: 'Arts Building Room 305',
      campus: 'West Campus',
      picture: '/images/default-resource.jpg',
      posted: '04/12/25 11:20',
      deadline: '04/26/25 16:00',
    },
  ];

  return (
    <Container className="py-3 mb-5">
      <h2 className="mb-4">Your Resources</h2>
      <Row className="g-4">
        {resources.map((resource) => (
          <Col key={resource.id} xs={12} sm={6} lg={4}>
            <Card className="h-100 border-0 shadow-sm bg-white">
              {/* Resource Image */}
              <div style={{ height: '250px', width: '250px', position: 'relative' }}>
                {resource.picture ? (
                  <Image
                    src={resource.picture}
                    alt={resource.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="bg-light d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <span className="text-muted">{resource.name}</span>
                  </div>
                )}
              </div>

              {/* Resource Content */}
              <Card.Body className="p-3">
                {/* Resource Name as heading */}
                <h5 className="mb-3">{resource.name}</h5>

                {/* Category and Posted Date */}
                <div className="d-flex justify-content-between mb-2">
                  <span>{resource.category}</span>
                  <span>
                    Posted:
                    {' '}
                    {resource.posted}
                  </span>
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
                onClick={() => {
                  const handleReturn = () => {
                    const handleConfirmReturn = async () => {
                      // Replace this with a custom modal or confirmation dialog
                      const userConfirmed = await new Promise((resolve) => {
                        const confirmModal = document.createElement('div');
                        confirmModal.innerHTML = `
                          <div class="modal-backdrop">
                            <div class="modal-content">
                              <p>Are you sure you want to return ${resource.name}?</p>
                              <button id="confirm-yes">Yes</button>
                              <button id="confirm-no">No</button>
                            </div>
                          </div>
                        `;
                        document.body.appendChild(confirmModal);

                        confirmModal.querySelector('#confirm-yes')?.addEventListener('click', () => {
                          resolve(true);
                          document.body.removeChild(confirmModal);
                        });

                        confirmModal.querySelector('#confirm-no')?.addEventListener('click', () => {
                          resolve(false);
                          document.body.removeChild(confirmModal);
                        });
                      });

                      if (userConfirmed) {
                        console.log(`${resource.name} has been returned successfully`);
                        // Add API call or notification system here
                      }
                    };

                    handleConfirmReturn();
                  };

                  handleReturn();
                }}
              >
                Return by:
                {' '}
                {resource.deadline}
              </button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default YourResources;
