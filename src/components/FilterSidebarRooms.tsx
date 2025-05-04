'use client';

import { useState } from 'react';
import { Button, Accordion, Form } from 'react-bootstrap';

interface FilterSidebarRoomsProps {
  categoryOptions: string[];
  campusOptions: string[];
}

export default function FilterSidebarRooms({ categoryOptions, campusOptions }: FilterSidebarRoomsProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('');

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedCampus('');
  };

  return (
    <div className="p-3" style={{ backgroundColor: '#ffffff' }}>
      <h5 className="fw-bold mb-3">Filter Rooms</h5>

      <Accordion defaultActiveKey="0" alwaysOpen>
        {/* Category Dropdown */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Category</Accordion.Header>
          <Accordion.Body>
            {categoryOptions.map((option) => (
              <Form.Check
                key={option}
                type="radio"
                id={`category-${option}`}
                label={option}
                checked={selectedCategory === option}
                onChange={() => setSelectedCategory(option)}
                name="category"
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>

        {/* Campus Dropdown */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Campus</Accordion.Header>
          <Accordion.Body>
            {campusOptions.map((option) => (
              <Form.Check
                key={option}
                type="radio"
                id={`campus-${option}`}
                label={option}
                checked={selectedCampus === option}
                onChange={() => setSelectedCampus(option)}
                name="campus"
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Button className="mt-3 w-100" variant="danger" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );
}
