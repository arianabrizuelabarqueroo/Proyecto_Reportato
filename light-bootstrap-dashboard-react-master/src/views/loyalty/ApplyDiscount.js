import React from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'

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
        <Form>
          <Form.Group controlId="formCustomerEmail">
            <Form.Label>Customer Email</Form.Label>
            <Form.Control type="email" placeholder="Enter customer email" />
          </Form.Group>

          <Button style={styles.btnWarning} className="mt-3" disabled>
            Apply Discount (non-functional)
          </Button>
        </Form>

        <Alert variant="warning" className="mt-4">
          Customer has 60 points. You can apply a $6.00 discount.
        </Alert>
      </div>
    </Card>
  )
}

export default ApplyDiscount
