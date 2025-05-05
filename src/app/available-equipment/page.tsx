import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import FilterSidebarEquipment from '@/components/FilterSidebarEquipment';
import authOptions from '@/lib/authOptions';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';

export default async function AvailableEquipmentPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }

  const prisma = new PrismaClient();
  type EquipmentItem = {
    id: string;
    name: string;
    type: string;
    posted: string;
    campus: string;
    location: string;
    image?: string;
  };

  let equipment: EquipmentItem[] = [];

  try {
    const fetchedEquipment = await prisma.resource.findMany({
      where: { type: 'physical' },
      orderBy: { name: 'asc' },
    });

    equipment = fetchedEquipment.map((item) => ({
      ...item,
      id: item.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching equipment resources:', error);
  } finally {
    await prisma.$disconnect();
  }

  return (
    <Container fluid className="py-3" id="hasBG" style={{ height: '100vh' }}>
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
                      src={item.image || '/images/default-resource.jpg'}
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

                  {/* Borrow Button */}
                  <div className="text-center bg-white py-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-100 rounded-0"
                    >
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
}
