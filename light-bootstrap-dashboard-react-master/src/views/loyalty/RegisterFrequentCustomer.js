import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

const RegisterFrequentCustomer = () => {
  return (
    <Card className="p-4">
      <h3>Register Frequent Customer</h3>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Enter customer's full name" />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formPhone" className="mt-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="tel" placeholder="Enter phone number" />
        </Form.Group>

        <Button variant="primary" className="mt-4" disabled>Register (non-functional)</Button>
      </Form>
    </Card>
  )
}

export default RegisterFrequentCustomer
