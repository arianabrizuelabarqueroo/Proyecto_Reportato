import React from "react";
import { Card, Form, Button } from "react-bootstrap";

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

const RegisterFrequentCustomer = () => {
  return (
    <Card>
      <div style={styles.header}>
        <h3 style={styles.title}>Registrar Cliente Frecuente</h3>
      </div>
      <div style={styles.cardBody}>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar el nombre completo del cliente"
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresar el correo electronico del cliente"
            />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mt-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ingresar el número de telefono"
            />
          </Form.Group>

          <Button style={styles.btnPrimary} className="mt-4" disabled>
            Registrar (non-functional)
          </Button>
        </Form>
      </div>
    </Card>
  );
};

export default RegisterFrequentCustomer;
