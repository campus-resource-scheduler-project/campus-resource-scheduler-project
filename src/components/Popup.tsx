/* eslint-disable max-len */

'use client';

/* eslint-disable import/extensions */

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditUserSchema } from '@/lib/validationSchemas';
import { editUser } from '@/lib/dbActions';

const onSubmit = async (data: { id:number; bio: string; major:string; campus:string; standing:string; phone:string; personal:string }) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editUser(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

const EditUserForm = ({ user }: { user:{ id:number; bio: string; major:string; campus:string; standing:string; phone:string; personal:string } }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm< { id:number; bio: string; major:string; campus:string; standing:string; phone:string; personal:string } >({
    resolver: yupResolver(EditUserSchema),
  });
  // console.log(stuff);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Edit Bio</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={user.id} />
                <Form.Group>
                  <Form.Label>Bio</Form.Label>
                  <input
                    type="text"
                    {...register('bio')}
                    defaultValue={user.bio}
                    required
                    className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.bio?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Major</Form.Label>
                  <input
                    type="text"
                    {...register('major')}
                    defaultValue={user.major}
                    required
                    className={`form-control ${errors.major ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.major?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Standing</Form.Label>
                  <input
                    type="text"
                    {...register('standing')}
                    defaultValue={user.standing}
                    required
                    className={`form-control ${errors.standing ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.standing?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Campus</Form.Label>
                  <input
                    type="text"
                    {...register('campus')}
                    defaultValue={user.campus}
                    required
                    className={`form-control ${errors.campus ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.campus?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <input
                    type="text"
                    {...register('phone')}
                    defaultValue={user.phone}
                    required
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.phone?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Personal Email</Form.Label>
                  <input
                    type="email"
                    {...register('personal')}
                    defaultValue={user.personal}
                    required
                    className={`form-control ${errors.personal ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.personal?.message}</div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserForm;
