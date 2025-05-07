/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */

'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import FilterSidebarRooms from '@/components/FilterSidebarRooms';

interface Resource {
  id: number;
  name: string;
  category: string;
  type: string;
  owner: string;
  location: string;
  campus: string;
  image: string;
  posted?: Date;
  deadline?: Date | null;
}

interface AvailableRoomsProps {
  initialResources: Resource[];
}

const AvailableRooms: React.FC<AvailableRoomsProps> = ({ initialResources = [] }) => {
  const { status, data: session } = useSession();
  const [rooms, setRooms] = useState<Resource[]>(initialResources);
  const [filters, setFilters] = useState({ category: '', campus: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReserve = async (resourceId: number) => {
    if (!session?.user?.email) return;

    const confirmed = confirm('Do you want to reserve this room?');
    if (!confirmed) return;

    try {
      setLoading(true);
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: resourceId, user: session.user.email }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setRooms(rooms.filter(item => item.id !== resourceId));
      } else {
        alert(result.error || 'Failed to reserve room');
      }
      setLoading(false);
    } catch (err) {
      console.error('Reserve error:', err);
      setError('An error occurred while reserving.');
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter(item => {
    const matchesCategory = filters.category === '' || item.category.toLowerCase() === filters.category.toLowerCase();
    const matchesCampus = filters.campus === '' || item.campus === filters.campus;
    return matchesCategory && matchesCampus;
  });

  if (status === 'loading' || loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <Container className="py-3">
      <h2 className="mb-4">Available Rooms</h2>
      <Row>
        <Col md={3}>
          <FilterSidebarRooms
            categoryOptions={['Study', 'Lab', 'Meeting']}
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
            {filteredRooms.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={6} lg={4} xl={3}>
                <Card className="h-100 border-0">
                  <div style={{ width: '100%', height: '250px', position: 'relative' }}>
                    <Image
                      src={item.image || '/images/default-resource.jpg'}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="bg-light p-3" style={{ height: '130px' }}>
                    <h5 className="mb-1 fs-6">{item.name}</h5>
                    <div className="text-muted small">
                      <div className="d-flex justify-content-between">
                        <span>{item.category}</span>
                        <span>{item.posted ? item.posted.toLocaleDateString() : 'N/A'}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>{item.campus}</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center bg-white py-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-100 rounded-0"
                      onClick={() => handleReserve(item.id)}
                    >
                      Reserve
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
