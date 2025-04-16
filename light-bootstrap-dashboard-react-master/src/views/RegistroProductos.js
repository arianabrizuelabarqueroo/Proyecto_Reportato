import React from "react";
import { Card, Table, Container, Row, Col, Button, Form } from "react-bootstrap";

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
    color: "grey",
    fontSize: "0.9rem",
  },
  cardBody: {
    backgroundColor: "#FFFFFF",
  },
  btnPrimary: {
    backgroundColor: "#7FAD39",
    borderColor: "#7FAD39",
    color: "white",
  },
};

function RegistroProductos() {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <div style={styles.header}>
              <h4 style={styles.title}>Registro de Productos Recibidos</h4>
              <p style={styles.category}>
                Control del inventario y disponibilidad
              </p>
            </div>
            <Card.Body style={styles.cardBody}>
              <Form>
                <Row>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Nombre del Producto</Form.Label>
                      <Form.Control type="text" placeholder="Ingrese nombre" />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Cantidad</Form.Label>
                      <Form.Control type="number" placeholder="Ingrese cantidad" />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Proveedor</Form.Label>
                      <Form.Control type="text" placeholder="Nombre del proveedor" />
                    </Form.Group>
                  </Col>
                </Row>
                <Button style={styles.btnPrimary} className="mt-3">
                  Registrar Producto
                </Button>
              </Form>
              <br></br>
              <hr />
              <br></br>
              <h5>Historial de Productos Recibidos</h5>
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Proveedor</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ejemplo A</td>
                    <td>100</td>
                    <td>Proveedor X</td>
                    <td>2025-04-09</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistroProductos;
