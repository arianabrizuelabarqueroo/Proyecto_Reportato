import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl
} from "react-bootstrap";

const styles = {
  header: {
    backgroundColor: "white",
    color: "grey",
    padding: "1rem",
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
  },
  title: {
    color: "black",
    marginBottom: "0.2rem",
  },
  cardBody: {
    backgroundColor: "#FFFFFF",
  },
  btnPrimary: {
    backgroundColor: "#7FAD39",
    borderColor: "#7FAD39",
    color: "white"
  },
  btnSecondary: {
    backgroundColor: "grey",
    borderColor: "grey",
    color: "white",
  },
  btnWarning: {
    backgroundColor: "#7FAD39",
    borderColor: "#7FAD39",
    color: "#FFFFFF",
  },
};

function Usuarios() {
  return (
    <Container fluid className="p-4">
      <Row className="g-4">
        {/* Asignar Permisos */}
        <Col md={4}>
          <Card className="shadow-sm rounded">
            <div style={styles.header}>
              <h5 style={styles.title}>Asignar Permisos por Rol</h5>
            </div>
            <Card.Body style={styles.cardBody}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Seleccionar Rol</Form.Label>
                  <Form.Control as="select">
                    <option>Administrador</option>
                    <option>Usuario</option>
                    <option>Invitado</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <br></br>
                  <Form.Label>Permisos</Form.Label>
                  <div>
                    <Form.Check type="checkbox" label="Ver Reportes" />
                    <Form.Check type="checkbox" label="Editar Usuarios" />
                    <Form.Check type="checkbox" label="Eliminar Datos" />
                  </div>
                </Form.Group>
                <br></br>
                <div className="d-flex">
                  <Button
                    size="sm"
                    style={styles.btnSecondary}
                  >
                    Guardar Permisos
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Tabla de usuarios */}
        <Col md={8}>
          <Card className="shadow-sm rounded">
            <div style={styles.header}>
              <h5 style={styles.title}>Listado de Usuarios</h5>
              <div className="my-3">
                <Row className="g-2">
                  <Col xs={8}>
                  <Form.Control placeholder="Buscar usuario..." />
                  </Col>
                  <Col xs="auto">
                  <Button
                  variant="outline-warning"
                  className="w-100"
                  style={{ backgroundColor: "#7FAD39", color: "white" }}>
                    Buscar
                    </Button>
                    </Col>
                    </Row>
                    </div>

            </div>
            <Card.Body style={styles.cardBody}>
              <Table striped bordered hover responsive size="sm" style={{ fontSize: "0.9rem" }}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Juan Pérez</td>
                    <td>jperez</td>
                    <td>juan@correo.com</td>
                    <td>Administrador</td>
                    <td>Activo</td>
                    <td>
                      <div className="d-flex" style={{ gap: '0.5rem' }}>
                        <Button size="sm" style={styles.btnWarning}>
                          Editar
                          </Button>
                          <Button size="sm" style={styles.btnSecondary}>
                            Desactivar
                            </Button>
                            </div>
                            </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>Juan Pérez</td>
                    <td>jperez</td>
                    <td>juan@correo.com</td>
                    <td>Usuario</td>
                    <td>Desactivado</td>
                    <td>
                      <div className="d-flex" style={{ gap: '0.5rem' }}>
                        <Button size="sm" style={styles.btnWarning}>
                          Editar
                          </Button>
                          <Button size="sm" style={styles.btnSecondary}>
                            Desactivar
                            </Button>
                            </div>
                            </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>Juan Pérez</td>
                    <td>jperez</td>
                    <td>juan@correo.com</td>
                    <td>Invitado</td>
                    <td>Activo</td>
                    <td>
                      <div className="d-flex" style={{ gap: '0.5rem' }}>
                        <Button size="sm" style={styles.btnWarning}>
                          Editar
                          </Button>
                          <Button size="sm" style={styles.btnSecondary}>
                            Desactivar
                            </Button>
                            </div>
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

export default Usuarios;
