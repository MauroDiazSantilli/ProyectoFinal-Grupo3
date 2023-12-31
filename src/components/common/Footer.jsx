import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaFacebook, FaInstagram, FaPhoneAlt, FaYoutube, FaTwitter, FaLocationArrow, FaPinterest } from 'react-icons/fa';
import '../../App.css';

const Footer = ({usuarioLogueado}) => {

  const urlGoogle = "https://www.google.com/maps/search/?api=1&query=General+Paz+576%2C+T4000+San+Miguel+de+Tucumán%2C+Tucumán";

  return (
    <footer className="bg-dark text-light py-4 mainSection">
      <Container>
        <Row>
          <Col md={3}>
            <h5>BON DIA</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Inicio</Link></li>
              <li><Link to="/AcercaDe" className="footer-link">Acerca de</Link></li>
              <li><Link to="/404" className="footer-link">Socios</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Servicio al Cliente</h5>
            <ul className="list-unstyled">
              <li><Link to="/404" className="footer-link">Preguntas frecuentes</Link></li>
              <li><Link to="/404" className="footer-link">Devoluciones</Link></li>
              <li><Link to="/404" className="footer-link">Políticas de privacidad</Link></li>
              <li><Link to="/404" className="footer-link">Términos de servicio</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Mi Cuenta</h5>
            {usuarioLogueado.uid ? 
              <>
              <ul className="list-unstyled">
              <li><Link to="/carrito" className="footer-link">Mis Productos</Link></li>
              </ul>
              </>
             : <>
              <ul className="list-unstyled">
              <li><Link to="/login" className="footer-link">Iniciar Sesión</Link></li>
              <li><Link to="/registro" className="footer-link">Registrarse</Link></li>
              <li><Link to="/carrito" className="footer-link">Mis Productos</Link></li>
            </ul>
            </>}
          </Col>
          <Col md={3}>
            <h5>Contactenos</h5>
            <ul className="list-unstyled">
              <div className="d-flex align-items-center pb-2">
                <li className="me-3">
                  <Link to="/404" className="footer-icon-link">
                    <FaFacebook className="footer-icon" />
                  </Link>
                </li>
                <li className="me-3">
                  <Link to="/404" className="footer-icon-link">
                    <FaTwitter className="footer-icon" />
                  </Link>
                </li>
                <li className="me-3">
                  <Link to="/404" className="footer-icon-link">
                    <FaInstagram className="footer-icon" />
                  </Link>
                </li>
                <li className="me-3">
                  <Link to="/404" className="footer-icon-link">
                    <FaYoutube className="footer-icon" />
                  </Link>
                </li>
                <li className="me-3">
                  <Link to="/404" className="footer-icon-link">
                    <FaPinterest className="footer-icon" />
                  </Link>
                </li>
              </div>
              <li className="pt-2">
                <FaPhoneAlt className="footer-icon" />
                <a href="https://wa.me/543815970428" target="_blank" rel="noopener noreferrer" className="footer-text">3815970428</a>
              </li>
              <li className="my-3">
                <FaEnvelope className="footer-icon" />
                <Link to="/404" className="footer-text footer-link">bondia@contact.com</Link>
              </li>
              <li>
                <FaLocationArrow className="footer-icon" />
                <a href={urlGoogle} target="_blank" rel="noopener noreferrer" className="footer-text footer-link">General Paz 576, T4000 San Miguel de Tucumán, Tucumán</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="bg-dark text-light text-center py-3">
        <p>&copy; Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
