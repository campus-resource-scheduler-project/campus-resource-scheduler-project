import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import FilterSidebarEquipment from '@/components/FilterSidebarEquipment';
// import { prisma } from '@/lib/prisma';

const AvailableEquipment = async () => {
  // TODO: Replace with actual Prisma query once db setup is fixed
  /* const equipment = await prisma.stuff.findMany({
    where: { category: 'equipment' },
    orderBy: { name: 'asc' },
  }); */

  const equipment = [
    {
      id: 1,
      name: 'Camera Kit',
      image: '/images/equipment1.jpg',
      campus: 'UH Manoa',
      owner: 'John Doe',
      posted: '1 day ago',
      location: 'POST 309',
      type: 'Electronics',
    },
    {
      id: 2,
      name: 'Graphing Calculator',
      image: '/images/equipment2.jpg',
      campus: 'Leeward CC',
      owner: 'Jane Smith',
      posted: '3 days ago',
      location: 'PHYSCI 201',
      type: 'General',
    },
    // Add more equipment objects as needed
  ];

  return (
    <Container fluid className="py-3">
      <h2 className="mb-4">Available Equipment</h2>
      <Row>
        {/* Left Sidebar */}
        <Col md={3}>
          <FilterSidebarEquipment
            categoryOptions={['General', 'Electronics', 'Books', 'Stationery', 'Equipment']}
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

        {/* Equipment Cards */}
        <Col md={9}>
          <Row className="g-3">
            {equipment.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={6} lg={4} xl={3}>
                <Card className="h-100 border-0">
                  {/* Image */}
                  <div style={{ width: '100%', height: '250px', position: 'relative' }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{
                        objectFit: 'cover',
                        borderTopLeftRadius: '0.375rem',
                        borderTopRightRadius: '0.375rem',
                      }}
                    />
                  </div>

                  {/* Info Section */}
                  <div className="bg-light p-3" style={{ height: '130px' }}>
                    <h5 className="mb-1 fs-6">{item.name}</h5>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                      <div className="d-flex justify-content-between">
                        <span>{item.type}</span>
                        <span>{item.posted}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>{item.campus}</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Borrow / Return Button */}
                  <div className="text-center bg-white py-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-100 rounded-0"
                    >
                      {/* Change this depending on page */}
                      Borrow
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

export default AvailableEquipment;
