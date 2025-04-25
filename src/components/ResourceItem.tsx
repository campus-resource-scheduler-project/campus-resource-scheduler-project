'use client';

import { Card } from 'react-bootstrap';

interface ResourceItemProps {
  id: number;
  name: string;
  category: string;
  type: string;
  owner: string;
  location: string;
  campus: string;
  posted: string;
  deadline: string;
  image?: string;
}

export default function ResourceItem({
  name,
  type,
  campus,
  owner,
  posted,
}: ResourceItemProps) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
        <Card.Text>
          <strong>Campus:</strong>
          {' '}
          {campus}
          {' '}
          <br />
          <strong>Posted:</strong>
          {' '}
          {posted}
          {' '}
          <br />
          <strong>By:</strong>
          {owner}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
