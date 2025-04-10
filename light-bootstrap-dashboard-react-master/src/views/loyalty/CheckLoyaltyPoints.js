import React from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'

const CheckLoyaltyPoints = () => {
  return (
    <Card className="p-4">
      <h3>Check Loyalty Points</h3>
      <Form>
        <Form.Group controlId="formCustomerEmail">
          <Form.Label>Customer Email</Form.Label>
          <Form.Control type="email" placeholder="Enter customer email" />
        </Form.Group>

        <Button variant="info" className="mt-3" disabled>Check (non-functional)</Button>
      </Form>

      <Alert variant="info" className="mt-4">
        This customer has <strong>45 points</strong>.
      </Alert>
    </Card>
  )
}

export default CheckLoyaltyPoints
