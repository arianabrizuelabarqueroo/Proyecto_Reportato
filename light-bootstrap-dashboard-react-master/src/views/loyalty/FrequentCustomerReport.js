import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

// Estilos personalizados
const styles = {
  header: {
    backgroundColor: "#373737",
    color: "#FFFFFF",
    padding: "1rem",
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
  },
  title: {
    color: "#F17C1D",
    marginBottom: "0.2rem",
  },
  cardBody: {
    backgroundColor: "#FFFFFF",
    padding: "1.5rem"
  },
  btnPrimary: {
    backgroundColor: "#F17C1D",
    borderColor: "#F17C1D",
    color: "#FFFFFF"
  },
  btnSecondary: {
    backgroundColor: "#8C8D8D",
    borderColor: "#8C8D8D",
    color: "#FFFFFF"
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
        <h3 style={styles.title}>Frequent Customer Report</h3>
      </div>
      <div style={styles.cardBody}>
        <ListGroup>
          <ListGroup.Item><strong>Customer:</strong> Maria Rodriguez</ListGroup.Item>
          <ListGroup.Item><strong>Total Purchases:</strong> $125.00</ListGroup.Item>
          <ListGroup.Item><strong>Purchases This Month:</strong> 5</ListGroup.Item>
          <ListGroup.Item><strong>Loyalty Points:</strong> 60</ListGroup.Item>
        </ListGroup>
      </div>
    </Card>
  )
}

export default FrequentCustomerReport
