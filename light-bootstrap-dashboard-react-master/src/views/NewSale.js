import React, { useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Table
} from "react-bootstrap";

function NewSale() {
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState({
    code: "",
    name: "",
    price: "",
    quantity: 1
  });
  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    email: "",
    phone: ""
  });

  const addToCart = () => {
    if (product.code && product.name && product.price) {
      const item = {
        ...product,
        total: parseFloat(product.price) * parseInt(product.quantity)
      };
      setCartItems([...cartItems, item]);
      setProduct({
        code: "",
        name: "",
        price: "",
        quantity: 1
      });
    }
  };

  const removeItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Register New Sale</Card.Title>
                <p className="card-category">Process a new sales transaction</p>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="6">
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">Customer Information</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Form>
                          <Row>
                            <Col md="6">
                              <Form.Group>
                                <Form.Label>Customer ID</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Customer ID"
                                  value={customer.id}
                                  onChange={(e) => setCustomer({...customer, id: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                            <Col md="6">
                              <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Customer name"
                                  value={customer.name}
                                  onChange={(e) => setCustomer({...customer, name: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  placeholder="Email"
                                  value={customer.email}
                                  onChange={(e) => setCustomer({...customer, email: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                            <Col md="6">
                              <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Phone number"
                                  value={customer.phone}
                                  onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Button 
                            variant="info" 
                            className="btn-fill"
                            size="sm"
                          >
                            Search Customer
                          </Button>
                        </Form>
                      </Card.Body>
                    </Card>

                    <Card className="mt-4">
                      <Card.Header>
                        <Card.Title as="h5">Add Product</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Form>
                          <Row>
                            <Col md="6">
                              <Form.Group>
                                <Form.Label>Product Code</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Scan or enter code"
                                  value={product.code}
                                  onChange={(e) => setProduct({...product, code: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                            <Col md="6">
                              <Form.Group>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Product name"
                                  value={product.name}
                                  onChange={(e) => setProduct({...product, name: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="0.00"
                                  value={product.price}
                                  onChange={(e) => setProduct({...product, price: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                            <Col md="6">
                              <Form.Group>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                  type="number"
                                  min="1"
                                  value={product.quantity}
                                  onChange={(e) => setProduct({...product, quantity: e.target.value})}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Button 
                            variant="primary" 
                            className="btn-fill"
                            onClick={addToCart}
                          >
                            Add to Cart
                          </Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md="6">
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">Shopping Cart</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Table className="table-hover">
                          <thead>
                            <tr>
                              <th>Code</th>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Qty</th>
                              <th>Total</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartItems.length === 0 ? (
                              <tr>
                                <td colSpan="6" className="text-center">No items in cart</td>
                              </tr>
                            ) : (
                              cartItems.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.code}</td>
                                  <td>{item.name}</td>
                                  <td>${parseFloat(item.price).toFixed(2)}</td>
                                  <td>{item.quantity}</td>
                                  <td>${item.total.toFixed(2)}</td>
                                  <td>
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={() => removeItem(index)}
                                    >
                                      <i className="nc-icon nc-simple-remove"></i>
                                    </Button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </Table>
                      </Card.Body>
                      <Card.Footer>
                        <Row>
                          <Col md="6">
                            <h5>Total Items: {cartItems.length}</h5>
                          </Col>
                          <Col md="6" className="text-right">
                            <h5>Total: ${calculateTotal()}</h5>
                          </Col>
                        </Row>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <Button variant="danger">
                            Cancel Sale
                          </Button>
                          <Button 
                            variant="success"
                            disabled={cartItems.length === 0}
                          >
                            Proceed to Payment
                          </Button>
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NewSale;