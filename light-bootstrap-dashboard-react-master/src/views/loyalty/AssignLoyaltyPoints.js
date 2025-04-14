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

const AssignLoyaltyPoints = () => {
  return (
    <Card>
      <div style={styles.header}>
        <h3 style={styles.title}>Assign Loyalty Points</h3>
      </div>
      <div style={styles.cardBody}>
        <Form>
          <Form.Group controlId="formCustomerId">
            <Form.Label>Customer ID</Form.Label>
            <Form.Control type="text" placeholder="Enter customer ID" />
          </Form.Group>

          <Form.Group controlId="formPoints" className="mt-3">
            <Form.Label>Points</Form.Label>
            <Form.Control type="number" placeholder="Enter points to assign" />
          </Form.Group>

          <Button style={styles.btnWarning} className="mt-4" disabled>
            Assign Points (non-functional)
          </Button>
        </Form>
      </div>
    </Card>
  )
}

export default AssignLoyaltyPoints
