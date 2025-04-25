import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import FilterSidebarRooms from '@/components/FilterSidebarRooms';
// import { prisma } from '@/lib/prisma';

const AvailableRooms = async () => {
  // TODO: Replace with actual Prisma query once db setup is fixed
  /* const rooms = await prisma.stuff.findMany({ where: { category: 'room' } });
    where: { category: 'room' },
    orderBy: { name: 'asc' },
  });
  */
  const rooms = [
    {
      id: 1,
      name: 'Room 101',
      image: '/images/room1.jpg',
      campus: 'UH Manoa',
      owner: 'John Doe',
      posted: '2 days ago',
      location: 'Building A, Floor 1',
      type: 'Study Room',
    },
    {
      id: 2,
      name: 'Room 102',
      image: '/images/room2.jpg',
      campus: 'UH West Oahu',
      owner: 'Jane Smith',
      posted: '5 days ago',
      location: 'Building B, Floor 2',
      type: 'Lab',
    },
    // Add more room objects as needed
  ];
  return (
    <Container fluid className="py-3">
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
                      src={room.image}
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
};

export default AvailableRooms;
