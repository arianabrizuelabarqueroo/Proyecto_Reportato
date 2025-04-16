import React from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'

<<<<<<< Updated upstream
// Estilos personalizadoss
const styles = {
  header: {
    backgroundColor: "#373737",
    color: "#FFFFFF",
    padding: "1rem",
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
  },
  title: {
    color: "#F17C1D",
    marginBottom: "0.2rem",
  },
  cardBody: {
    backgroundColor: "#FFFFFF",
    padding: "1.5rem"
  },
  btnPrimary: {
    backgroundColor: "#F17C1D",
    borderColor: "#F17C1D",
    color: "#FFFFFF"
  },
  btnSecondary: {
    backgroundColor: "#8C8D8D",
    borderColor: "#8C8D8D",
    color: "#FFFFFF"
  },
  btnWarning: {
    backgroundColor: "#7FAD39",
    borderColor: "#7FAD39",
    color: "#FFFFFF",
  },
};

const ApplyDiscount = () => {
  return (
    <Card>
      <div style={styles.header}>
        <h3 style={styles.title}>Apply Discount</h3>
      </div>
      <div style={styles.cardBody}>
=======
const ApplyDiscount = () => {
  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header>
        <Card.Title as="h4">Apply Discount</Card.Title>
        <p className="card-category">Apply a loyalty discount to a registered customer</p>
      </Card.Header>

      <Card.Body className="table-full-width table-responsive px-4">
>>>>>>> Stashed changes
        <Form>
          <Form.Group controlId="formCustomerEmail">
            <Form.Label>Customer Email</Form.Label>
            <Form.Control type="email" placeholder="Enter customer email" />
          </Form.Group>

<<<<<<< Updated upstream
          <Button style={styles.btnWarning} className="mt-3" disabled>
=======
          <Button
            className="btn-fill mt-3"
            type="submit"
            style={{
              backgroundColor: "#7FAD39",
              borderColor: "#7FAD39",
              color: "white"
            }}
            disabled
          >
>>>>>>> Stashed changes
            Apply Discount (non-functional)
          </Button>
        </Form>

        <Alert variant="warning" className="mt-4">
<<<<<<< Updated upstream
          Customer has 60 points. You can apply a $6.00 discount.
=======
          Customer has <strong>60 points</strong>. You can apply a <strong>$6.00 discount</strong>.
>>>>>>> Stashed changes
        </Alert>
      </Card.Body>
    </Card>
  )
}

export default ApplyDiscount
