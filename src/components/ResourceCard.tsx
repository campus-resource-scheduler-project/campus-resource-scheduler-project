'use client';
import { Card } from 'react-bootstrap';
import Image from 'next/image';

const ResourceCard = ({ res }: { res: any }) => (
  <Card className="h-100 shadow-sm border-0">
    <div style={{ height: '160px', position: 'relative' }}>
      <Image
        src={res.imageUrl}
        alt={res.name}
        fill
        style={{ objectFit: 'cover', borderTopLeftRadius: '0.375rem', borderTopRightRadius: '0.375rem' }}
      />
    </div>
    <Card.Body className="bg-white text-dark">
      <Card.Title>{res.name}</Card.Title>
      <Card.Text>
        <small><b>Type:</b> {res.type}</small><br />
        <small><b>Location:</b> {res.location}</small><br />
        <small><b>Campus:</b> {res.campus}</small>
      </Card.Text>
    </Card.Body>
    <Card.Footer className="bg-secondary text-white text-center">
      <small>{res.postedDate}</small>
    </Card.Footer>
  </Card>
);

export default ResourceCard;
