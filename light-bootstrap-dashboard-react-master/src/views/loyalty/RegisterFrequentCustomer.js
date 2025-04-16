import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
<<<<<<< Updated upstream

// Estilos personalizados
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

const RegisterFrequentCustomer = () => {
  return (
    <Card>
      <div style={styles.header}>
        <h3 style={styles.title}>Register Frequent Customer</h3>
      </div>
      <div style={styles.cardBody}>
=======

const RegisterFrequentCustomer = () => {
  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header>
        <Card.Title as="h4">Register Frequent Customer</Card.Title>
        <p className="card-category">Add a recurring customer to the loyalty program</p>
      </Card.Header>

      <Card.Body className="table-full-width table-responsive px-4">
>>>>>>> Stashed changes
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter customer's full name" />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mt-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" />
          </Form.Group>

<<<<<<< Updated upstream
          <Button style={styles.btnPrimary} className="mt-4" disabled>
=======
          <Button
            className="btn-fill mt-4"
            type="submit"
            style={{
              backgroundColor: "#F17C1D",
              borderColor: "#F17C1D",
              color: "white"
            }}
            disabled
          >
>>>>>>> Stashed changes
            Register (non-functional)
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default RegisterFrequentCustomer
