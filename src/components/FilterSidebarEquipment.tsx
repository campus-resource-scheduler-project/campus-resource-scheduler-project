/* eslint-disable react/no-array-index-key */

'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

interface FilterSidebarProps {
  typeOptions: string[];
  campusOptions: string[];
}

export default function FilterSidebar({ typeOptions, campusOptions }: FilterSidebarProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: (val: string[]) => void,
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  return (
    <div className="p-3" style={{ backgroundColor: '#ffffff' }}>
      <h5 className="fw-bold mb-3">Filter Equipment</h5>

      {/* Type */}
      <div className="mb-4">
        <p className="fw-bold">Type</p>
        {typeOptions.map((type) => (
          <Button
            key={type}
            className="me-2 mb-2"
            variant={selectedTypes.includes(type) ? 'dark' : 'secondary'}
            onClick={() => toggleSelection(type, selectedTypes, setSelectedTypes)}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Campus */}
      <div className="mb-4">
        <p className="fw-bold">Campus</p>
        {campusOptions.map((campus) => (
          <Button
            key={campus}
            className="me-2 mb-2"
            variant={selectedCampuses.includes(campus) ? 'dark' : 'secondary'}
            onClick={() => toggleSelection(campus, selectedCampuses, setSelectedCampuses)}
          >
            {campus}
          </Button>
        ))}
      </div>

      {/* Rating */}
      <div className="mb-4">
        <p className="fw-bold">Rating</p>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div
            key={rating}
            className="d-flex align-items-center mb-2"
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedRating(rating)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedRating(rating);
              }
            }}
          >
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={`rating-${rating}-star-${i}`}
                size={20}
                color={i < rating ? 'orange' : 'lightgray'}
              />
            ))}
            {selectedRating === rating && <span className="ms-2">(Selected)</span>}
          </div>
        ))}
      </div>

      {/* Clear Filters */}
      <Button
        variant="danger"
        onClick={() => {
          setSelectedTypes([]);
          setSelectedCampuses([]);
          setSelectedRating(null);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );
}
