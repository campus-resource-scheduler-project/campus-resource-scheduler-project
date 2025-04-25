'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditResourceSchema } from '@/lib/validationSchemas';
import { editResource } from '@/lib/dbActions';
import swal from 'sweetalert';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

export default function EditResourceForm({ resource }: { resource: any }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: resource,
    resolver: yupResolver(EditResourceSchema),
  });

  const onSubmit = async (data: any) => {
    await editResource({ ...data, id: resource.id });
    swal('Success', 'Resource updated successfully!', 'success');
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {['name', 'category', 'type', 'location', 'campus', 'posted', 'deadline', 'image'].map((field) => (
                  <Form.Group key={field} className="mb-3">
                    <Form.Label>{field}</Form.Label>
                    <input
                      type="text"
                      {...register(field)}
                      className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{String(errors[field]?.message)}</div>
                  </Form.Group>
                ))}
                <input type="hidden" {...register('owner')} />
                <Button type="submit" className="mt-3">Update</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
