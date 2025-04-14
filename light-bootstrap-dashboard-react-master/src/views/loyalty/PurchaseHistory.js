import React from 'react'
import { Card, Table } from 'react-bootstrap'

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

const PurchaseHistory = () => {
  return (
    <Card>
      <div style={styles.header}>
        <h3 style={styles.title}>Purchase History</h3>
      </div>
      <div style={styles.cardBody}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-04-01</td>
              <td>Bananas</td>
              <td>$12.00</td>
            </tr>
            <tr>
              <td>2025-04-05</td>
              <td>Apples</td>
              <td>$8.50</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Card>
  )
}

export default PurchaseHistory
