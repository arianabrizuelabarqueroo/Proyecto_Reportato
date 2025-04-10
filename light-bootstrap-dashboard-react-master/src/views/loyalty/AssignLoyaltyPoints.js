import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

const AssignLoyaltyPoints = () => {
  return (
    <Card className="p-4">
      <h3>Assign Loyalty Points</h3>
      <Form>
        <Form.Group controlId="formCustomerId">
          <Form.Label>Customer ID</Form.Label>
          <Form.Control type="text" placeholder="Enter customer ID" />
        </Form.Group>

        <Form.Group controlId="formPoints" className="mt-3">
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" placeholder="Enter points to assign" />
        </Form.Group>

        <Button variant="success" className="mt-4" disabled>Assign Points (non-functional)</Button>
      </Form>
    </Card>
  )
}

export default AssignLoyaltyPoints
