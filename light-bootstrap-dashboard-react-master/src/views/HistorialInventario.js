import React from "react";
import { Card, Container, Row, Col, Table, Form, Button } from "react-bootstrap";

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
  button: {
    backgroundColor: "#7FAD39",
    borderColor: "#7FAD39",
    color: "white",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
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
              <p style={styles.category}>Registro completo de movimientos de entrada y salida de productos</p>
            </div>
            <Card.Body style={styles.cardBody}>
              <div className="mb-3 d-flex flex-wrap align-items-center justify-content-between">
                <Form.Control
                  type="text"
                  placeholder="Buscar producto o fecha..."
                  className="mb-2"
                  style={{ maxWidth: "300px" }}
                />
              </div>

              {/* Tabla */}
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2025-04-13</td>
                    <td>Producto A</td>
                    <td>Entrada</td>
                    <td>50</td>
                    <td>
                      <Button style={styles.button} size="sm">Modificar</Button>
                      <Button style={styles.button} size="sm">Eliminar</Button>
                    </td>
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
