import React, { useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'

import RegisterFrequentCustomer from './loyalty/RegisterFrequentCustomer'
import PurchaseHistory from './loyalty/PurchaseHistory'
import FrequentCustomerReport from './loyalty/FrequentCustomerReport'
import AssignLoyaltyPoints from './loyalty/AssignLoyaltyPoints'
import CheckLoyaltyPoints from './loyalty/CheckLoyaltyPoints'
import ApplyDiscount from './loyalty/ApplyDiscount'

const LoyaltyModule = () => {
  const [screen, setScreen] = useState('menu') // 'menu', 'register', etc.

  const renderScreen = () => {
    switch (screen) {
      case 'register':
        return <RegisterFrequentCustomer />
      case 'history':
        return <PurchaseHistory />
      case 'report':
        return <FrequentCustomerReport />
      case 'assign':
        return <AssignLoyaltyPoints />
      case 'check':
        return <CheckLoyaltyPoints />
      case 'discount':
        return <ApplyDiscount />
      default:
        return renderMenu()
    }
  }

  const renderMenu = () => (
    <div className="container mt-4">
      <h2 className="mb-4">Loyalty Program Module</h2>
      <Row>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Register Frequent Customer</Card.Title>
              <Card.Text>Form to register recurring customers for tracking and loyalty benefits.</Card.Text>
              <Button variant="primary" onClick={() => setScreen('register')}>Go to Form</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Purchase History</Card.Title>
              <Card.Text>View detailed purchase records of a customer to personalize offers.</Card.Text>
              <Button variant="primary" onClick={() => setScreen('history')}>View History</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Frequent Customer Report</Card.Title>
              <Card.Text>Generate reports based on loyalty program metrics.</Card.Text>
              <Button variant="primary" onClick={() => setScreen('report')}>Generate Report</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Assign Loyalty Points</Card.Title>
              <Card.Text>Assign points to customers after a successful purchase.</Card.Text>
              <Button variant="primary" onClick={() => setScreen('assign')}>Assign Points</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Check Loyalty Points</Card.Title>
              <Card.Text>Consult current loyalty point balance of a customer.</Card.Text>
              <Button variant="primary" onClick={() => setScreen('check')}>Check Points</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Apply Discount</Card.Title>
              <Card.Text>Apply discount automatically based on available loyalty points.</Card.Text>
              <Button variant="primary" onClick={() => setScreen('discount')}>Apply Discount</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )

  return <>{renderScreen()}</>
}

export default LoyaltyModule
