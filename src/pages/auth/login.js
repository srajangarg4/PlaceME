import React from 'react';
import { Card, Col, Container, Row, Label } from 'reactstrap';
import { useFormReducer } from '../../hooks';
import { Input } from '../../components';
import { required, validateEmail, validatePassword } from '../../utils';

const validators = {
  email: [required('Email is required'), validateEmail],
  password: [required('Password is required'), validatePassword],
};

const Login = () => {
  const { connectField, handleSubmit } = useFormReducer(validators);
  return (
    <Container>
      <Card>
        <Row>
          <Col>
            <Label>Username</Label>
          </Col>
          <Col>
            {connectField('email', {
              placeholder: 'email',
            })(Input)}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Login;
