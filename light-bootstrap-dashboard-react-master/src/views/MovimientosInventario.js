import React from "react";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";

const styles = {
  header: {
    backgroundColor: "#DFF0D8",
    color: "#333333",
    padding: "1rem",
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
  },
  title: {
    color: "#3C763D",
    marginBottom: "0.2rem",
  },
  category: {
    color: "#666",
    fontSize: "0.9rem",
  },
  cardBody: {
    backgroundColor: "#FFFFFF",
  },
  btnSuccess: {
    backgroundColor: "#3C763D",
    borderColor: "#3C763D",
  },
};

function MovimientosInventario() {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <div style={styles.header}>
              <h4 style={styles.title}>Movimientos de Inventario</h4>
              <p style={styles.category}>Registrar entradas y salidas</p>
            </div>
            <Card.Body style={styles.cardBody}>
              <Form>
                <Row>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Producto</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Tipo de Movimiento</Form.Label>
                      <Form.Control as="select">
                        <option>Entrada</option>
                        <option>Salida</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Cantidad</Form.Label>
                      <Form.Control type="number" />
                    </Form.Group>
                  </Col>
                </Row>
                <Button style={styles.btnSuccess} className="mt-3">
                  Registrar Movimiento
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MovimientosInventario;
