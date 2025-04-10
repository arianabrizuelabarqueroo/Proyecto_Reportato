import React from "react";
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";

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
  category: {
    color: "#8C8D8D",
    fontSize: "0.9rem",
  },
  cardBody: {
    backgroundColor: "#FFFFFF",
  },
  btnPrimary: {
    backgroundColor: "#F17C1D",
    borderColor: "#F17C1D",
  },
  btnSuccess: {
    backgroundColor: "#7FAD39",
    borderColor: "#7FAD39",
  },
  btnInfo: {
    backgroundColor: "#8C8D8D",
    borderColor: "#8C8D8D",
  },
};

function GestionInventario() {
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
                      <Form.Control
                        type="number"
                        placeholder="Ingrese cantidad"
                      />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Proveedor</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nombre del proveedor"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button style={styles.btnPrimary} className="mt-3">
                  Registrar Producto
                </Button>
              </Form>
              <hr />
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

        {/* REP-INV-002 */}
        <Col md="12">
          <Card>
            <div style={styles.header}>
              <h4 style={styles.title}>Movimientos de Inventario</h4>
              <p style={styles.category}>Registrar entradas y salidas</p>
            </div>
            <Card.Body style={styles.cardBody}>
              <Form>
                <Row>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Producto</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Tipo de Movimiento</Form.Label>
                      <Form.Control as="select">
                        <option>Entrada</option>
                        <option>Salida</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Cantidad</Form.Label>
                      <Form.Control type="number" />
                    </Form.Group>
                  </Col>
                </Row>
                <Button style={styles.btnSuccess} className="mt-3">
                  Registrar Movimiento
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* REP-INV-003 */}
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

        {/* REP-INV-004 */}
        <Col md="12">
          <Card>
            <div style={styles.header}>
              <h4 style={styles.title}>Alertas de Stock Bajo</h4>
              <p style={styles.category}>Configuración y notificaciones</p>
            </div>
            <Card.Body style={styles.cardBody}>
              <Form.Group>
                <Form.Label>Nivel mínimo permitido</Form.Label>
                <Form.Control type="number" defaultValue={10} />
              </Form.Group>
              <hr />
              <h5>Productos con Stock Bajo</h5>
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Stock Actual</th>
                    <th>Nivel Mínimo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ejemplo B</td>
                    <td>5</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* REP-INV-005 */}
        <Col md="12">
          <Card>
            <div style={styles.header}>
              <h4 style={styles.title}>Historial de Inventario</h4>
              <p style={styles.category}>
                Entradas y salidas por fecha o producto
              </p>
            </div>
            <Card.Body style={styles.cardBody}>
              <Form className="mb-3">
                <Row>
                  <Col md="6">
                    <Form.Group>
                      <Form.Label>Filtrar por fecha</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <Form.Label>Filtrar por producto</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
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
                    <td>2025-04-09</td>
                    <td>Ejemplo A</td>
                    <td>Entrada</td>
                    <td>50</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* REP-INV-006 */}
        <Col md="12">
          <Card>
            <div style={styles.header}>
              <h4 style={styles.title}>
                Asociación de Productos y Proveedores
              </h4>
              <p style={styles.category}>Control de fuentes de abastecimiento</p>
            </div>
            <Card.Body style={styles.cardBody}>
              <Form className="mb-3">
                <Row>
                  <Col md="6">
                    <Form.Group>
                      <Form.Label>Producto</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <Form.Label>Proveedor</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                </Row>
                <Button style={styles.btnInfo} className="mt-3">
                  Vincular
                </Button>
              </Form>
              <hr />
              <h5>Listado de Productos con Proveedores</h5>
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Proveedor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ejemplo C</td>
                    <td>Proveedor Z</td>
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

export default GestionInventario;
