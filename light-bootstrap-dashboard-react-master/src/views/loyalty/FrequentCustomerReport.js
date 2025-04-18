import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

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

const FrequentCustomerReport = () => {
  return (
    <Card>
      <div style={styles.header}>
        <h3 style={styles.title}>Reporte de Cliente Frecuente</h3>
      </div>
      <div style={styles.cardBody}>
        <ListGroup>
          <ListGroup.Item><strong>Cliente:</strong> Maria Rodriguez</ListGroup.Item>
          <ListGroup.Item><strong>Total de Compras:</strong> $125.00</ListGroup.Item>
          <ListGroup.Item><strong>Compras de este mes:</strong> 5</ListGroup.Item>
          <ListGroup.Item><strong>Puntos de Lealtad:</strong> 60</ListGroup.Item>
        </ListGroup>
      </div>
    </Card>
  )
}

export default FrequentCustomerReport
