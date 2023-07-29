import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import brand from "../../assets/brand.png"
import chef1 from "../../assets/chefs/MauroDiazSantilli.jpeg"
import '../../App.css';

const AcercaDe = () => {
  return (
    <Container className="mainSection">
      <section className="my-5">
        <h1 className="display-4 text-center pb-3">¿Que es JSONGourmet?</h1>
        <p className="text-center fw-bold fst-italic texto-acerca">
          Uno de los restaurantes mas famosos de Argentina, claro está. Nuestro objetivo es ofrecer una experiencia gastronómica única e inigualable a nuestros clientes. Nos apasiona la comida de calidad y nos esforzamos por brindar platos exquisitos y creativos que satisfagan los paladares más exigentes.
        </p>
        <p className="text-center fw-semibold texto-acerca">
          Nuestro restaurante ofrece una amplia variedad de opciones gastronómicas, desde platos tradicionales hasta creaciones innovadoras de nuestra cocina. Utilizamos ingredientes frescos y de temporada para garantizar el sabor y la calidad en cada plato que servimos. Por supuesto, no podemos olvidarnos de nuestros beberajes. Ofrecemos una amplia variedad de bebidas, tanto locales como internacionales.
        </p>
        <p className="text-center fw-semibold texto-acerca">
          Además de nuestra comida y bebida, en JSONGourmet nos enorgullece ofrecer un ambiente acogedor y un servicio excepcional. Queremos que cada visita a nuestro restaurante sea una experiencia memorable para nuestros comensales, donde puedan disfrutar de una atención personalizada y un ambiente agradable.
        </p>
        <p className="text-center fw-semibold texto-acerca">
          En nuestra página web, los usuarios podrán explorar nuestro menú, conocer más sobre nuestros chefs y reservar un pedido en línea.  ¡Esperamos darles la bienvenida y hacer que su experiencia culinaria sea unica e inigualable!
        </p>
        <img src={brand} alt="Logo JSON" className="brandJSON" />
      </section>
      <hr />
      <section className="bg-body-tertiary fondo-acerca">
        <h1 className="display-6 text-center mb-4 pt-4 text-warning fw-bolder">Nuestros chefs</h1>
        <Row className="sobreNosotros-card">
          <Col md={5} className="mb-3 mx-1 p-1">
            <Card>
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img
                    src={chef1}
                    className="img-fluid rounded-circle"
                    alt="Foto Mauro Diaz Santilli"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>Mauro Diaz Santilli</Card.Title>
                    <Card.Text>
                    26 años. Estudiante de Inglés y
                      Profesor particular de Inglés y Francés. Aficionado de
                      impresión 3D. Me gustan la natación, el café y las
                      comedias
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={5} className="mb-3 mx-1 p-1">
            <Card>
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img
                    src="../assets/chefs/"
                    className="img-fluid rounded-circle"
                    alt="Foto Joaquin Fuentes"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>Joaquin Fuentes</Card.Title>
                    <Card.Text>
                      Añadir descripcion
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={5} className="mb-3 mx-1 p-1">
            <Card>
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img
                    src="../assets/chefs/"
                    className="img-fluid rounded-circle"
                    alt="Foto Federico Ledesma"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>Federico Ledesma</Card.Title>
                    <Card.Text>
                      Añadir descripcion
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={5} className="mb-3 mx-1 p-1">
            <Card>
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img
                    src="../assets/chefs/"
                    className="img-fluid rounded-circle"
                    alt="Foto Julian Martin"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>Julian Martin</Card.Title>
                    <Card.Text>
                      Añadir descripcion
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={5} className="mb-3 mx-1 p-1">
            <Card>
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img
                    src="../assets/chefs/"
                    className="img-fluid rounded-circle"
                    alt="Foto Agustin Sandoval"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title>Agustin Sandoval</Card.Title>
                    <Card.Text>
                      Añadir descripcion
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default AcercaDe;
