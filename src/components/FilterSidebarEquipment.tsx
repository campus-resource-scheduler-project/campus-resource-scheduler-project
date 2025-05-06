'use client';

import { Button, Accordion, Form } from 'react-bootstrap';

interface FilterSidebarEquipmentProps {
  categoryOptions: string[];
  campusOptions: string[];
  selectedCategory: string;
  selectedCampus: string;
  onFilterChange: (filters: { category: string; campus: string }) => void;
}

export default function FilterSidebarEquipment({
  categoryOptions,
  campusOptions,
  selectedCategory,
  selectedCampus,
  onFilterChange,
}: FilterSidebarEquipmentProps) {
  return (
    <div className="p-3" style={{ backgroundColor: '#ffffff' }}>
      <h5 className="fw-bold mb-3">Filter Equipment</h5>

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
                onChange={() => onFilterChange({ category: option, campus: selectedCampus })}
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
                onChange={() => onFilterChange({ category: selectedCategory, campus: option })}
                name="campus"
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Button
        className="mt-3 w-100"
        variant="danger"
        onClick={() => onFilterChange({ category: '', campus: '' })}
      >
        Clear All Filters
      </Button>
    </div>
  );
}
