/* eslint-disable max-len */
import { prisma } from '@/lib/prisma';
import StuffItem from '@/components/StuffItem';
import { Container, Row, Col } from 'react-bootstrap';
import FilterSidebarEquipment from '@/components/FilterSidebarEquipment';

const AvailableEquipmentPage = async () => {
  const availableEquipment = await prisma.stuff.findMany({
    where: {
      isAvailable: true,
      category: 'equipment',
    },
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <main className="py-4">
      <Container fluid>
        <Row>
          <Col md={3}>
            <FilterSidebarEquipment
              typeOptions={['Type 1', 'Type 2']}
              campusOptions={['Manoa', 'West Oahu']}
            />
          </Col>

          <Col md={9}>
            <h1 className="mb-4">Available Equipment</h1>
            <div className="d-flex flex-wrap gap-3">
              {availableEquipment.map((item: { id: any; }) => (
                <StuffItem averageRating={0} category="" isAvailable={false} name="" quantity={0} condition="excellent" owner="" key={item.id} {...item} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AvailableEquipmentPage;
