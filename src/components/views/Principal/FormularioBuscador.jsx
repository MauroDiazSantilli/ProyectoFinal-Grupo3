import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import {FaShoppingBasket} from "react-icons/fa"
import ContenedorComidas from "./ContenedorComidas";

const FormularioBuscador = () => {
  const [categoriaBuscada, setCategoriaBuscada] =  useState('')
  const [busqueda, setBusqueda] = useState('')
  const pedidos = sessionStorage.getItem('productosEnPedido');

  const handleBotonPedido = () => {
    const botonPedido = document.getElementById('botonPedido')
    if (pedidos && pedidos.length > 0 && pedidos !== [" "]) {
      botonPedido.classList.add("show-button");
    } else {
      botonPedido.classList.remove("show-button");
    }
  };

  useEffect(() => {
    window.addEventListener("reset", handleBotonPedido);
    return () => {
      window.removeEventListener("reset", handleBotonPedido);
    };
  }, []);

  return (
    <Container fluid className="my-5">
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
      <ContenedorComidas categoriaBuscada={categoriaBuscada} setCategoriaBuscada={setCategoriaBuscada} busqueda={busqueda}></ContenedorComidas>
          <a href="./pedido" className="btn-pedido" id="botonPedido">
          <FaShoppingBasket>
          </FaShoppingBasket>
          </a>
    </Container>
  );
};

export default FormularioBuscador;
