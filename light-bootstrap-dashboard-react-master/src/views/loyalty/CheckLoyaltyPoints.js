import React from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'

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

const CheckLoyaltyPoints = () => {
  return (
    <Card>
      <div style={styles.header}>
        <h3 style={styles.title}>Verificar los puntos de lealtad</h3>
      </div>
      <div style={styles.cardBody}>
        <Form>
          <Form.Group controlId="formCustomerEmail">
            <Form.Label>Correo electronico del Cliente</Form.Label>
            <Form.Control type="email" placeholder="Ingresar correo electronico del cliente" />
          </Form.Group>

          <Button style={styles.btnSecondary} className="mt-3" disabled>
            Verificar (non-functional)
          </Button>
        </Form>

        <Alert variant="info" className="mt-4">
          Este cliente tiene <strong>45 points</strong>.
        </Alert>
      </div>
    </Card>
  )
}

export default CheckLoyaltyPoints
