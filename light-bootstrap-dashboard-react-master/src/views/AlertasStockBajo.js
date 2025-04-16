import React from "react";
import { Card, Container, Row, Col, Table, Button } from "react-bootstrap";

const styles = {
  header: {
    backgroundColor: "#DFF0D8",
    padding: "1rem",
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
  },
  title: {
    color: "Black",
    marginBottom: "0.2rem",
  },
  category: {
    color: "grey",
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
  },
};

function AlertasStockBajo() {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <div style={styles.header}>
              <h4 style={styles.title}>Alertas por Stock Bajo</h4>
              <p style={styles.category}>Productos con niveles críticos</p>
            </div>
            <Card.Body style={styles.cardBody}>
              <div className="mb-3">
                <Button style={styles.button}>Agregar</Button>
              </div>

              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Stock Actual</th>
                    <th>Mínimo Requerido</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Producto A</td>
                    <td>3</td>
                    <td>10</td>
                    <td>
                      <Button style={styles.button}>Modificar</Button>
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

export default AlertasStockBajo;
