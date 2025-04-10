import React from "react";
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

function Usuarios() {
  return (
    <Container fluid>
      <Row>
        {/* Permisos por Rol */}
        <Col md="6">
          <Card>
            <div style={styles.header}>
              <h4 style={styles.title}>Asignar Permisos por Rol</h4>
            </div>
            <Card.Body style={styles.cardBody}>
              <Form>
                <Form.Group>
                  <label>Seleccionar Rol</label>
                  <Form.Control as="select">
                    <option>Administrador</option>
                    <option>Usuario</option>
                    <option>Invitado</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <label>Permisos</label>
                  <div>
                    <Form.Check type="checkbox" label="Ver Reportes" />
                    <Form.Check type="checkbox" label="Editar Usuarios" />
                    <Form.Check type="checkbox" label="Eliminar Datos" />
                  </div>
                </Form.Group>
                <Button
                  className="btn-fill mt-3"
                  style={styles.btnSecondary}
                >
                  Guardar Permisos
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Listado de Usuarios */}
      <Row className="mt-4">
        <Col md="12">
          <Card>
            <div style={styles.header}>
              <h4 style={styles.title}>Listado de Usuarios</h4>
              <InputGroup className="mb-3 mt-3">
                <FormControl placeholder="Buscar usuario..." />
                <Button variant="outline-light">Buscar</Button>
              </InputGroup>
            </div>
            <Card.Body style={styles.cardBody}>
              <Table striped bordered hover responsive>
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
                      <Button
                        size="sm"
                        style={styles.btnWarning}
                        className="me-2"
                      >
                        Editar
                      </Button>
                      <Button size="sm" style={styles.btnSecondary}>
                        Desactivar
                      </Button>
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
