import { Container, Form, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { FaShoppingBasket } from "react-icons/fa";
import ContenedorComidas from "./ContenedorComidas";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FormularioBuscador = () => {
  const [categoriaBuscada, setCategoriaBuscada] = useState('')
  const [busqueda, setBusqueda] = useState('')
  // Estado para indicar si hay productos en el pedido o no
  const [hayProductosEnPedido, setHayProductosEnPedido] = useState(false);


  useEffect(() => {
    // Verificar si hay productosEnPedido en la sessionStorage al cargar el componente
    const productosEnPedido = JSON.parse(sessionStorage.getItem("productosEnPedido"));
    setHayProductosEnPedido(Array.isArray(productosEnPedido) && productosEnPedido.length > 0);

  }, []);


  const mostrarBotonFlotanteDelPEdido = (hayProductosEnPedido) => {
    if (hayProductosEnPedido) {
      return <Link to="/pedido" className="btn-floating show-button btn-pedido rounded"> <FaShoppingBasket></FaShoppingBasket>Ver Pedido</Link>
    }
  }


  return (
    <Container fluid className="my-5">

      {mostrarBotonFlotanteDelPEdido(hayProductosEnPedido)}

      <Form className="d-flex justify-content-center">
        <Form.Group controlId="buscador" className="buscador">
          <Form.Control
            type="text"
            placeholder="Encuentra tu comida favorita!"
            onInput={e => setBusqueda(e.target.value)}
            value={busqueda}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="ms-2"
          id="btn-buscador"
        >
          <BsSearch></BsSearch>
        </Button>
      </Form>
      <ContenedorComidas setHayProductosEnPedido={setHayProductosEnPedido} categoriaBuscada={categoriaBuscada} setCategoriaBuscada={setCategoriaBuscada} busqueda={busqueda}></ContenedorComidas>
    </Container>
  );
};

export default FormularioBuscador;
