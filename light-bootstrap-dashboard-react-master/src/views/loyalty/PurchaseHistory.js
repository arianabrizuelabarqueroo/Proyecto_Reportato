import React from 'react'
import { Card, Table } from 'react-bootstrap'

const PurchaseHistory = () => {
  return (
    <Card className="p-4">
      <h3>Purchase History</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-04-01</td>
            <td>Bananas</td>
            <td>$12.00</td>
          </tr>
          <tr>
            <td>2025-04-05</td>
            <td>Apples</td>
            <td>$8.50</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}

export default PurchaseHistory
