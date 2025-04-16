import React, { useState } from 'react'
import { Card, Row, Col, Button, Container } from 'react-bootstrap'

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
<<<<<<< Updated upstream
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
=======
    <Container fluid className="mt-4">
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Loyalty Program Module</Card.Title>
              <p className="card-category">Select a functionality below to navigate.</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-3">
              <Row>
                <Col md={6} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>Register Frequent Customer</Card.Title>
                      <Card.Text>Register a recurring customer for tracking and loyalty benefits.</Card.Text>
                      <Button
                        className="btn-fill"
                        onClick={() => setScreen('register')}
                        style={{
                          backgroundColor: "#7FAD39",
                          borderColor: "#7FAD39",
                          color: "white"
                        }}
                      >
                        Go to Form
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>Purchase History</Card.Title>
                      <Card.Text>View detailed purchase records of a customer.</Card.Text>
                      <Button
                        className="btn-fill"
                        onClick={() => setScreen('history')}
                        style={{
                          backgroundColor: "#7FAD39",
                          borderColor: "#7FAD39",
                          color: "white"
                        }}
                      >
                        View History
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>Frequent Customer Report</Card.Title>
                      <Card.Text>Generate reports based on loyalty program metrics.</Card.Text>
                      <Button
                        className="btn-fill"
                        onClick={() => setScreen('report')}
                        style={{
                          backgroundColor: "#7FAD39",
                          borderColor: "#7FAD39",
                          color: "white"
                        }}
                      >
                        Generate Report
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>Assign Loyalty Points</Card.Title>
                      <Card.Text>Assign points to customers after a successful purchase.</Card.Text>
                      <Button
                        className="btn-fill"
                        onClick={() => setScreen('assign')}
                        style={{
                          backgroundColor: "#7FAD39",
                          borderColor: "#7FAD39",
                          color: "white"
                        }}
                      >
                        Assign Points
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>Check Loyalty Points</Card.Title>
                      <Card.Text>Consult current loyalty point balance of a customer.</Card.Text>
                      <Button
                        className="btn-fill"
                        onClick={() => setScreen('check')}
                        style={{
                          backgroundColor: "#7FAD39",
                          borderColor: "#7FAD39",
                          color: "white"
                        }}
                      >
                        Check Points
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>Apply Discount</Card.Title>
                      <Card.Text>Apply discount automatically based on available loyalty points.</Card.Text>
                      <Button
                        className="btn-fill"
                        onClick={() => setScreen('discount')}
                        style={{
                          backgroundColor: "#7FAD39",
                          borderColor: "#7FAD39",
                          color: "white"
                        }}
                      >
                        Apply Discount
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
>>>>>>> Stashed changes
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )

  return <>{renderScreen()}</>
}

export default LoyaltyModule
