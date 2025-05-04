import { getServerSession } from 'next-auth';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';
import Image from 'next/image';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const resources = await prisma.resource.findMany({});

  return (
    <main>

      <div className="text-center mt-4">
        <Link href="/admin/resources/new">
          <Button variant="success">Add New Resource</Button>
        </Link>
      </div>

      <Container fluid className="py-3">
        <Row>
          <Col className="d-flex flex-row align-items-center">
            <h1>Resources</h1>
            {resources.map((res) => (
              <div key={res.id} className="border rounded p-3 mb-3" style={{ width: '250px' }}>
                <h4>{res.name}</h4>
                <p>
                  <strong>Owner:</strong>
                  {' '}
                  {res.owner || 'None'}
                </p>
                <p>
                  <strong>Type:</strong>
                  {' '}
                  {res.type}
                </p>
                <p>
                  <strong>Category:</strong>
                  {' '}
                  {res.category}
                </p>
                <p>
                  <strong>Campus:</strong>
                  {' '}
                  {res.campus}
                </p>
                <p>
                  <strong>Location:</strong>
                  {' '}
                  {res.location}
                </p>
                <p>
                  <strong>Posted:</strong>
                  {' '}
                  {res.posted}
                </p>
                <p>
                  <strong>Deadline:</strong>
                  {' '}
                  {res.deadline}
                </p>
                {res.image && (
                <Image
                  src={res.image}
                  alt={res.name}
                  width={200}
                  height={150} // adjust this based on your image aspect ratio
                  style={{ objectFit: 'cover' }}
                />
                )}
                <div className="mt-2">
                  <Link href={`/admin/resources/edit/${res.id}`} className="btn btn-primary me-2">Edit</Link>
                  <Link href={`/admin/resources/delete/${res.id}`} className="btn btn-danger">Delete</Link>
                </div>
              </div>
            ))}

          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
