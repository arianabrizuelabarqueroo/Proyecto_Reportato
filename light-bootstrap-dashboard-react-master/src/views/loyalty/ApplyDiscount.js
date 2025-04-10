import React from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'

const ApplyDiscount = () => {
  return (
    <Card className="p-4">
      <h3>Apply Discount</h3>
      <Form>
        <Form.Group controlId="formCustomerEmail">
          <Form.Label>Customer Email</Form.Label>
          <Form.Control type="email" placeholder="Enter customer email" />
        </Form.Group>

        <Button variant="warning" className="mt-3" disabled>Apply Discount (non-functional)</Button>
      </Form>

      <Alert variant="warning" className="mt-4">
        Customer has 60 points. You can apply a $6.00 discount.
      </Alert>
    </Card>
  )
}

export default ApplyDiscount
