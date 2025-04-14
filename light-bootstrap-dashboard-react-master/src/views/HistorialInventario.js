import React from "react";
import { Card, Container, Row, Col, Table, Form } from "react-bootstrap";

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

function HistorialInventario() {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <div style={styles.header}>
              <h4 style={styles.title}>Historial de Inventario</h4>
              <p style={styles.category}>Registro completo de movimientos</p>
            </div>
            <Card.Body style={styles.cardBody}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Buscar producto o fecha..."
                  className="mb-3"
                />
              </Form.Group>
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2025-04-13</td>
                    <td>Producto A</td>
                    <td>Entrada</td>
                    <td>50</td>
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

export default HistorialInventario;
