import React from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'

// Estilos personalizadoss
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

const ApplyDiscount = () => {
  return (
    <Card>
      <div style={styles.header}>
        <h3 style={styles.title}>Aplicar descuento</h3>
      </div>
      <div style={styles.cardBody}>
        <Form>
          <Form.Group controlId="formCustomerEmail">
            <Form.Label>Correo electronico del Cliente</Form.Label>
            <Form.Control type="email" placeholder="Ingresar correo electronico del cliente" />
          </Form.Group>

          <Button style={styles.btnWarning} className="mt-3" disabled>
            Aplicar Descuento (non-functional)
          </Button>
        </Form>

        <Alert variant="warning" className="mt-4">
          El cliente tiene 60 puntos. Puedes aplicarle un descuento de $6.00 en la siguiente compra.
        </Alert>
      </div>
    </Card>
  )
}

export default ApplyDiscount
