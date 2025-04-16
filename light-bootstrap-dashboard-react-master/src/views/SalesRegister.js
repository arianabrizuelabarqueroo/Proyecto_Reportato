import React, { useState } from "react";
import { Button, Card, Table, Container, Row, Col, Form } from "react-bootstrap";

function SalesRegister() {
  const [view, setView] = useState("home");

  // Simula navegación
  const goTo = (page) => setView(page);

  const HomeView = () => (
    <Row>
      <Col md="4">
        <Card className="text-center">
          <Card.Body>
            <div className="mb-3">
              <i className="nc-icon nc-circle-09" style={{ fontSize: "3rem", color: "#7FAD39" }}></i>
            </div>
            <Card.Title as="h4">Registrar Nuevo Cliente</Card.Title>
            <Card.Text style={{ color: "#6c757d" }}>
              Agrega nuevos clientes para tus ventas fácilmente.
            </Card.Text>
            <Button
              className="btn-fill pull-right"
              onClick={() => goTo("cliente")}
              style={{
                backgroundColor: "#7FAD39",
                borderColor: "#7FAD39",
                color: "white",
              }}
            >
              Registrar Cliente
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Col md="4">
        <Card className="text-center">
          <Card.Body>
            <div className="mb-3">
              <i className="nc-icon nc-paper-2" style={{ fontSize: "3rem", color: "#7FAD39" }}></i>
            </div>
            <Card.Title as="h4">Generador de Facturas</Card.Title>
            <Card.Text style={{ color: "#6c757d" }}>
              Crea facturas personalizadas de forma rápida y segura.
            </Card.Text>
            <Button
              className="btn-fill pull-right"
              onClick={() => goTo("factura")}
              style={{
                backgroundColor: "#7FAD39",
                borderColor: "#7FAD39",
                color: "white",
              }}
            >
              Generar Factura
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Col md="4">
        <Card className="text-center">
          <Card.Body>
            <div className="mb-3">
              <i className="nc-icon nc-bag" style={{ fontSize: "3rem", color: "#7FAD39" }}></i>
            </div>
            <Card.Title as="h4">Registrar Venta</Card.Title>
            <Card.Text style={{ color: "#6c757d" }}>
              Añade una nueva venta con todos los detalles del cliente.
            </Card.Text>
            <Button
              className="btn-fill pull-right"
              onClick={() => goTo("venta")}
              style={{
                backgroundColor: "#7FAD39",
                borderColor: "#7FAD39",
                color: "white",
              }}
            >
              Registrar Venta
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  const ClienteView = () => (
    <>
      <Card>
        <Card.Header>
          <Card.Title as="h4">Formulario Registro Cliente</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md="6">
                <Form.Group controlId="formClientName">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control type="text" placeholder="Ingresa el nombre completo" />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group controlId="formClientEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="email" placeholder="Ingresa el correo electrónico" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <Form.Group controlId="formClientPhone">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="text" placeholder="Ingresa el número de teléfono" />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group controlId="formClientAddress">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control type="text" placeholder="Ingresa la dirección del cliente" />
                </Form.Group>
              </Col>
            </Row>
            <br></br>
            <Button
              className="btn-fill pull-right"
              type="submit"
              style={{
                backgroundColor: "#7FAD39",
                borderColor: "#7FAD39",
                color: "white",
              }}
            >
              Registrar Cliente
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => goTo("home")} 
              className="pull-right"
              style={{ marginRight: "10px" }}
            >
              Volver
            </Button>
            <div className="clearfix"></div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );

  const FacturaView = () => (
    <>
      <Card>
        <Card.Header>
          <Card.Title as="h4">Generar Factura</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md="6">
                <Form.Group controlId="formFacturaClient">
                  <Form.Label>Seleccionar Cliente</Form.Label>
                  <Form.Control as="select">
                    <option>Selecciona un cliente</option>
                    <option>María Pérez</option>
                    <option>Carlos Rojas</option>
                    <option>Ana Jiménez</option>
                    <option>Jorge Gutiérrez</option>
                    <option>Lucía Mora</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group controlId="formFacturaTotal">
                  <Form.Label>Total</Form.Label>
                  <Form.Control type="number" placeholder="Monto total de la factura" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formFacturaItems">
              <Form.Label>Productos</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Ingresa los productos vendidos" />
            </Form.Group>
            <br></br>
            <Button
              className="btn-fill pull-right"
              type="submit"
              style={{
                backgroundColor: "#7FAD39",
                borderColor: "#7FAD39",
                color: "white",
              }}
            >
              Generar Factura
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => goTo("home")} 
              className="pull-right"
              style={{ marginRight: "10px" }}
            >
              Volver
            </Button>
            <div className="clearfix"></div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );

  const VentaView = () => (
    <>
      <Card>
        <Card.Header>
          <Card.Title as="h4">Registrar Venta</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md="6">
                <Form.Group controlId="formVentaClient">
                  <Form.Label>Seleccionar Cliente</Form.Label>
                  <Form.Control as="select">
                    <option>Selecciona un cliente</option>
                    <option>María Pérez</option>
                    <option>Carlos Rojas</option>
                    <option>Ana Jiménez</option>
                    <option>Jorge Gutiérrez</option>
                    <option>Lucía Mora</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group controlId="formVentaTotal">
                  <Form.Label>Total</Form.Label>
                  <Form.Control type="number" placeholder="Monto total de la venta" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formVentaItems">
              <Form.Label>Productos</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Ingresa los productos vendidos" />
            </Form.Group>

            <Row>
              <Col md="6">
                <Form.Group controlId="formVentaMetodoPago">
                  <Form.Label>Método de Pago</Form.Label>
                  <Form.Control as="select">
                    <option>Efectivo</option>
                    <option>Tarjeta</option>
                    <option>Sinpe</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <br></br>
            <Button
              className="btn-fill pull-right"
              type="submit"
              style={{
                backgroundColor: "#7FAD39",
                borderColor: "#7FAD39",
                color: "white",
              }}
            >
              Registrar Venta
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => goTo("home")} 
              className="pull-right"
              style={{ marginRight: "10px" }}
            >
              Volver
            </Button>
            <div className="clearfix"></div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );

  return (
    <Container fluid>
      {view === "home" && (
        <>
          {HomeView()}

          <Row>
            {/* Historial de Ventas */}
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">Historial de Ventas</Card.Title>
                  <p className="card-category">
                    Registro de todas las ventas realizadas
                    <Button
                      className="btn-fill pull-right"
                      onClick={() => goTo("venta")}
                      style={{
                        backgroundColor: "#7FAD39",
                        borderColor: "#7FAD39",
                        color: "white",
                        marginLeft: "15px",
                      }}
                    >
                      Registrar nueva venta
                    </Button>
                  </p>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Factura</th>
                        <th>Cliente</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th>Fecha</th>
                        <th>Método de Pago</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>F00123</td>
                        <td>María Pérez</td>
                        <td>3 kg papas, 1 sandía</td>
                        <td>₡4,500</td>
                        <td>2025-04-15</td>
                        <td>Efectivo</td>
                      </tr>
                      <tr>
                        <td>F00124</td>
                        <td>Carlos Rojas</td>
                        <td>2 kg tomates, 5 chayotes</td>
                        <td>₡3,800</td>
                        <td>2025-04-15</td>
                        <td>Tarjeta</td>
                      </tr>
                      <tr>
                        <td>F00125</td>
                        <td>Ana Jiménez</td>
                        <td>10 kg naranjas, 2 piñas</td>
                        <td>₡8,200</td>
                        <td>2025-04-15</td>
                        <td>Sinpe</td>
                      </tr>
                      <tr>
                        <td>F00126</td>
                        <td>Jorge Gutiérrez</td>
                        <td>1 kg frijoles, 2 kg arroz</td>
                        <td>₡3,500</td>
                        <td>2025-04-15</td>
                        <td>Efectivo</td>
                      </tr>
                      <tr>
                        <td>F00127</td>
                        <td>Lucía Mora</td>
                        <td>3 lechugas, 4 zanahorias</td>
                        <td>₡5,000</td>
                        <td>2025-04-15</td>
                        <td>Tarjeta</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            {/* Cierre de Caja */}
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Cierre de Caja</Card.Title>
                  <p className="card-category">
                    Detalle del cierre de caja del día
                    <Button
                      className="btn-fill pull-right"
                      onClick={() => alert("Caja cerrada correctamente.")}
                      style={{
                        backgroundColor: "#7FAD39",
                        borderColor: "#7FAD39",
                        color: "white",
                        marginLeft: "15px",
                      }}
                    >
                      Cerrar Caja
                    </Button>
                  </p>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Ventas Totales</th>
                        <th>Efectivo</th>
                        <th>Tarjeta</th>
                        <th>Sinpe</th>
                        <th>Diferencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2025-04-15</td>
                        <td>₡25,000</td>
                        <td>₡10,000</td>
                        <td>₡8,000</td>
                        <td>₡7,000</td>
                        <td>₡0</td>
                      </tr>
                      <tr>
                        <td>2025-04-14</td>
                        <td>₡32,500</td>
                        <td>₡15,700</td>
                        <td>₡9,800</td>
                        <td>₡7,000</td>
                        <td>₡0</td>
                      </tr>
                      <tr>
                        <td>2025-04-13</td>
                        <td>₡18,900</td>
                        <td>₡8,900</td>
                        <td>₡6,000</td>
                        <td>₡4,000</td>
                        <td>₡0</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            {/* Resumen Diario */}
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Resumen Diario</Card.Title>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Ventas</th>
                        <th>Clientes Atendidos</th>
                        <th>Producto Más Vendido</th>
                        <th>Hora Pico</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2025-04-15</td>
                        <td>₡25,000</td>
                        <td>17</td>
                        <td>Papas</td>
                        <td>5:30 PM</td>
                      </tr>
                      <tr>
                        <td>2025-04-14</td>
                        <td>₡32,500</td>
                        <td>24</td>
                        <td>Tomates</td>
                        <td>12:15 PM</td>
                      </tr>
                      <tr>
                        <td>2025-04-13</td>
                        <td>₡18,900</td>
                        <td>13</td>
                        <td>Naranjas</td>
                        <td>10:45 AM</td>
                      </tr>
                      <tr>
                        <td>2025-04-12</td>
                        <td>₡28,700</td>
                        <td>22</td>
                        <td>Piñas</td>
                        <td>4:20 PM</td>
                      </tr>
                      <tr>
                        <td>2025-04-11</td>
                        <td>₡20,300</td>
                        <td>15</td>
                        <td>Frijoles</td>
                        <td>6:10 PM</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {view === "cliente" && <ClienteView />}
      {view === "factura" && <FacturaView />}
      {view === "venta" && <VentaView />}
    </Container>
  );
}

export default SalesRegister;