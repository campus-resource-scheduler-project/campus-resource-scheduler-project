/* eslint-disable max-len */
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import FilterSidebarRooms from '@/components/FilterSidebarRooms';

export default async function AvailableRoomsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }

  const prisma = new PrismaClient();
  type RoomItem = {
    id: string;
    name: string;
    type: string;
    posted: string;
    campus: string;
    location: string;
    owner: string;
    image?: string;
  };

  let rooms: RoomItem[] = [];

  try {
    const fetchedRooms = await prisma.resource.findMany({
      where: { type: 'room' },
      orderBy: { name: 'asc' },
    });

    rooms = fetchedRooms.map((room) => ({
      ...room,
      id: room.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching room resources:', error);
  } finally {
    await prisma.$disconnect();
  }

  return (
    <Container fluid className="py-3" id="hasBG" style={{ height: '100vh' }}>
      <h2 className="mb-4">Available Rooms</h2>
      <Row>
        {/* Left Sidebar */}
        <Col md={3}>
          <FilterSidebarRooms
            categoryOptions={['Study Room', 'Lab']}
            campusOptions={[
              'UH Manoa',
              'UH West Oahu',
              'Honolulu CC',
              'Kapiolani CC',
              'Leeward CC',
              'Windward CC',
            ]}
          />
        </Col>

        {/* Room Cards */}
        <Col md={9}>
          <Row className="g-3">
            {rooms.map((room) => (
              <Col key={room.id} xs={12} sm={6} md={6} lg={4} xl={3}>
                <Card className="h-100 border-0">
                  <div style={{ width: '100%', height: '250px', position: 'relative' }}>
                    <Image
                      src={room.image || '/images/default-resource.jpg'}
                      alt={room.name}
                      fill
                      style={{
                        objectFit: 'cover',
                        borderTopLeftRadius: '0.375rem',
                        borderTopRightRadius: '0.375rem',
                      }}
                    />
                  </div>

                  <div className="bg-light p-3" style={{ height: '130px' }}>
                    <h5 className="mb-1 fs-6">{room.name}</h5>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                      <div className="d-flex justify-content-between">
                        <span>{room.campus}</span>
                        <span>{room.owner}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>{room.posted}</span>
                        <span>{room.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center bg-white py-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-100 rounded-0"
                    >
                      {room.type}
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
