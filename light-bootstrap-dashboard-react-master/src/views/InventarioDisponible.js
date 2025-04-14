import React from "react";
import { Card, Table, Container, Row, Col, Form } from "react-bootstrap";

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
};

function InventarioDisponible() {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <div style={styles.header}>
              <h4 style={styles.title}>Inventario Disponible</h4>
              <p style={styles.category}>Stock actualizado por producto</p>
            </div>
            <Card.Body style={styles.cardBody}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Filtrar por producto..."
                  className="mb-3"
                />
              </Form.Group>
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Stock</th>
                    <th>Unidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ejemplo A</td>
                    <td>120</td>
                    <td>Unidades</td>
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

export default InventarioDisponible;
