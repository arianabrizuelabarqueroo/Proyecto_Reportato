import React from "react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const styles = {
  header: {
    backgroundColor: "white",
    color: "#FFFFFF",
    padding: "1rem",
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem",
  },
  title: {
    color: "black",
    marginBottom: "0.2rem",
  },
  cardBody: {
    backgroundColor: "white",
  },
  btnPrimary: {
    backgroundColor: "#7FAD39",
    borderColor: "#7FAD39",
    color: "white"
  },
  btnSecondary: {
    backgroundColor: "#8C8D8D",
    borderColor: "#8C8D8D",
    color: "white"
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
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header style={styles.header}>
                <Card.Title as="h4" style={styles.title}>Editar Perfil</Card.Title>
              </Card.Header>
              <Card.Body style={styles.cardBody}>
                <Form>
                  <Row>
                    <Col className="px-3" md="6">
                      <Form.Group>
                        <label>Usuario</label>
                        <Form.Control
                          placeholder="Usuario"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Correo Electrónico</label>
                        <Form.Control
                          placeholder="Correo electrónico"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Nombre</label>
                        <Form.Control
                          placeholder="Nombre"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Apellido</label>
                        <Form.Control
                          placeholder="Apellido"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Dirección</label>
                        <Form.Control
                          placeholder="Dirección de domicilio"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Ciudad</label>
                        <Form.Control
                          placeholder="Ciudad"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>País</label>
                        <Form.Control
                          placeholder="País"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Código Postal</label>
                        <Form.Control
                          placeholder="Código Postal"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Acerca de mí</label>
                        <Form.Control
                          cols="80"
                          placeholder="Aquí puedes escribir tu descripción"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    style={styles.btnPrimary}
                    type="submit"
                  >
                    Actualizar Perfil
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/background.jpg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/perfilIcon.jpg")}
                    ></img>
                    <h5 className="title">Nombre Apellido</h5>
                  </a>
                  <p className="description">usuario</p>
                </div>
                <p className="description text-center">
                  Descripción del perfil o breve biografía.
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Usuarios;
