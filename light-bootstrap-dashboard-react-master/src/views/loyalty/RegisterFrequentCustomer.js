import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

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

          <Button style={styles.btnPrimary} className="mt-4" disabled>
            Register (non-functional)
          </Button>
        </Form>
      </div>
    </Card>
  )
}

export default RegisterFrequentCustomer
