import React, { useEffect } from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaArrowUp, FaUtensils, FaSun, FaMoon } from "react-icons/fa";
import "../../App.css";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const Menu = ({ usuarioLogueado, setUsuarioLogueado, modoOscuro, cambiarModoOscuro }) => {
  const navegar = useNavigate();

  const logout = () => {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Desea cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('productosEnPedido');
        setUsuarioLogueado({});
        navegar('/');
      }
    });
  }

  const handleScroll = () => {
    const button = document.getElementById("boton-arriba");
    if (window.scrollY > 100) {
      button.classList.add("show-button");
    } else {
      button.classList.remove("show-button");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
  <>
    <Navbar className={`navbar-cristal ${modoOscuro ? "navbar-oscuro" : ""}`} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          <img src={logo} alt="Logo JSON" className="logoJSON" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-gourmet" />
        <Navbar.Collapse id="navbar-gourmet">
          <Nav className="ms-auto">
            <NavLink className="nav-item nav-link" to={"/"}>
              Inicio
            </NavLink>
            <NavLink className="nav-item nav-link" to={"/AcercaDe"}>
              Chefs
            </NavLink>
            <NavLink className="nav-item nav-link" to={"/pedido"}>
              <FaUtensils className="fs-4" />
            </NavLink>

            {usuarioLogueado.id ? (
              <>
                {usuarioLogueado.rol === "administrador" ? (
                  <NavDropdown title="Administrador" id="admin-dropdown">
                    <NavDropdown.Item as={NavLink} to={"/administrador/productos"}>
                      Productos
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to={"/administrador/usuarios"}>
                      Usuarios
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to={"/administrador/pedidos"}>
                      Pedidos
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : null}

                <Button variant="dark" onClick={logout} style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Cerrar Sesión
                </Button>

                <NavLink className="nav-item nav-link btn-modo-oscuro" onClick={cambiarModoOscuro}>
  {modoOscuro ? <FaSun style={{ fontSize: "1.2rem" }} /> : <FaMoon style={{ fontSize: "1.2rem" }} />}
</NavLink>
              </>
            ) : (
              <>
                <NavLink className="nav-item nav-link" to={"/login"}>
                  Iniciar Sesión
                </NavLink>
                <NavLink className="nav-item nav-link" to={"/registro"}>
                  Registrarse
                </NavLink>
                <NavLink className="nav-item nav-link btn-modo-oscuro" onClick={cambiarModoOscuro}>
  {modoOscuro ? <FaSun style={{ fontSize: "1.2rem" }} /> : <FaMoon style={{ fontSize: "1.2rem" }} />}
</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <a href="#" className="btn-floating" id="boton-arriba">
      <FaArrowUp />
    </a>
  </>
  );
};

export default Menu;
