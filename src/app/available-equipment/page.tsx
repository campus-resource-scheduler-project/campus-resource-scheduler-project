'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import FilterSidebarEquipment from '@/components/FilterSidebarEquipment';

type EquipmentItem = {
  id: string;
  name: string;
  type: string;
  category: string;
  campus: string;
  location: string;
  image?: string;
  posted: string;
  owner: string;
};

export default function AvailableEquipmentPage() {
  const { data: session, status } = useSession();
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [filters, setFilters] = useState({ category: '', campus: '' });

  useEffect(() => {
    async function fetchEquipment() {
      const res = await fetch('/api/equipment');
      const data = await res.json();

      const currentUserEmail = session?.user?.email?.toLowerCase() ?? '';
      const ownedResources = data.filter(
        (item: EquipmentItem) => item.owner.toLowerCase() === currentUserEmail,
      );

      setEquipment(ownedResources);
    }

    if (status === 'authenticated') {
      fetchEquipment();
    }
  }, [session, status]);

  const filteredEquipment = equipment.filter((item) => {
    const matchesCategory = filters.category === '' || item.category === filters.category;
    const matchesCampus = filters.campus === '' || item.campus === filters.campus;
    return matchesCategory && matchesCampus;
  });

  return (
    <Container fluid className="py-3">
      <h2 className="mb-4">Available Equipment</h2>
      <Row>
        <Col md={3}>
          <FilterSidebarEquipment
            categoryOptions={[
              'General',
              'Electronics',
              'Books',
              'Stationery',
              'Equipment',
            ]}
            campusOptions={[
              'UH Manoa',
              'UH West Oahu',
              'Honolulu CC',
              'Kapiolani CC',
              'Leeward CC',
              'Windward CC',
            ]}
            selectedCategory={filters.category}
            selectedCampus={filters.campus}
            onFilterChange={setFilters}
          />
        </Col>

        <Col md={9}>
          <Row className="g-3">
            {filteredEquipment.map((item) => (
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
                        <span>{item.category}</span>
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
                    <Button variant="secondary" size="sm" className="w-100 rounded-0">
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
