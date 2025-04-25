'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { AddResourceSchema } from '@/lib/validationSchemas';
import { addResource } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';

const AddResourceForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddResourceSchema),
  });

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'unauthenticated') redirect('/auth/signin');

  const onSubmit = async (data: any) => {
    try {
      await addResource({ ...data, owner: currentUser });
      swal('Success', 'Resource has been added!', 'success', { timer: 2000 });
      reset();
    } catch (error) {
      console.error(error);
      swal('Error', 'Failed to add resource.', 'error');
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add Resource</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <input
                    type="text"
                    {...register('category')}
                    className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.category?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <input
                    type="text"
                    {...register('type')}
                    className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.type?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <input
                    type="text"
                    {...register('location')}
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Campus</Form.Label>
                  <input
                    type="text"
                    {...register('campus')}
                    className={`form-control ${errors.campus ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.campus?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Posted</Form.Label>
                  <input
                    type="text"
                    {...register('posted')}
                    className={`form-control ${errors.posted ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.posted?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Deadline</Form.Label>
                  <input
                    type="text"
                    {...register('deadline')}
                    className={`form-control ${errors.deadline ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.deadline?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <input
                    type="text"
                    {...register('image')}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.image?.message}</div>
                </Form.Group>

                <input type="hidden" {...register('owner')} value={currentUser} />

                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary">Submit</Button>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      variant="warning"
                      onClick={() => reset()}
                      className="float-right"
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddResourceForm;
