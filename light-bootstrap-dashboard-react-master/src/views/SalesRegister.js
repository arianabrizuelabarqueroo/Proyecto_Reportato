import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form
} from "react-bootstrap";

function SalesRegister() {
  return (
    <>
      <Container fluid>
        <Row className="mb-4">
          <Col lg="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Sales Management System</Card.Title>
                <p className="card-category">
                  Complete sales transactions and manage customer information
                </p>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="3">
                    <Card className="text-center p-3">
                      <div className="mb-3 text-primary">
                        <i className="nc-icon nc-cart-simple" style={{ fontSize: '3rem' }}></i>
                      </div>
                      <h5>Register Sale</h5>
                      <p className="small">Record daily transactions</p>
                      <Button variant="primary" block>
                        New Sale
                      </Button>
                    </Card>
                  </Col>
                  <Col md="3">
                    <Card className="text-center p-3">
                      <div className="mb-3 text-info">
                        <i className="nc-icon nc-credit-card" style={{ fontSize: '3rem' }}></i>
                      </div>
                      <h5>Payment Methods</h5>
                      <p className="small">Complete transactions</p>
                      <Button variant="info" block>
                        Process Payment
                      </Button>
                    </Card>
                  </Col>
                  <Col md="3">
                    <Card className="text-center p-3">
                      <div className="mb-3 text-success">
                        <i className="nc-icon nc-single-02" style={{ fontSize: '3rem' }}></i>
                      </div>
                      <h5>Customer Registry</h5>
                      <p className="small">Manage recurring customers</p>
                      <Button variant="success" block>
                        Customer Portal
                      </Button>
                    </Card>
                  </Col>
                  <Col md="3">
                    <Card className="text-center p-3">
                      <div className="mb-3 text-warning">
                        <i className="nc-icon nc-paper-2" style={{ fontSize: '3rem' }}></i>
                      </div>
                      <h5>Invoice Generator</h5>
                      <p className="small">Create customer receipts</p>
                      <Button variant="warning" block>
                        Generate Invoice
                      </Button>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="8">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Sales History</Card.Title>
                <p className="card-category">
                  Review and analyze commercial performance
                </p>
                <Form.Group className="mt-3">
                  <div className="input-group">
                    <Form.Control
                      placeholder="Search transactions..."
                      aria-label="Search"
                    />
                    <div className="input-group-append">
                      <Button variant="outline-primary">Search</Button>
                    </div>
                  </div>
                </Form.Group>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Date</th>
                      <th className="border-0">Customer</th>
                      <th className="border-0">Amount</th>
                      <th className="border-0">Payment Method</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>S-001</td>
                      <td>04/09/2025</td>
                      <td>Dakota Rice</td>
                      <td>$136.75</td>
                      <td>Credit Card</td>
                      <td><Badge variant="success">Completed</Badge></td>
                      <td>
                        <Button variant="link" size="sm">
                          <i className="nc-icon nc-zoom-split"></i>
                        </Button>
                        <Button variant="link" size="sm">
                          <i className="nc-icon nc-paper"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>S-002</td>
                      <td>04/09/2025</td>
                      <td>Minerva Hooper</td>
                      <td>$321.89</td>
                      <td>Cash</td>
                      <td><Badge variant="success">Completed</Badge></td>
                      <td>
                        <Button variant="link" size="sm">
                          <i className="nc-icon nc-zoom-split"></i>
                        </Button>
                        <Button variant="link" size="sm">
                          <i className="nc-icon nc-paper"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>S-003</td>
                      <td>04/08/2025</td>
                      <td>Sage Rodriguez</td>
                      <td>$56.42</td>
                      <td>Debit Card</td>
                      <td><Badge variant="success">Completed</Badge></td>
                      <td>
                        <Button variant="link" size="sm">
                          <i className="nc-icon nc-zoom-split"></i>
                        </Button>
                        <Button variant="link" size="sm">
                          <i className="nc-icon nc-paper"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>S-004</td>
                      <td>04/08/2025</td>
                      <td>Philip Chaney</td>
                      <td>$98.35</td>
                      <td>Mobile Payment</td>
                      <td><Badge variant="warning">Pending</Badge></td>
                      <td>
                        <Button variant="link" size="sm">
                          <i className="nc-icon nc-zoom-split"></i>
                        </Button>
                        <Button variant="link" size="sm">
                          <i className="nc-icon nc-paper"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>S-005</td>
                      <td>04/07/2025</td>
                      <td>Doris Greene</td>
                      <td>$63.54</td>
                      <td>Credit Card</td>
                      <td><Badge variant="success">Completed</Badge></td>
                      <td>
                        <Button variant="link" size="sm">
                          <i className="nc-icon nc-zoom-split"></i>
                        </Button>
                        <Button variant="link" size="sm">
                          <i className="nc-icon nc-paper"></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-center">
                  <Button variant="outline-primary" size="sm" className="mr-2">
                    Previous
                  </Button>
                  <Button variant="outline-primary" size="sm">
                    Next
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Register Close</Card.Title>
                <p className="card-category">Daily cash reconciliation</p>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" defaultValue="2025-04-09" />
                  </Form.Group>
                  
                  <Form.Group>
                    <Form.Label>Cash in Register</Form.Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <Form.Control type="number" placeholder="0.00" />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Expected Amount</Form.Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <Form.Control type="number" placeholder="0.00" readOnly defaultValue="675.95" />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Difference</Form.Label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <Form.Control type="number" placeholder="0.00" readOnly />
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Add any relevant notes about today's register close..." />
                  </Form.Group>

                  <Button variant="danger" block>
                    Close Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            
            <Card className="mt-4">
              <Card.Header>
                <Card.Title as="h4">Daily Summary</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs="6">
                    <div className="text-center">
                      <h6>Total Sales</h6>
                      <h3>$675.95</h3>
                    </div>
                  </Col>
                  <Col xs="6">
                    <div className="text-center">
                      <h6>Transactions</h6>
                      <h3>15</h3>
                    </div>
                  </Col>
                </Row>
                <hr />
                <h6>Payment Methods</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Cash</span>
                  <span>$321.89</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Credit Card</span>
                  <span>$200.29</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Debit Card</span>
                  <span>$56.42</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Mobile Payment</span>
                  <span>$97.35</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SalesRegister;