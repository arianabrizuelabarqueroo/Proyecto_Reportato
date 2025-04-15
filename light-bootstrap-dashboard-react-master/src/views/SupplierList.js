import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function SupplierList() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Tabla de Proveedores</Card.Title>
                <p className="card-category">
                  Lista completa de proveedores con informacion de contacto
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    style={{
                      backgroundColor: "#7FAD39",
                      borderColor: "#7FAD39",
                      color: "white",
                      padding: "5px",
                      marginLeft: "15px"
                    }}
                  >
                    Agregar nuevo proveedor
                  </Button>
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Cedula</th>
                      <th className="border-0">Nombre Completo</th>
                      <th className="border-0">Correo electronico</th>
                      <th className="border-0">Numero de telefono</th>
                      <th className="border-0">Editar</th>
                      <th className="border-0">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Proveedor A</td>
                      <td>pruebas@example.com</td>
                      <td>89456789</td>
                      <td>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          style={{
                            backgroundColor: "#7FAD39",
                            borderColor: "#7FAD39",
                            color: "white",
                          }}
                        >
                          Editar
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          style={{
                            backgroundColor: "#7FAD39",
                            borderColor: "#7FAD39",
                            color: "white",
                          }}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Proveedor B</td>
                      <td>pruebas@example.com</td>
                      <td>89456789</td>
                      <td>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          style={{
                            backgroundColor: "#7FAD39",
                            borderColor: "#7FAD39",
                            color: "white",
                          }}
                        >
                          Editar
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          style={{
                            backgroundColor: "#7FAD39",
                            borderColor: "#7FAD39",
                            color: "white",
                          }}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Proveedor C</td>
                      <td>pruebas@example.com</td>
                      <td>89456789</td>
                      <td>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          style={{
                            backgroundColor: "#7FAD39",
                            borderColor: "#7FAD39",
                            color: "white",
                          }}
                        >
                          Editar
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          style={{
                            backgroundColor: "#7FAD39",
                            borderColor: "#7FAD39",
                            color: "white",
                          }}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Proveedor D</td>
                      <td>pruebas@example.com</td>
                      <td>89456789</td>
                      <td>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          style={{
                            backgroundColor: "#7FAD39",
                            borderColor: "#7FAD39",
                            color: "white",
                          }}
                        >
                          Editar
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          style={{
                            backgroundColor: "#7FAD39",
                            borderColor: "#7FAD39",
                            color: "white",
                          }}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Proveedor E</td>
                      <td>pruebas@example.com</td>
                      <td>89456789</td>
                      <td>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          style={{
                            backgroundColor: "#7FAD39",
                            borderColor: "#7FAD39",
                            color: "white",
                          }}
                        >
                          Editar
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          style={{
                            backgroundColor: "#7FAD39",
                            borderColor: "#7FAD39",
                            color: "white",
                          }}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Proveedor F</td>
                      <td>pruebas@example.com</td>
                      <td>89456789</td>
                      <td>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          style={{
                            backgroundColor: "#7FAD39",
                            borderColor: "#7FAD39",
                            color: "white",
                          }}
                        >
                          Editar
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          style={{
                            backgroundColor: "#7FAD39",
                            borderColor: "#7FAD39",
                            color: "white",
                          }}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Lista de compras</Card.Title>
                <p className="card-category">
                  Compras realizadas
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    style={{
                      backgroundColor: "#7FAD39",
                      borderColor: "#7FAD39",
                      color: "white",
                      marginLeft: "15px"
                    }}
                  >
                    Registrar nueva compra
                  </Button>
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">Numero de factura</th>
                      <th className="border-0">Nombre proveedor</th>
                      <th className="border-0">Datos de compra</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12</td>
                      <td>Proveedor F</td>
                      <td>10 lechugas, 20 Manzanas</td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td>Proveedor A</td>
                      <td>10 Melones, 20 Sandias</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Proveedor C</td>
                      <td>10kg Papas, 20 Tomates</td>
                    </tr>
                    <tr>
                      <td>111</td>
                      <td>Proveedor D</td>
                      <td>10 Naranjas, 20 Tomates</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SupplierList;
