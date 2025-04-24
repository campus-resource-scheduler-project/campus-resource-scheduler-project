// File: /src/app/admin/page.tsx

import { getServerSession } from 'next-auth';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

const AdminHomePage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Dummy data as placeholder
  const resources = [
    {
      id: '1',
      name: 'MacBook Charger',
      category: 'Electronics',
      type: 'Charger',
      owner: 'Hamilton Library',
      location: 'Front Desk',
      campus: 'UH Mānoa',
      picture: '/images/default-resource.jpg',
      posted: '2025-04-01',
      deadline: '2025-04-30',
    },
    {
      id: '2',
      name: 'Projector Screen',
      category: 'Classroom Equipment',
      type: 'Screen',
      owner: 'Library',
      location: 'Room 204',
      campus: 'UH Mānoa',
      picture: '/images/default-resource.jpg',
      posted: '2025-04-10',
      deadline: '2025-05-10',
    },
  ];

  return (
    <main>
      <Container className="py-4">
        <h1 className="text-center mb-4">Admin Resource List</h1>
        <Row className="g-4">
          {resources.map((item) => (
            <Col key={item.id} md={6} lg={4}>
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={item.picture || '/images/default-resource.jpg'}
                  alt={item.name}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title className="mb-2">{item.name}</Card.Title>
                  <Card.Text className="mb-1">
                    <strong>Owner:</strong> {item.owner}
                  </Card.Text>
                  <Card.Text className="mb-1">
                    <strong>Type:</strong> {item.type}<br />
                    <strong>Category:</strong> {item.category}
                  </Card.Text>
                  <Card.Text className="mb-1">
                    <strong>Location:</strong> {item.location}<br />
                    <strong>Campus:</strong> {item.campus}
                  </Card.Text>
                  <Card.Text className="mb-1">
                    <strong>Posted:</strong> {item.posted}<br />
                    <strong>Deadline:</strong> {item.deadline}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default AdminHomePage;
