/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */

'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import FilterSidebarRooms from '@/components/FilterSidebarRooms';
import { useSession } from 'next-auth/react';

type RoomItem = {
  id: number;
  name: string;
  type: string;
  category: string;
  campus: string;
  location: string;
  image?: string;
  posted: string;
  owner: string;
};

export default function AvailableRoomsPage() {
  const { data: session } = useSession();
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [filters, setFilters] = useState({ category: '', campus: '' });

  // Fetch available rooms
  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch('/api/rooms');
        const data = await res.json();

        // log raw and filtered data
        console.log('Raw rooms data from API:', data);

        const availableRooms = data.filter(
          (room: RoomItem) => room.owner?.toLowerCase?.() === 'admin@foo.com',
        );

        setRooms(availableRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }

    fetchRooms();
  }, []);

  // Reserve handler
  const handleReserve = async (roomId: number) => {
    const confirmed = confirm('Do you want to reserve this room?');
    if (!confirmed || !session?.user?.email) return;

    console.log('Reserving room as:', session.user.email);

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: roomId, user: session.user.email }),
      });

      const result = await res.json();
      console.log('Reservation result:', result);

      if (res.ok) {
        const updated = await fetch('/api/rooms');
        const data = await updated.json();

        console.log('Updated room list after reservation:', data);

        const available = data.filter(
          (room: RoomItem) => room.owner?.toLowerCase?.() === 'admin@foo.com',
        );
        setRooms(available);
        alert('Room reserved successfully!');
      } else {
        alert('Failed to reserve room.');
      }
    } catch (error) {
      console.error('Error reserving room:', error);
      alert('An error occurred while reserving the room.');
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesCategory = filters.category === '' || room.category.toLowerCase() === filters.category.toLowerCase();
    const matchesCampus = filters.campus === '' || room.campus === filters.campus;
    return matchesCategory && matchesCampus;
  });

  return (
    <Container fluid className="py-3">
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
            {filteredRooms.map((room) => (
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
                        <span>{room.category}</span>
                        <span>{room.posted}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>{room.campus}</span>
                        <span>{room.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center bg-white py-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-100 rounded-0"
                      onClick={() => handleReserve(room.id)}
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
}
