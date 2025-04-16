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

const AssignLoyaltyPoints = () => {
  return (
    <Card>
      <div style={styles.header}>
        <h3 style={styles.title}>Assign Loyalty Points</h3>
      </div>
      <div style={styles.cardBody}>
=======
const AssignLoyaltyPoints = () => {
  return (
    <Card className="strpied-tabled-with-hover">
      <Card.Header>
        <Card.Title as="h4">Assign Loyalty Points</Card.Title>
        <p className="card-category">Add loyalty points to a customer's account</p>
      </Card.Header>

      <Card.Body className="table-full-width table-responsive px-4">
>>>>>>> Stashed changes
        <Form>
          <Form.Group controlId="formCustomerId">
            <Form.Label>Customer ID</Form.Label>
            <Form.Control type="text" placeholder="Enter customer ID" />
          </Form.Group>

          <Form.Group controlId="formPoints" className="mt-3">
            <Form.Label>Points</Form.Label>
            <Form.Control type="number" placeholder="Enter points to assign" />
          </Form.Group>

<<<<<<< Updated upstream
          <Button style={styles.btnWarning} className="mt-4" disabled>
=======
          <Button
            className="btn-fill mt-4"
            type="submit"
            style={{
              backgroundColor: "#7FAD39",
              borderColor: "#7FAD39",
              color: "white"
            }}
            disabled
          >
>>>>>>> Stashed changes
            Assign Points (non-functional)
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AssignLoyaltyPoints
