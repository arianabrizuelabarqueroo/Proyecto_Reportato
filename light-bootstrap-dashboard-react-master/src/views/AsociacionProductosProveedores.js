import React from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";

const styles = {
  header: {
    backgroundColor: "#DFF0D8",
    color: "#333333",
    padding: "1rem",
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
  },
  title: {
    color: "black",
    marginBottom: "0.2rem",
  },
  category: {
    color: "gray",
    fontSize: "0.9rem",
  },
  cardBody: {
    backgroundColor: "#FFFFFF",
  },
  btnSuccess: {
    backgroundColor: "#7FAD39",
    borderColor: "white",
    color: "white",
  },
};

function AsociacionProductosProveedores() {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <div style={styles.header}>
              <h4 style={styles.title}>Asociar Productos y Proveedores</h4>
              <p style={styles.category}>Configurar relaciones de suministro</p>
            </div>
            <Card.Body style={styles.cardBody}>
              <Form>
                <Row>
                  <Col md="6">
                    <Form.Group>
                      <Form.Label>Producto</Form.Label>
                      <Form.Control as="select">
                        <option>Producto A</option>
                        <option>Producto B</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <Form.Label>Proveedor</Form.Label>
                      <Form.Control as="select">
                        <option>Proveedor X</option>
                        <option>Proveedor Y</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Button style={styles.btnSuccess} className="mt-4">
                  Asociar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AsociacionProductosProveedores;
