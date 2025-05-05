/* eslint-disable max-len */
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
      <Container fluid className="py-3" id="hasBG" style={{ height: '100%', overflow: 'hidden' }}>
        <h1>Resources</h1>
        <Row style={{ maxWidth: '100%', overflow: 'scroll' }}>
          <Col className="d-flex flex-row align-items-center ms-4">
            {resources.map((res) => (
              <div key={res.id} className="border rounded p-3 mb-3 ms-4" style={{ width: '250px', backgroundColor: 'white' }}>
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
                  <Link href={`/admin/resources/edit/${res.id}`} className="btn btn-primary">Edit</Link>
                  <Link href={`/admin/resources/delete/${res.id}`} className="btn btn-danger ms-auto">Delete</Link>
                </div>
              </div>
            ))}
          </Col>
        </Row>
        <Row className="text-center mt-4 pb-3">
          <Link href="/admin/resources/new">
            <Button variant="success">Add New Resource</Button>
          </Link>
        </Row>
      </Container>

    </main>
  );
};

export default AdminPage;
