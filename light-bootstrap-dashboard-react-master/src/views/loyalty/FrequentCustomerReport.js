import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const FrequentCustomerReport = () => {
  return (
    <Card className="p-4">
      <h3>Frequent Customer Report</h3>
      <ListGroup>
        <ListGroup.Item><strong>Customer:</strong> Maria Rodriguez</ListGroup.Item>
        <ListGroup.Item><strong>Total Purchases:</strong> $125.00</ListGroup.Item>
        <ListGroup.Item><strong>Purchases This Month:</strong> 5</ListGroup.Item>
        <ListGroup.Item><strong>Loyalty Points:</strong> 60</ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default FrequentCustomerReport
