import React from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";

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
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Stock Actual</th>
                    <th>Mínimo Requerido</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Producto A</td>
                    <td>3</td>
                    <td>10</td>
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
