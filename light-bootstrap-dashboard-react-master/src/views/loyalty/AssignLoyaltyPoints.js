import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

// Estilos personalizados
const styles = {
  header: {
    backgroundColor: "#7FAD39",
    color: "#FFFFFF",
    padding: "1rem",
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
  },
  title: {
    color: "#FFFFFF",
    marginBottom: "0.2rem",
  },
  cardBody: {
    backgroundColor: "#FFFFFF",
    padding: "1.5rem",
  },
  btnPrimary: {
    backgroundColor: "#7FAD39",
    borderColor: "#7FAD39",
    color: "white",
  },
  btnSecondary: {
    backgroundColor: "#8C8D8D",
    borderColor: "#8C8D8D",
    color: "#FFFFFF",
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
        <h3 style={styles.title}>Asignar puntos de lealtad</h3>
      </div>
      <div style={styles.cardBody}>
        <Form>
          <Form.Group controlId="formCustomerId">
            <Form.Label>ID de Cliente</Form.Label>
            <Form.Control type="text" placeholder="Ingresar el ID del Cliente" />
          </Form.Group>

          <Form.Group controlId="formPoints" className="mt-3">
            <Form.Label>Puntos</Form.Label>
            <Form.Control type="number" placeholder="Ingresar los puntos a asignar" />
          </Form.Group>

          <Button style={styles.btnWarning} className="mt-4" disabled>
            Asignar Putnos (non-functional)
          </Button>
        </Form>
      </div>
    </Card>
  )
}

export default AssignLoyaltyPoints
